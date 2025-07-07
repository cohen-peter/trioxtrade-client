import { 
  Box, 
  Button,
  Grid,
  Typography
} from "@mui/material";
import { PlayArrow, ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { setTransactions } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import api from "../../services/axios";
import { useEffect, useState } from "react";
import PortfolioChart from "../../components/PortfolioChart";
import WatchList from "../../components/WatchList";

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const transactions = useSelector((state) => state.user.transactions);
  const [balance, setBalance] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [withdrawal, setWithdrawal] = useState(0);
  const [dailyChange, setDailyChange] = useState(0);
  const [monthlyDeposit, setMonthlyDeposit] = useState(0);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(0);

  const getTransactions = async () => {
    try {
      const response = await api.get(`transactions/${user._id}`);
      // console.log(response.data)
      dispatch(
        setTransactions({
          transactions: response.data
        })
      )
    } catch (err) {
      console.log(err)
    }
  };

  const getDailyChange = (transactions) => {
    const completed = transactions
      .filter(t => t.status === 'completed')
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let balanceYesterday = 0;
    let balanceToday = 0;

    for (const t of completed) {
      const date = new Date(t.date);
      const typeMultiplier = (t.type === 'deposit' || t.type === 'profit') ? 1 : -1;

      if (date < yesterday) {
        balanceYesterday += t.amount * typeMultiplier;
        balanceToday += t.amount * typeMultiplier;
      } else if (date < today) {
        balanceYesterday += t.amount * typeMultiplier;
        balanceToday += t.amount * typeMultiplier;
      } else {
        balanceToday += t.amount * typeMultiplier;
      }
    }

    if (balanceYesterday === 0) return null; // avoid division by zero
    const percentChange = ((balanceToday - balanceYesterday) / balanceYesterday) * 100;
    return Number(percentChange.toFixed(2));
  };

  const getMonthlyTotals = (transactions) => {
    const THIRTY_DAYS_AGO = new Date();
    THIRTY_DAYS_AGO.setDate(THIRTY_DAYS_AGO.getDate() - 30);

    let tempMonthlyDeposit = 0;
    let tempMonthlyWithdrawal = 0;

    transactions.forEach((t) => {
      if (t.status !== 'completed') return;

      const date = new Date(t.date);
      if (date < THIRTY_DAYS_AGO) return;

      if (t.type === 'deposit') {
        tempMonthlyDeposit += t.amount;
      } else if (t.type === 'withdrawal') {
        tempMonthlyWithdrawal += t.amount;
      }
    });

    return {
      tempMonthlyDeposit,
      tempMonthlyWithdrawal,
    };
  };


  useEffect(() => {
    getTransactions();
  },[])

  useEffect(() => {
    if (!transactions || transactions.length == 0) {
      setBalance(0);
      setDeposit(0);
      setWithdrawal(0);
      return;
    }

    let totalBalance = 0;
    let totalDeposit = 0;
    let totalWithdrawal = 0;

    transactions.forEach((tx) => {
      if (tx.status !== "completed") return;

      if (tx.type === "deposit") {
        totalBalance += tx.amount;
        totalDeposit += tx.amount;
      } else if (tx.type === "withdrawal") {
        totalBalance -= tx.amount;
        totalWithdrawal += tx.amount;
      } else if (tx.type === "profit") {
        totalBalance += tx.amount;
      }
    });

    setBalance(totalBalance);
    setDeposit(totalDeposit);
    setWithdrawal(totalWithdrawal);
    setDailyChange(getDailyChange(transactions));
    const { tempMonthlyDeposit, tempMonthlyWithdrawal } = getMonthlyTotals(transactions);
    setMonthlyDeposit(tempMonthlyDeposit);
    setMonthlyWithdrawal(tempMonthlyWithdrawal);

  },[transactions])

  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
      <Box 
        display={"flex"} 
        gap={{ xs: 2 }}
        flexDirection={{ xs: "column", sm: "row" }}
        // border={"1px solid red"}
        justifyContent={{ sm: "space-between" }} 
        alignItems={{ sm: "flex-end" }}
      >
        {/* intro and name */}
        <Box>
          <Typography>Welcome !</Typography>
          <Typography variant="h5" color="secondary.main">{user.firstName}</Typography>
          <Typography variant="caption">Here's a summary of your account.</Typography>
        </Box>
        {/* button holder */}
        <Box display={"flex"} gap={2}>
          <Button 
            sx={{
              bgcolor: "background.default",
              borderRadius: "8px",
              color: "#fff",
              border: "none"
            }}
          >
            Invest & Earn
          </Button>
          <Button
            onClick={() => navigate("/dashboard/deposit")}
            sx={{
              bgcolor: "background.alt",
              borderRadius: "8px",
              color: "#fff",
              border: "none"
            }}
          >
            Deposit
          </Button>
        </Box>
      </Box>

      {/* Add withdrawal address */}
      {!user.walletAddress && 
      (<Box
        display={"flex"}
        flexDirection={{ xs: "column", sm: "row" }}
        gap={{ xs: 2 }}
        justifyContent={"space-between"}
        alignItems={{ sm: "center" }}
        bgcolor={"rgb(255, 255, 255, 0.3)"}
        border={"2px solid"}
        borderColor={"secondary.main"}
        borderRadius={"5px"}
        padding={".5rem 1rem"}
      >
        <Box 
          display={"flex"}
          alignItems={"center"}
        >
          <PlayArrow />
          <Typography variant="caption" fontWeight={"bold"}>Add an address to receive payment or withdraw funds</Typography>
        </Box>
        <Button
          size="small"
          onClick={() => navigate("/dashboard/settings")}
          sx={{
            border: "none",
            bgcolor: "secondary.main",
            color: "#000000",
            borderRadius: "5px"
          }}
        >
          Add Address
        </Button>
      </Box>)}

      {/* Dashboard display */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6,}}>
          <Box
            bgcolor={"background.default"}
            padding={"1rem 1.5rem"}
            borderRadius={"8px"}
            height={"150px"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography fontWeight={"bold"} fontSize={"1.2rem"}>Available Balance</Typography>
              <Box 
                display={"flex"} 
                justifyContent={"center"}
                color={dailyChange > 0 ? "#00FF69" : dailyChange < 0 ? "error.main" : "text.secondary"}
              >
                <Typography 
                  color={dailyChange > 0 ? "#00FF69" : dailyChange < 0 ? "error.main" : "text.secondary"}
                  fontSize={".8rem"}
                >
                  {dailyChange}%
                </Typography>
                  {dailyChange > 0 && <ArrowDropUp fontSize="small" />}
                  {dailyChange < 0 && <ArrowDropDown fontSize="small" />}
              </Box>
            </Box>
            <Typography fontWeight={"bold"} fontSize={"2rem"}>${balance.toLocaleString()}</Typography>
            <Typography fontWeight={"bold"} fontSize={"8px"} mt={"auto"}>INVESTMENT ACCOUNT</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 6, md: 3,}}>
          <Box
            bgcolor={"rgb(255, 255, 255, 0.3)"}
            padding={"1rem"}
            border={"2px solid"}
            borderColor={"secondary.main"}
            borderRadius={"8px"}
            height={"150px"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Typography fontWeight={"bold"} fontSize={"1rem"}>Total Deposit</Typography>
            <Typography fontWeight={"bold"} fontSize={"1.2rem"}>${deposit.toLocaleString()}</Typography>
            <Typography mt={"auto"} fontSize={"8px"} fontWeight={"bold"}>THIS MONTH -</Typography>
            <Typography fontSize={".8rem"}>${monthlyDeposit.toLocaleString()}</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 6, md: 3,}}>
          <Box
            bgcolor={"rgb(255, 255, 255, 0.3)"}
            padding={"1rem"}
            border={"2px solid"}
            borderColor={"secondary.main"}
            borderRadius={"8px"}
            height={"150px"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Typography fontWeight={"bold"} fontSize={"1.em"}>Total Withdrawal</Typography>
            <Typography fontWeight={"bold"} fontSize={"1.2rem"}>${withdrawal.toLocaleString()}</Typography>
            <Typography mt={"auto"} fontSize={"8px"} fontWeight={"bold"}>THIS MONTH -</Typography>
            <Typography fontSize={".8rem"}>${monthlyWithdrawal.toLocaleString()}</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 8,}}>
          <Box
            bgcolor={"background.default"}
            padding={3}
            borderRadius={"8px"}
            height={"330px"}
          >
            <PortfolioChart />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4,}}>
          <Box
            bgcolor={"background.default"}
            padding={"1rem"}
            borderRadius={"8px"}
            height={"330px"}
            overflow={"auto"}
          >
            <WatchList />
          </Box>
        </Grid>
      </Grid>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        // border="1px solid red"
        gap={1}
      >
        {/* Trademark: Bottom on mobile, left on sm+ */}
        <Typography
          variant="caption"
          textAlign={{ xs: "center", sm: "left" }}
          order={{ xs: 2, sm: 1 }}
        >
          Trioxtrade © 2025. All Rights Reserved.
        </Typography>

        {/* Links: Top on mobile, right on sm+ */}
        <Box
          display="flex"
          justifyContent="space-between"
          width={{ xs: "100%", sm: "50%", md: "40%" }}
          flexWrap="wrap"
          // border="1px solid green"
          order={{ xs: 1, sm: 2 }}
          gap={1}
        >
          <Typography variant="caption">FAQs</Typography>
          <Typography variant="caption">Terms and Condition</Typography>
          <Typography variant="caption">Privacy Policy</Typography>
        </Box>
      </Box>

    </Box>
  );
};

export default Dashboard;