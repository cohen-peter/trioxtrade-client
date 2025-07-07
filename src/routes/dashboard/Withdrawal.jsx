import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../services/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { addTransaction } from "../../redux/userSlice";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const transactions = useSelector((state) => state.user.transactions);
  // const balance = useSelector((state) => state.user.balance); // If balance is nested in user, use user.balance
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState("");
  const transactionId = `WIT-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;


  useEffect(() => {
    if (!transactions || transactions.length == 0) {
      setBalance(0);
      return;
    }

    let totalBalance = 0;

    transactions.forEach((tx) => {
      if (tx.status !== "completed") return;

      if (tx.type === "deposit") {
        totalBalance += tx.amount;
      } else if (tx.type === "withdrawal") {
        totalBalance -= tx.amount;
      } else if (tx.type === "profit") {
        totalBalance += tx.amount;
      }
    });

    setBalance(totalBalance);
  },[transactions])

  const schema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .min(100, "Minimum withdrawal is $100")
      .max(balance, "Cannot withdraw more than available balance"),
    walletAddress: Yup.string().required("Wallet address is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: balance,
      walletAddress: user?.walletAddress || "",
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/transactions/add", {
        transactionId, 
        userId: user._id,
        amount: data.amount,
        type: "withdrawal",
      });
      dispatch(addTransaction(res.data));
      // console.log(res.data)
      await api.put(`/user/update/${user._id}`, {walletAddress: data.walletAddress});
      setPopup("Withdrawal request submitted. Awaiting approval.");
      reset();
    } catch (err) {
      console.error(err);
      setPopup("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={3}
      height={"85vh"}
      // justifyContent={"center"}
      bgcolor={"#1A1A1A"}
      borderRadius={"8px"}
      padding={2}
      pt={{ xs: "50%", sm: "20%" }}
      border={"1px solid"}
      borderColor={"secondary.main"}
      // alignItems={}
    >
      <Typography variant="h4" fontWeight="bold" color="secondary.main" mb={2}>
        Withdraw USDT
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Amount (USD)"
            type="number"
            {...register("amount")}
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />

          <TextField
            label="USDT Wallet Address"
            {...register("walletAddress")}
            error={!!errors.walletAddress}
            helperText={errors.walletAddress?.message}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ bgcolor: "#095CE0", borderRadius: "8px"}}
          >
            {loading ? <CircularProgress size={24} /> : "Submit Withdrawal"}
          </Button>
        </Stack>
      </form>

      <Dialog 
        open={!!popup} 
        onClose={() => setPopup("")}
        PaperProps={{
          sx: {
            bgcolor: "black"
          }
        }}
      >
        <DialogTitle fontSize=".9rem" textAlign="center">
          {popup}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => setPopup("")}
            fullWidth
            variant="contained"
            sx={{ borderRadius: "8px", color: "#fff", bgcolor: "#095CE0" }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Withdrawal;
