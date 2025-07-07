import { 
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Typography, 
  useMediaQuery, 
  Divider
} from "@mui/material";
import mobileAboutUsImage from "../../assets/mobileAboutUsImage.png";
import desktopAboutUsImage from "../../assets/desktopAboutUsImage.png";
import theme from "../../theme";

// component for the mobile about us section
const MobileAboutUs = () => {

  return(
    <Container
      sx={{
        position: "relative",
        backgroundColor: "background.alt",
        paddingInline: {xs: 0, sm: 0},
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* About us visual image */}
      <Box
        component={"img"}
        src={mobileAboutUsImage}
        alt="Image of some TrioxTrade employees"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          maskImage: "linear-gradient(to bottom, black 50% transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
        }}
      />

      {/* Card holding the text */}
      <Card
        sx={{
          width: "80%",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderRadius: "15px",
          boxShadow: "none",
          zIndex: 5,
          padding: "3rem 2rem 3rem",
          marginBlock: {xs: "270px 5rem", sm:"450px 5rem"}
        }}
      >
        {/* contents of the card (about us) */}
        <CardContent>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography 
              color="text.secondary" 
              variant="h6" 
              fontWeight={"bold"}
            >
              ABOUT US
            </Typography>
            <Divider 
              sx={{
                bgcolor: "text.primary",
                width: "40%",
                height: "1px",
              }}
            />
          </Box>
          <Typography variant="h4" fontWeight={"bold"} mb={2}>WHO WE ARE</Typography>
          <Typography textAlign={"justify"} fontSize={14} mb={4}>
            Trioxtrade is the rapidly rising and most promising crypto trading program currently available that focus on providing profitable crypto investment solutions via AI bot trading.
          </Typography>
          <Typography textAlign={"justify"} fontSize={14}>
            The vigorous activity in this area has allowed the Company to generate an effective team of experts and get a great practical experience.
            We firmly believe in the prospects of cryptocurrency exchange trading since the crypto market is the largest market by volume and therefore has the highest liquidity on many exchanges.
          </Typography>
        </CardContent>
        <CardActions>
          <Button 
            variant="contained" 
            fullWidth sx={{
              bgcolor: "background.default",
              color: "text.primary"
            }}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
      
      {/* Visual design for the page */}
      <Box
        sx={{
          position: "absolute",
          bottom: -240,
          right: 0,
          width: '210px',
          height: '420px',
          backgroundColor: '#fff',
          borderRadius: '20%',
          transform: 'rotate(25deg)',

        }}
      />
    </Container>
  );
};

// component for the desktop about us section
const DesktopAboutUs = () => {

  return (
    <Container
      maxWidth
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        position: "relative",
        backgroundColor: "background.alt",
        marginInline: {md: "0", lg: "0"},
        paddingBlock: "10rem",
      }}
    >

      {/* Visual design for the page (svg) */}
      <Box 
        sx={{
          position: "absolute",
          top: 30,
          left: -150,
          width: "500px",
          height: "700px",
        }}
      >
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
            M0,40 
            Q0,0 50,0 
            L1390,40 
            Q1440,40 1440,80 
            L1440,540 
            Q1440,580 1390,580 
            L50,550 
            Q0,540 0,500 
            Z
          "
            fill="#fff"
          />
        </svg>
      </Box>     
      
      {/* Image for the desktop about us */}
      <Box
        component={"img"}
        src={desktopAboutUsImage}
        alt="Image of some Trioxtrade employees"
        height={"450px"}
        sx={{
          position: "relative",
          objectFit: "contain"
        }}
      />

      {/* About us content */}
      <Box width={400}>
        {/* HEADER */}
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Typography 
            color="secondary.main" 
            variant="h6" 
            fontWeight={"bold"}
          >
            ABOUT US
          </Typography>

          <Divider 
            sx={{
              bgcolor: "text.primary",
              width: "40%",
              height: "1px",
            }}
          />
        </Box>

        <Typography textAlign={"justify"} variant="h4" mb={4} fontWeight={"bold"}>WHO WE ARE</Typography>
        <Typography textAlign={"justify"} mb={4} fontWeight={"bold"}>
          Trioxtrade is the rapidly rising and most promising crypto trading program currently available that focus on providing profitable crypto investment solutions via AI bot trading.
        </Typography>
        <Typography textAlign={"justify"} fontWeight={"bold"} mb={3}>
          The vigorous activity in this area has allowed the Company to generate an effective team of experts and get a great practical experience.
          We firmly believe in the prospects of cryptocurrency exchange trading since the crypto market is the largest market by volume and therefore has the highest liquidity on many exchanges.
        </Typography>
        <Button 
          sx={{ 
            color: "text.secondary", 
            borderColor: "text.secondary", 
            fontWeight: "700" 
            }}
          >
            Learn More
          </Button>
      </Box>
      
    </Container>
  );
};

// About us component. renders desktop or mobile based on the screensize
const AboutUs = () => {

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
    {isDesktop ? <DesktopAboutUs /> : <MobileAboutUs />}
    </>
  );
};

export default AboutUs;