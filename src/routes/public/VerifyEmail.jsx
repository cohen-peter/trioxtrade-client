import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Paper, Snackbar, Alert, CircularProgress, Stack } from "@mui/material";
import api from "../../services/axios";
import { useNavigate } from "react-router";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "success", message: "" });
  const [countdown, setCountdown] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // gets the stored email
    const storedEmail = localStorage.getItem("pendingEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    const source = localStorage.getItem("verificationSource");

    if (source === "signin" && email) {
      const sendVerification = async () => {
        try {
          await api.post("/auth/resend-verification", { email });
          setAlert({ open: true, type: "success", message: "Verification email sent!" });
          setCountdown(60);
        } catch (err) {
          setAlert({
            open: true,
            type: "error",
            message: err.response?.data?.message || "Failed to send verification email"
          });
        }
      };
      sendVerification();
    }

    if (source === "signup") {
      setCountdown(60)
    }

  }, [email]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/verify-email", { email, code });
      setAlert({ open: true, type: "success", message: "Email verified successfully!" });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setAlert({ open: true, type: "error", message: err.response?.data?.message || "Invalid or expired code. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await api.post("/auth/resend-verification", { email });
      setAlert({ open: true, type: "success", message: "Verification code resent!" });
      setCountdown(60); // Start cooldown
    } catch (err) {
      setAlert({ open: true, type: "error", message: err.response?.data?.message || "Failed to resend code" });
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper elevation={6} sx={{ p: 4, bgcolor: "#111", color: "white", width: "80%", maxWidth: 400 }}>
        <Typography variant="h5" mb={2} sx={{ textAlign: "center", color: "#3CE8F2" }}>
          Verify Your Email
        </Typography>
        <Typography variant="body2" mb={3} sx={{ textAlign: "center" }}>
          We sent a 6-digit code to <b>{email}</b>. Please enter it below.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            inputProps={{ maxLength: 6 }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": { borderColor: "#3CE8F2" },
                "&:hover fieldset": { borderColor: "#3CE8F2" }
              },
              "& .MuiInputLabel-root": { color: "#3CE8F2" }
            }}
          />

          <Stack spacing={2}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#3CE8F2",
                borderRadius: "8px",
                "&.Mui-disabled" : {
                  bgcolor: "rgb(60, 232, 242, 0.38)"
                }
              }}
              disabled={loading || code.length < 6}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Verify Email"}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleResend}
              disabled={countdown > 0 || resendLoading}
              sx={{
                borderColor: "#3CE8F2",
                borderRadius: "8px",
                color: "#3CE8F2",
                "&.Mui-disabled" : {
                  bgcolor: "rgb(60, 232, 242, 0.38)"
                }
              }}
            >
              {resendLoading ? (
                <CircularProgress size={24} sx={{ color: "#3CE8F2" }} />
              ) : countdown > 0 ? (
                `Resend Code (${countdown}s)`
              ) : (
                "Resend Code"
              )}
            </Button>
          </Stack>
        </form>
      </Paper>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alert.type} onClose={() => setAlert({ ...alert, open: false })}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
