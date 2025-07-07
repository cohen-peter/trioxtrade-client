import { useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { Box, Typography, MenuItem, Select } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

const getBalanceForChart = (transactions, range = 7) => {
  const completed = transactions
    .filter(t => t.status === "completed")
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const today = new Date();
  const start = new Date();
  start.setDate(today.getDate() - range + 1);

  const formatDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toDateString();
  };

  let startingBalance = 0;
  const dailyChanges = {};

  // Step 1: Initialize date buckets
  for (let i = 0; i < range; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dailyChanges[formatDate(d)] = 0;
  }

  // Step 2: Compute starting balance before the range
  completed.forEach((t) => {
    const txDate = new Date(t.date);
    if (txDate < start) {
      if (t.type === "deposit" || t.type === "profit") {
        startingBalance += t.amount;
      } else if (t.type === "withdrawal") {
        startingBalance -= t.amount;
      }
    }
  });

  // Step 3: Apply changes only within the selected range
  completed.forEach((t) => {
    const txDate = new Date(t.date);
    const key = formatDate(txDate);
    if (txDate >= start && key in dailyChanges) {
      if (t.type === "deposit" || t.type === "profit") {
        dailyChanges[key] += t.amount;
      } else if (t.type === "withdrawal") {
        dailyChanges[key] -= t.amount;
      }
    }
  });

  // Step 4: Build chart data with rolling balance
  const chartData = [];
  let runningBalance = startingBalance;

  Object.entries(dailyChanges).forEach(([key, change], index) => {
    runningBalance += change;
    chartData.push({
      day: `Day ${index + 1}`,
      balance: runningBalance,
      dateLabel: key,
    });
  });

  return chartData;
};

const PortfolioChart = () => {

  const [range, setRange] = useState(7);
  const theme = useTheme();
  const transactions = useSelector((state) => state.user.transactions)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const chartData = useMemo(() => {
    return getBalanceForChart(transactions, range);
  }, [transactions, range]);


  return (
    <Box sx={{ bgcolor: 'background'}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", mb: 2 }}>
        <Typography color="white" fontSize="1rem" fontWeight={"bold"}>Portfolio Value</Typography>
        <Select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            color: 'white',
            border: "none",
            // borderColor: '#334155',
            backgroundColor: 'background.alt',
            // '.MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
            '.MuiSvgIcon-root': { color: 'white' },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "rgb(255, 255, 255)",
                color: "black"
              }
            }
          }}
        >
          <MenuItem value={7}>Last 7 days</MenuItem>
          <MenuItem value={14}>Last 14 days</MenuItem>
          <MenuItem value={30}>Last 30 days</MenuItem>
        </Select>
      </Box>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart 
          data={chartData}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
        >
          <CartesianGrid stroke="#1e293b" />
          <XAxis 
            dataKey="day" 
            stroke="#94a3b8" 
            // tick={{ fontSize: "12px" }} 
            tick={false}
            axisLine={true} tickLine={false}
            // tickFormatter={isMobile ? (value) => value.slice(4) : undefined}
          />
          <YAxis 
            stroke="#94a3b8" 
            domain={["auto", "dataMax + 100"]} 
            tick={{ fontSize: 12 }}
            // tickFormatter={(value) => {
            //   if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
            //   if (value >= 1000) return (value / 1000).toFixed(0) + 'k';
            //   return value;
            // }}  
            tickFormatter={(value) => {
              if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
              if (value >= 1_000) return (value / 1_000).toFixed(1) + 'k';
              return value;
            }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#095CE0', border: 'none', borderRadius: "5px", fontSize: "12px" }}
            labelStyle={{ color: '#94a3b8' }}
            // formatter={(value) => [`$${value.toLocaleString()}`, '']}
            labelFormatter={(value, payload) => {
              // Access the full data point
              const item = payload?.[0]?.payload;
              return item?.dateLabel || value;
            }}
            formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#22d3ee"
            strokeWidth={2}
            // dot={{ r: 3 }}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PortfolioChart;
