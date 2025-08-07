import {
  Box,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BarChartIcon from "@mui/icons-material/BarChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PsychologyIcon from "@mui/icons-material/Psychology";

// plans that we offer
const plans = [
  {
    title: "BASIC/STARTER PLAN",
    price: "$100",
    rate: "10% DAILY",
    bg: "black",
    min: "$100",
    max: "$699",
    // bonus: "$0 Gift Bonus",
    description: "Perfect for first-time investors"
  },
  {
    title: "APEX PLAN",
    price: "$700",
    rate: "30% DAILY",
    bg: "secondary.main",
    min: "$700",
    max: "$1,999",
    // bonus: "$0 Gift Bonus",
    description: "Best balance of affordability and profit"
  },
  {
    title: "TITANIUM PLAN",
    price: "$2,000",
    rate: "50% DAILY",
    bg: "black",
    min: "$2000",
    max: "$4,999",
    // bonus: "$0 Gift Bonus",
    description: "Designed for serious profit-takers"
  },
  {
    title: "QUANTUM PLAN",
    price: "$5,000",
    rate: "60% 48 HOURS",
    bg: "black",
    min: "$4,000",
    max: "$4,999",
    // bonus: "$0 Gift Bonus",
    description: "Ideal for short-term high returns"
  },
  {
    title: "ZENITH PLAN",
    price: "$10,000",
    rate: "100% 72 HOURS",
    bg: "secondary.main",
    min: "$10,000",
    max: "Unlimited",
    // bonus: "$0 Gift Bonus",
    description: "Exclusive to only elite investors"
  },
  // {
  //   title: "FAMILY PLAN",
  //   price: "$20k",
  //   rate: "100% 14 DAYS",
  //   bg: "black",
  //   min: "$20k",
  //   // max: "Unlimited",
  //   // bonus: "$0 Gift Bonus",
  // },
];

// component for each individual plan card
const PlanCard = ({ plan }) => {
  const isCyan = plan.bg === "secondary.main";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: plan.bg,
        color: isCyan ? "black" : "white",
        borderRadius: 2,
        p: 4,
        textAlign: "center",
        boxShadow: 3,
        maxWidth: 320,
        mx: "auto",
      }}
    >
      <Typography fontWeight="bold" mb={1} letterSpacing={1}>
        {plan.title}
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        {plan.price}
      </Typography>
      <Typography fontWeight="bold" fontSize={14} mb={2}>
        {plan.rate}
      </Typography>

      {/* Plan descriptions */}
      <Box textAlign="left" mb={2} alignSelf={"center"}>
        {[`Min. Deposit: ${plan.min}`, `Max. Deposit: ${plan.max}`].map((line, i) => (
          <Typography
            key={i}
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              mb: 0.5, 
              fontSize: 14 
            }}
          >
            <CheckIcon
              sx={{ 
                fontSize: 16, 
                mr: 1, color: 
                isCyan ? "black" : "secondary.main" 
              }}
            />
            {line}
          </Typography>
        ))}
      </Box>

      <Typography fontWeight="bold" fontSize={12} >
        {plan.description.toUpperCase()}
      </Typography>
    </Box>
  );
};

// investment plan section component
const InvestmentPlans = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box 
      sx={{ 
        py: 8, 
        px: 3, 
        background: "white", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: 600,
          letterSpacing: 2,
          color: "#0070F0",
          textTransform: "uppercase",
          mb: 1,
        }}
      >
        Investment Plans
      </Typography>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={6}
        sx={{ color: "#0A0A0A" }}
      >
        Our flexible plans
      </Typography>

      {/* Grid for the plans */}
      <Grid
        container
        spacing={isMobile ? 4 : 6}
        justifyContent="center"
        width={"70%"}
      >
        {plans.map((plan, index) => (
          <Grid
            size={{ xs: 12, md: 4 }}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PlanCard plan={plan} />
          </Grid>
        ))}
      </Grid>
      
      {/* Additional Information Section */}
      <Box
        sx={{
          mt: 8,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          textAlign: "center"

        }}
      >
        <Box
          sx={{
            width: "70%",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={1}
            textAlign="center"
            sx={{ textTransform: "uppercase", color: "#0070F0", letterSpacing: 1 }}
          >
            Additional Benefits
          </Typography>

          {[
            "Instant Reinvestment Options.",
            "Real-time profit tracking.",
            "24/7 Customer Support.",
            "Secured Crypto Wallet Integration.",
            "Referral rewards available.",
          ].map((text, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                // border: "1px solid purple",
                // borderColor: "secondary.main",
                p: .5,
                mb: 1,
                borderRadius: 1,
              }}
            >
              <CheckCircleOutlineIcon sx={{ color: "#0070F0", fontSize: 20, mr: 1, mt: "2px" }} />
              <Typography fontSize={14} color="black">
                {text}
              </Typography>
            </Box>
          ))}

          <Typography
            variant="h6"
            fontWeight="bold"
            mt={3}
            mb={1}
            textAlign="center"
            sx={{ textTransform: "uppercase", color: "#0070F0", letterSpacing: 1 }}
          >
            🛡️ Key Features
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",    // center children horizontally
              gap: 1,                  // spacing between items
            }}
          >
            {[
              {
                icon: <BusinessCenterIcon sx={{ color: "#4caf50", fontSize: 20, mr: 1, mt: "2px" }} />,
                text: "All returns are net, after management and performance fees.",
              },
              {
                icon: <BarChartIcon sx={{ color: "#2196f3", fontSize: 20, mr: 1, mt: "2px" }} />,
                text: "No hidden charges, full transparency through your dashboard.",
              },
              {
                icon: <AttachMoneyIcon sx={{ color: "#f57c00", fontSize: 20, mr: 1, mt: "2px" }} />,
                text: "Early withdrawal is available for some plans, with an exit adjustment fee.",
              },
              {
                icon: <PsychologyIcon sx={{ color: "#9c27b0", fontSize: 20, mr: 1, mt: "2px" }} />,
                text:
                  "Assets are managed across top-performing DeFi pools, staking platforms, and algorithmic strategies.",
              },
              {
                icon: <LockPersonIcon sx={{ color: "#e91e63", fontSize: 20, mr: 1, mt: "2px" }} />,
                text: "KYC/AML-compliant platform for investor security.",
              },
            ].map(({ icon, text }, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  py: .5,
                  borderRadius: 1,
                }}
              >
                {icon}
                <Typography fontSize={14} color="black">
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

    </Box>
  );
};

export default InvestmentPlans;
