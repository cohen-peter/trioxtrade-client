import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../services/axios";
import { updateUserDetails } from "../../redux/userSlice";
import dayjs from "dayjs";

// Sample plans
const plans = [
  {
    id: "basic",
    name: "Basic/Starter Plan",
    price: 100,
    profitPercent: 10,
    durationHrs: 24,
    description: "Earn 10% profit in 24 hours",
  },
  {
    id: "apex",
    name: "Apex Plan",
    price: 700,
    profitPercent: 30,
    durationHrs: 24,
    description: "Earn 30% profit in 24 hours",
  },
  {
    id: "titanium",
    name: "Titanium Plan",
    price: 2000,
    profitPercent: 50,
    durationHrs: 24,
    description: "Earn 50% profit in 24 hours",
  },
  {
    id: "quantum",
    name: "Quantum Plan",
    price: 5000,
    profitPercent: 60,
    durationHrs: 48,
    description: "Earn 60% profit in 48 hours",
  },
  {
    id: "zenith",
    name: "Zenith Plan",
    price: 10000,
    profitPercent: 100,
    durationHrs: 72,
    description: "Earn 100% profit in 72 hours",
  },
];

const Investment = () => {
  const user = useSelector((state) => state.user.user);
  const [loadingId, setLoadingId] = useState(null);
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.user.transactions);
  const [balance, setBalance] = useState(0);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  // const [confirmCancel, setConfirmCancel] = useState(false);
  const [cancelPopup, showCancelPopup] = useState(false);
  // const [confirmActivate, setConfirmActivate] = useState(false);
  const [timeLeftMs, setTimeLeftMs] = useState(null);


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
      } else if (tx.type === "profit") {
        totalBalance += tx.amount;
      }
    });

    setBalance(totalBalance);

  },[transactions])

  // useEffect(() => {
  //   // ⚠️ Only run when the user or their activePlan changes
  //   if (!user?.nextPayout) {
  //     setTimeLeftMs(null);
  //     return;
  //   }

  //   // helper updates the clock once
  //   const updateClock = () => {
  //     const diff = user.nextPayout - Date.now();
  //     setTimeLeftMs(diff > 0 ? diff : 0);
  //   };

  //   updateClock();                       // initial fire
  //   const id = setInterval(updateClock, 1000); // tick each second

  //   // cleanup on unmount / user change
  //   return () => clearInterval(id);
  // }, [user?.nextPayout]);

  useEffect(() => {
    if (!user?.nextPayout || !user?.activePlan) return;
    // console.log("activated at", user.planActivatedAt)
    // console.log(typeof(user.nextPayout))
    const payoutTime = new Date(user.nextPayout).getTime();

    const update = () => {
      const now = Date.now();
      const diff = payoutTime - now;
      setTimeLeftMs(diff > 0 ? diff : 0);
    };

    update(); // initial call
    const intervalId = setInterval(update, 1000);

    return () => clearInterval(intervalId);
  }, [user?.nextPayout, user?.activePlan]);


  const format = (ms) => {
    if (ms === null || ms < 0) return "--:--:--";

    const totalSeconds = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return (
      String(hrs).padStart(2, "0") +
      ":" +
      String(mins).padStart(2, "0") +
      ":" +
      String(secs).padStart(2, "0")
    );
  };

  const displayAlert = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
  }

  const handleActivate = async (plan) => {
    if (balance < plan.price) {
      // alert("Not enough balance to activate this plan.");
      // setPopupMessage("");
      // setShowPopup(true);
      displayAlert("Not enough money in your account to activate this plan.");
      return;
    };
    if (activePlan) {
      // setPopupMessage("");
      // setShowPopup(true);
      displayAlert("Cancel your previous plan to activate a new one");
      return;
    };
    const currentDate = Date.now();
    const planData = {
      activePlan: plan.id, 
      planActivatedAt: currentDate, 
      nextPayout: new Date(currentDate + plan.durationHrs * 60 * 60 * 1000),
      planProfit: plan.profitPercent
    };
    try {
      setLoadingId(plan.id);
      const res = await api.put(`/user/update/${user._id}`, planData); // Adjust endpoint
      dispatch(updateUserDetails(res.data));
      // setPopupMessage("Plan activated successfully!");
      // setShowPopup(true);
      displayAlert("Plan activated successfully.");
      // alert("Plan activated successfully.");
    } catch (err) {
      // setPopupMessage("Error activating plan.")
      // setShowPopup(true);
      displayAlert("Error activating plan, Try again later.");
      // alert("Error activating plan.");
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleCancel = async () => {
    try {
      const res = await api.post(`/user/cancelplan/${user._id}`);
      if (res.data) {
        dispatch(updateUserDetails(res.data));
        displayAlert("Your plan has been cancelled.");
      }
      // alert("Plan cancelled.");
    } catch (err) {
      ("Error cancelling plan.");
    }
  };

  // useEffect(() => {
  //   console.log("user.nextPayout =", user?.nextPayout);
  //   console.log("Now =", Date.now());
  //   console.log("Time left in ms =", user?.nextPayout - Date.now());
  // }, [user?.nextPayout]);


  const activePlan = plans.find((p) => p.id === user.activePlan);

  return (
    <Box
      // sx={{
      //   minHeight: "85vh",
      //   p: 3,
      //   backgroundColor: "black",
      //   color: "white",
      // }}
    >
      <Typography variant="h4" fontWeight="bold" color="secondary.main" mb={3}>
        Investment Plans
      </Typography>

      {activePlan ? (
        <Box
          sx={{
            backgroundColor: "rgb(255, 255, 255, 0.3)",
            border: "1px solid",
            borderColor: "secondary.main",
            borderRadius: 2,
            p: 3,
            mb: 4,
          }}
        >
          <Typography variant="h6" color="secondary.main" fontWeight="bold">
            Active Plan: {activePlan.name}
          </Typography>
          <Typography fontSize=".9rem" fontWeight={"bold"}>
            Profit: {activePlan.profitPercent}% in {activePlan.durationHrs} hrs
          </Typography>
          {/* <Typography fontSize=".85rem" color="#A0A0A0" fontWeight={"bold"}>
            Next payout: {dayjs(user.nextPayout).format("MMM D, YYYY h:mm A")}
          </Typography> */}
          <Stack direction="row" spacing={1}>
            <Typography fontSize=".85rem" fontWeight="bold">
              Time left:
            </Typography>
            <Typography fontSize=".85rem" color="#A0A0A0" fontFamily="monospace">
              {format(timeLeftMs)}
            </Typography>
          </Stack>

          <Typography fontSize=".75rem" color="white">
            (pays out&nbsp;{dayjs(user.nextPayout).format("MMM D, YYYY h:mm A")})
          </Typography>


          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#2B2B2B", color: "#fff", borderRadius: "8px" }}
            onClick={() => showCancelPopup(true)}
          >
            Cancel Plan
          </Button>
        </Box>
      ) : (
        <Typography color="#ccc" mb={2}>
          No active plan. Choose a plan to activate:
        </Typography>
      )}

      <Divider sx={{ borderColor: "secondary.main", mb: 2}}/>

      <Grid container spacing={3} justifyContent={"center"}>
        {plans.map((plan) => (
          <Grid size={{ xs: 12, md: 4 }} key={plan.id}>
            <Card
              sx={{
                backgroundColor: "#1A1A1A",
                border: "1px solid #3CE8F2",
                color: "#fff",
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" color="secondary.main" fontWeight="bold">
                  {plan.name}
                </Typography>
                <Typography fontSize=".9rem" color="#bbb">
                  {plan.description}
                </Typography>
                <Divider sx={{ my: 1, borderColor: "#3CE8F2" }} />
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight="bold">Price:</Typography>
                  <Typography>${plan.price}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight="bold">Profit:</Typography>
                  <Typography>{plan.profitPercent}%</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight="bold">Duration:</Typography>
                  <Typography>{plan.durationHrs} hrs</Typography>
                </Stack>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#095CE0",
                    borderRadius: "8px",
                    color: "#fff",
                    textTransform: "none",
                  }}
                  disabled={loadingId === plan.id}
                  onClick={() => handleActivate(plan)}
                >
                  {loadingId === plan.id ? "Activating..." : "Activate"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog Box */}
      <Dialog
        open={showPopup}
        onClose={handleClosePopup}
        PaperProps={{ sx: { backgroundColor: 'black', textAlign: 'center' } }} 
      >
        <DialogTitle fontSize={".9rem"}>
          {popupMessage}
        </DialogTitle>
        <DialogActions>
          <Button 
            fullWidth
            onClick={handleClosePopup}
            variant="contained"  
            sx={{
              borderRadius: "8px",
              bgcolor: "background.alt",
              color: "#fff"
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog box for cancel */}
      <Dialog
        open={cancelPopup}
        onClose={handleClosePopup}
        PaperProps={{ sx: { backgroundColor: 'black', textAlign: 'center' } }} 
      >
        <DialogTitle fontSize={".9rem"}>
          {"Are you sure you want to cancel your plan."} 
          <br />
          {"The money will be returned to your account but no profit will be added."}
        </DialogTitle>
        <DialogActions>
          <Button 
            fullWidth
            onClick={() => showCancelPopup(false)}
            variant="contained"  
            sx={{
              borderRadius: "8px",
              bgcolor: "#2B2B2B",
              color: "#fff"
            }}
          >
            NO
          </Button>
          <Button 
            fullWidth
            onClick={() => { showCancelPopup(false); handleCancel()}}
            variant="contained"  
            sx={{
              borderRadius: "8px",
              bgcolor: "background.alt",
              color: "#fff"
            }}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog box for activate */}
      {/* <Dialog
        open={confirmActivate}
        onClose={handleClosePopup}
        PaperProps={{ sx: { backgroundColor: 'black', textAlign: 'center' } }} 
      >
        <DialogTitle fontSize={".9rem"}>
          {popupMessage}
        </DialogTitle>
        <DialogActions>
          <Button 
            fullWidth
            onClick={handleClosePopup}
            variant="contained"  
            sx={{
              borderRadius: "8px",
              bgcolor: "background.alt",
              color: "#fff"
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default Investment;
