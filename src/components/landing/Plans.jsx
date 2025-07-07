import {
  Box,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

// plans that we offer
const plans = [
  {
    title: "BASIC PLAN",
    price: "$100",
    rate: "10% DAILY",
    bg: "black",
    min: "$100",
    max: "$699",
    bonus: "$0 Gift Bonus",
  },
  {
    title: "STANDARD PLAN",
    price: "$700",
    rate: "30% DAILY",
    bg: "secondary.main",
    min: "$700",
    max: "$1,999",
    bonus: "$0 Gift Bonus",
  },
  {
    title: "ELITE PLAN",
    price: "$2000",
    rate: "50% DAILY",
    bg: "black",
    min: "$2000",
    max: "$3,999",
    bonus: "$0 Gift Bonus",
  },
  {
    title: "PREMIUM PLAN",
    price: "$4000",
    rate: "60% 48 HOURS",
    bg: "black",
    min: "$4,000",
    max: "$4,999",
    bonus: "$0 Gift Bonus",
  },
  {
    title: "VIP PLAN",
    price: "$5000",
    rate: "100% 48 HOURS",
    bg: "secondary.main",
    min: "$5000",
    max: "$19,999",
    bonus: "$0 Gift Bonus",
  },
  {
    title: "FAMILY PLAN",
    price: "$20k",
    rate: "100% 14 DAYS",
    bg: "black",
    min: "$20k",
    max: "Unlimited",
    bonus: "$0 Gift Bonus",
  },
];

// component for each individual plan card
const PlanCard = ({ plan }) => {
  const isCyan = plan.bg === "secondary.main";
  return (
    <Box
      sx={{
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
      <Box textAlign="left" mb={3}>
        {[`Min. Deposit: ${plan.min}`, `Max. Deposit: ${plan.max}`, plan.bonus].map((line, i) => (
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
        alignItems: "center" 
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
        Investment Plan
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
    </Box>
  );
};

export default InvestmentPlans;
