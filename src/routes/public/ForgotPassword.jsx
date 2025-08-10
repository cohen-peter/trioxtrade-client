import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import api from "../../services/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/forgot-password", { email });
      setSnackbar({
        open: true,
        message: res.data.message || "Password reset link sent successfully",
        severity: "success",
      });
      setEmail("");
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Error sending reset email",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#000",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          sx={{
            bgcolor: "#000",
            p: 3,
            boxShadow: "none",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#00EFFF", mb: 1 }}
          >
            Forgot Password
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#ccc", mb: 3 }}
          >
            Enter your email to receive a password reset link.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="email"
              variant="outlined"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                mb: 2,
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#00EFFF" },
                  "&.Mui-focused fieldset": { borderColor: "#00EFFF" },
                },
                "& .MuiInputBase-input::placeholder": { color: "#aaa" },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: "#00EFFF",
                color: "#000",
                fontWeight: "bold",
                borderRadius: "10px",
                py: 1.5,
                "&:hover": { bgcolor: "#00cce0" },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
            </Button>
          </form>

          <Box sx={{ mt: 3 }}>
            <Link href="/login" underline="hover" sx={{ color: "#00EFFF" }}>
              Back to Sign In
            </Link>
          </Box>
        </Paper>
      </Container>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPassword;
