import {
  Box,
  Typography,
  Container,
  Button,
  Toolbar,
  Divider,
  useTheme,
} from "@mui/material";
import Navbar from "../../components/landing/Navbar";
import footerLogo from "../../assets/footerLogo.png";
import { useNavigate } from "react-router";

// icons for footer
import PhoneIcon from '@mui/icons-material/Phone';
import TelegramIcon from '@mui/icons-material/Telegram';
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Email, WhatsApp } from "@mui/icons-material";


const LearnMore = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Toolbar />
      <Box sx={{ bgcolor: "#095CE0", py: 6, minHeight: "100vh", color: "white" }}>
        <Container maxWidth="md">
          {/* About Section */}
          <Box
            sx={{
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 4,
              px: 4,
              py: 4,
              mb: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              About Us – TRIOXTRADE
            </Typography>
            {/* <Typography variant="h6" mb={2}>
              Empowering Your Crypto Wealth. Securely. Consistently. Globally.
            </Typography> */}

            <Typography >
              TRIOXTRADE is a next-gen crypto investment platform designed to provide safe and consistent returns using modern digital asset strategies.
            </Typography>

            <Typography variant="h5" fontWeight="bold" mt={3}>
              Who We Are
            </Typography>
            <Typography >
              A team of experienced traders, blockchain technologists, and financial analysts dedicated to helping you grow your crypto wealth.
            </Typography>

            <Typography variant="h5" fontWeight="bold" mt={3}>
              What We Do
            </Typography>
            <ul>
              <li>💼 Managed Crypto Investment Plans</li>
              <li>🔐 Secure Portfolio Management</li>
              <li>📈 Consistent Profit Distribution</li>
              <li>🎓 Educational & Investor Support</li>
            </ul>

            <Typography variant="h5" fontWeight="bold" mt={3}>
              Our Vision
            </Typography>
            <Typography >
              To be the most trusted and transparent crypto wealth partner in the world.
            </Typography>

            <Typography variant="h5" fontWeight="bold" mt={3}>
              Our Mission
            </Typography>
            <Typography >
              To make digital asset investing simple, secure, and rewarding for everyone.
            </Typography>

            <Typography variant="h5" fontWeight="bold" mt={3}>
              Why TRIOXTRADE?
            </Typography>
            <ul>
              <li>✅ Expert-Driven Investment Strategies</li>
              <li>✅ Verified KYC & Security Standards</li>
              <li>✅ Transparent Profit System</li>
              <li>✅ 24/7 Global Support</li>
              <li>✅ Referral & Community Rewards</li>
            </ul>

          </Box>

          {/* Heading Section */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(90deg, #3CE8F2, #fff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: {
                  xs: "1.8rem",  // small screens
                  sm: "2.4rem",
                  md: "3rem",    // medium
                  lg: "3.5rem",  // large
                },
                lineHeight: 1.2,
              }}
            >
              How TRIOXTRADE Profits from Its Investors
            </Typography>
            <Typography variant="p" fontSize={".9rem"} fontWeight={"bold"} mt={2}>
              Our sustainable model ensures transparency and shared success.
            </Typography>
          </Box>

          {/* Section Box */}
          <Box
            sx={{
              // backgroundColor: "rgba(255,255,255,0.08)",
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 4,
              px: 4,
              py: 4,
              mb: 6,
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              1. Profit Sharing Model
            </Typography>
            <Typography >
              TRIOXTRADE earns a percentage of the profits generated through our investment strategies, only when you profit.
            </Typography>

            <Typography variant="h5" fontWeight="bold" mt={4} gutterBottom>
              2. Service Fees Built Into Plans
            </Typography>
            <Typography >
              Advanced investment plans include small, transparent management fees that fund strategy development and investor support.
            </Typography>

            <Typography variant="h5" fontWeight="bold" mt={4} gutterBottom>
              3. Network & Liquidity Incentives
            </Typography>
            <Typography >
              In DeFi strategies, TRIOXTRADE earns extra rewards by providing liquidity or engaging in yield farming.
            </Typography>

            <Typography variant="h5" fontWeight="bold" mt={4} gutterBottom>
              4. Sustainable & Transparent
            </Typography>
            <Typography >
              We grow as you grow—our profits are tied to your success.
            </Typography>

            <Box sx={{ textAlign: "center", mt: 6 }}>
              <Typography
                variant="h5"
                sx={{ color: "#3CE8F2", fontWeight: "bold", mb: 2 }}
              >
                Join a Smarter Way to Invest in Crypto
              </Typography>
              <Typography sx={{ color: "white", mb: 3 }}>
                Whether you're new to crypto or a seasoned investor, TRIOXTRADE offers the tools and support you need to grow confidently.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/signup")}
                sx={{
                  bgcolor: "#3CE8F2",
                  color: "#000",
                  fontWeight: "bold",
                  px: 4,
                  py: 1.5,
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "white",
                    color: "#095CE0",
                  },
                }}
              >
                Start Investing with Confidence
              </Button>
            </Box>
          </Box>


        </Container>
        {/* White Divider for Footer */}
        <Box
          sx={{
            mt: 8,
            mb: 4,
            height: "3px",
            bgcolor: "white",
            width: "100%",
          }}
        />
        {/* Footer */}
        <Box
          component="footer"
          sx={{
            width: "100%",
            // bgcolor: "#095CE0",
            // color: "white",
            // mt: 6,
            // pt: 4,
            // pb: 2,
            px: { xs: 3, sm: 8 },
          }}
        >
          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" gap={4}>


            {/* Left */}
            <Box flex={1}>
              <Box mb={2}
                component={"img"}
                onClick={() => navigate("/")}
                src={footerLogo}
                alt='Trioxtrade Logo'
                width={140}
                sx={{cursor: "pointer"}}
              />
              {/* <Typography variant="h6" gutterBottom>
                TRIOXTRADE
              </Typography> */}
              <Typography fontSize={12} maxWidth={400}>
                Secure, algorithm-backed crypto investments. Grow your digital wealth with expert-managed portfolios and 24/7 transparency.
              </Typography>
            </Box>

            {/* Middle - Contact */}
            <Box flex={1}>
              <Typography variant="h6" gutterBottom fontSize={"16px"}>
                Contact Us
              </Typography>
              {/* <Box display="flex" alignItems="center" mb={1}>
                <Email sx={{ mr: 1, color: "#3CE8F2" }} />
                <Typography fontSize={14}>support@trioxtrade.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <WhatsApp sx={{ mr: 1, color: "#3CE8F2" }} />
                <Typography fontSize={14}>+44 7931 377432</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <TelegramIcon sx={{ mr: 1, color: "#3CE8F2" }} />
                <Typography fontSize={14}>@trioxsupport</Typography>
              </Box> */}
              <Box
                component="a"
                href="mailto:support@trioxtrade.com"
                display="flex"
                alignItems="center"
                mb={1}
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Email sx={{ mr: 1, color: "#3CE8F2" }} />
                <Typography fontSize={14} color="textPrimary">
                  support@trioxtrade.com
                </Typography>
              </Box>
              <Box
                component="a"
                href="https://wa.me/447931377432" // Remove the "+" for wa.me links
                target="_blank"
                display="flex"
                alignItems="center"
                mb={1}
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                <WhatsApp sx={{ mr: 1, color: "#3CE8F2" }} />
                <Typography fontSize={14} color="textPrimary">
                  +44 7931 377432
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Copyright */}
          <Box
            mt={4}
            pt={2}
            borderTop="1px solid rgb(255, 255, 255)"
            textAlign="center"
            fontSize={12}
          >
            <Typography fontSize={12}>
              &copy; {new Date().getFullYear()} TRIOXTRADE. All rights reserved.
            </Typography>
          </Box>
        </Box>

        </Box>


    </>
  );
};

export default LearnMore;
