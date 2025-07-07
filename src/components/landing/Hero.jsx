import { 
  Box,
  Button,
  Container, 
  Typography,
  useMediaQuery
} from "@mui/material";
import heroIcon from "../../assets/heroIcon.png";
import mobileCoinSample from "../../assets/mobileCoinSample.png";
import coinSample from "../../assets/coinSample.png";
import theme from "../../theme";
import { useNavigate } from "react-router";

// Hero layout component for Desktop screens
const DesktopHero = () => {

  const navigate = useNavigate();

  return (
  <Container
    maxWidth={false}
    sx={{
      pt: "4rem",
      pb: "3rem",
      display: "flex",
      gap: 8,
      justifyContent: "center",
      backgroundColor: "background.alt",
      position: "relative",
    }}
  >
    <Box 
      display={"flex"} 
      flexDirection={"column"} 
      justifyContent={"center"} 
    >
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: "bold",
          width: "fit-content",
          fontSize: "2.5rem", 
          mb: { md: ".5rem" }
        }}
      >
        Trusted Crypto Preservation
      </Typography>

      <Box maxWidth={"500px"}>

        {/* Description section */}
        <Box>
          <Typography>
            Trioxtrade helps customers achieve their financial goals by helping them trade, mine and invest with ease.
          </Typography>
          <Typography>
            We are actively contributing to the cryptocurrency ecosystem, from launching awareness campaigns to releasing open-source mining software.
          </Typography>
        </Box>

        {/* BUTTON SECTION */}
        <Box display={"flex"} gap={2} mt={"1rem"}>
          <Button 
            variant="contained" 
            color="secondary" 
            sx={{ fontWeight: "bold" }}
            onClick={() => navigate("signup")}
          >
            Get Started
          </Button>
          <Button 
            color="text.primary"
            onClick={() => navigate("/login")}
            sx={{
              '&:hover': {
                backgroundColor: "rgba(255, 255, 255, 0.1)", 
                borderColor: "#fff", 
                color: "#fff"
              }
            }}  
          >
            Sign In
          </Button>
        </Box>

      </Box>
    </Box>
    
    {/* Hero Image section */}
    <Box 
      height={{ lg: "350px", md: "400px" }} 
      width={"440px"} overflow={"hidden"}
    >
      <Box 
        component={"img"}
        src={heroIcon}
        alt="Hero Image"
        sx={{
          py: { md: 0 },
          width: "100%",
          objectFit: "cover",
          objectPosition: "left"
        }}
      />
    </Box>

    {/* coin sample bar for desktop view positioned: absolute at the bottom of the screen */}
    <Box 
      sx={{ 
        display: "flex",
        justifyContent: "center",
        bgcolor: "secondary.main",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "1000px",
        maxHeight: "75px",
        p: "1rem",
        position: "absolute", 
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)"
      }}
    >
      <img src={coinSample} width={"90%"} alt="Crypto coins sample"/>
    </Box>
  </Container>
  )
};

// Hero layout component for Mobile screens
const MobileHero = () => {

  const navigate = useNavigate();

  return(
  <>
  <Container
    maxWidth={false}
    sx={{
      pt: "4rem",
      pb: "3rem",
      display: "flex",
      flexDirection: "column", 
      alignItems: "center",
      backgroundColor: "background.alt",
    }}
  >
    {/* Header and description box*/}
    <Box 
      display={"flex"} 
      flexDirection={"column"} 
      justifyContent={"center"} 
    >
      <Typography 
        variant="h4" 
        fontWeight={"bold"} 
        width={"fit-content"} 
      >
        Trusted Crypto Preservation
      </Typography>
      <Typography>
        Trioxtrade helps customers achieve their financial goals by helping them trade, mine and invest with ease.
      </Typography>
    </Box>

    {/* Image box */}
    <Box 
      component={"img"}
      alignSelf={"center"}
      src={heroIcon}
      alt="Hero Image"
      sx={{
        py: "2rem",
        width: "80%",
        maxWidth: "550px",
        maxHeight: "400px",
        objectFit: "contain",
      }}
    />

    {/* Button box */}
    <Box display={"flex"} gap={2}>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => navigate("signup")}
        sx={{ fontWeight: "bold" }}
      >
        Get Started
      </Button>
      <Button 
        color="text.primary"
        onClick={() => navigate("login")}
      >
        Sign In
      </Button>
    </Box>

  </Container>

  {/* Coin samples section */}
  <Box 
    display={"flex"} 
    justifyContent={"center"} 
    height={"200px"} 
    py={4}
  >
    <img src={mobileCoinSample} alt="Crypto coin samples"/>
  </Box>
  </>
  );
};

const Hero = () => {
  // sets a breakpoint for mobile/desktop screens
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); 

  //conditional render based on screen size
  return (
    <>
    {isDesktop ? <DesktopHero /> : <MobileHero />}
    </>
  );
};

export default Hero