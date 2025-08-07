import { 
  Routes, 
  Route, 
  Navigate,
  useNavigate
} from "react-router";
import { 
  ThemeProvider, 
  CssBaseline 
} from "@mui/material";
import theme from "./theme.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setAuthToken } from "./services/axios.js";
import useAutoLogout from "./hooks/useAutoLogout.js";
import ScrollToTop from "./components/ScrollToTop.jsx";
// pages
import LandingPage from "./routes/public/Landing.jsx";
import SignInPage from "./routes/public/SignIn.jsx";
import SignUpPage from "./routes/public/SignUp.jsx";
// dashboard pages
import DashboardLayout from "./layout/DashboardLayout.jsx";
import Dashboard from "./routes/dashboard/Dashboard.jsx";
import Deposit from "./routes/dashboard/Deposit.jsx";
import Transactions from "./routes/dashboard/Transactions.jsx";
import Investment from "./routes/dashboard/Investment.jsx";
import Plans from "./routes/dashboard/Plans.jsx";
import Settings from "./routes/dashboard/Settings.jsx";
import Withdrawal from "./routes/dashboard/Withdrawal.jsx";
import Verify from "./routes/dashboard/Verify.jsx";
import FAQ from "./routes/public/FAQ.jsx";
import LearnMore from "./routes/public/LearnMore.jsx";

function App() {

  // gets the token from state to set it in the authorization headers
  const token = useSelector((state) => state.user.token);
  // checks the state for token to see if the user is logged in
  const isAuth = Boolean(useSelector((state) => state.user.token));

  const navigate = useNavigate();
  // automatically logs out the user after the token expires
  useAutoLogout(navigate);
  // sets the token in the authorization header
  useEffect(() => {
    setAuthToken(token);
  }, [token]);
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/learn-more" element={<LearnMore />} />

          {/* Dashboard routes */}
          <Route 
            path="/dashboard" 
            element={isAuth ? <DashboardLayout /> : <Navigate to="/login" />} 
          >
            <Route index element={<Dashboard />} />
            {/* other dashboard routes */}
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdrawal" element={<Withdrawal />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="verify" element={<Verify />} />
            <Route path="investments" element={<Investment />} />
            <Route path="plans" element={<Plans />} />
            <Route path="Settings" element={<Settings />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
