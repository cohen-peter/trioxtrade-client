import {
  Box,
  Tab,
  Typography
} from "@mui/material";
import {
  TabContext,
  TabList,
  TabPanel
} from "@mui/lab";
import { useState } from "react";
import { useSelector } from "react-redux";
import TransactionTable from "../../components/TransactionTable";


const Transactions = () => {

  const transactions = useSelector((state) => state.user.transactions);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box>
      <Typography fontWeight={"bold"}>History</Typography>
      <Typography fontWeight={"bold"} color="secondary.main" fontSize={"32px"}>Transactions</Typography>
      <Typography color="#929EAE" variant="caption">List of transactions in your account.</Typography>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
          <TabList 
            onChange={handleChange} 
            aria-label="Transactions"
            sx={{
              "& .MuiTab-root": {
                color: "#fff",
                "&.Mui-selected": {
                  color: "#fff"
                }
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "background.alt"
              }
            }}
          >
            <Tab label="History" value="1" />
            <Tab label="Deposit" value="2" />
            <Tab label="Withdraw" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ p: 0 }}>
          <TransactionTable transactions={transactions} />
        </TabPanel>
        <TabPanel value="2" sx={{ p: 0 }}>
          <TransactionTable transactions={transactions} type={"deposit"} />
        </TabPanel>
        <TabPanel value="3" sx={{ p: 0 }}>
          <TransactionTable transactions={transactions} type={"withdrawal"} />
        </TabPanel>
      </TabContext>
    </Box>
  )
};

export default Transactions;
