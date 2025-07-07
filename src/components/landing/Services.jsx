import { 
  Box,
  Container, 
  Grid, 
  Typography, 
  useTheme, 
  useMediaQuery 
} from "@mui/material";
import serviceLogo1 from "../../assets/serviceLogo1.png";
import serviceLogo2 from "../../assets/serviceLogo2.png";
import serviceLogo3 from "../../assets/serviceLogo3.png";
import serviceLogo4 from "../../assets/serviceLogo4.png";
import serviceLogo5 from "../../assets/serviceLogo5.png";

// object of the list of services we offer with their icons
const services = [
  {
    title: "Powerful Trading Platforms",
    description:
      "Trioxtrade offers multiple platform options to cover the needs of each type of trader and investors .",
    icon: serviceLogo1
  },
  {
    title: "Fast Execution",
    description: "Super-fast trading software, so you never suffer slippage.",
    icon: serviceLogo2
  },
  {
    title: "Live Chat Support",
    description:
      "Connect with our support and Market Analyst on-demand.",
    icon: serviceLogo3
  },
  {
    title: "High Leverage",
    description:
      "Chance to magnify your investment and really win big with super-low spreads to further up your profits.",
    icon: serviceLogo4
  },
  {
    title: "Ultimate Security",
    description:
      "With advanced security systems, we keep your account always protected.",
    icon: serviceLogo5
  },
];

const ServicesSection = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container
      sx={{
        py: 8,
        textAlign: "center",
      }}
    >
      {/* Section Header */}
      <Typography
        variant="subtitle2"
        sx={{ color: "secondary.main", letterSpacing: 2, fontWeight: 600 }}
      >
        SERVICES
      </Typography>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mt: 1, mb: 6 }}
      >
        We provide successful trading experience!
      </Typography>

      {/* Grid of cards showing the services */}
      <Grid
        container
        spacing={isMobile ? 6 : 8}
        justifyContent="center"
      >
        {services.map((service, idx) => (
          <Grid
            key={idx}
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box maxWidth={300}>
              <Box 
                mb={2} 
                component={"img"}
                alt={`${service.title} icon`}
                src={service.icon}
                width={40}
              />
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
              >
                {service.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#c0c0c0", fontSize: 14 }}
              >
                {service.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ServicesSection;
