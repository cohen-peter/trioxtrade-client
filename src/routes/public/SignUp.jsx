import { 
  Alert,
  Box, 
  Container, 
  Snackbar, 
  Typography, 
  useTheme, 
  useMediaQuery 
} from "@mui/material";
import FormSheet from "../../components/FormSheet";
import Logo from "../../components/Logo";
import SignupImage from "../../assets/signUpImage.png"; 
import api from "../../services/axios";
import { useNavigate } from "react-router";
import { useState } from "react";


const SignUpPage = () => {

  const navigate = useNavigate();
  // state to set if button loading (ux state for visual while contacting backend)
  const [isLoading, setIsLoading] = useState(false);
  // state to hold any error message from the server
  const [errorMessage, setErrorMessage] = useState("");
  // state to show that the signup was successful
  const [showSuccess, setShowSuccess] = useState(false);

  //function to handle the signUp using the data. passed as prop to formsheet.
  const handleSignUp = async (data) => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await api.post("/auth/register", data);
      const signedUp = response.data;

      if (signedUp) {
        // show signup was successful and navigate to login
        setShowSuccess(true);
        localStorage.setItem("pendingEmail", signedUp.email);
        localStorage.setItem("verificationSource", "signup");
        setTimeout(() => {
          navigate("/verify-email");
        }, 2000);

      }
    } catch (error) {
      const message = error?.response?.data?.msg || "There was a problem creating your account, Please try again."
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container
      sx={{
        ...(isDesktop && {
          display: "flex",
          alignItems: "flex-end",
          gap: "5%",
          justifyContent: "center",
          boxSizing: "border-box",
        })
      }}
    >
      <Box
        sx={{
          mx: isDesktop ? 0 : 2, 
          my: 0,
          py: 0,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          ...(isDesktop && {
            width: "40%"
          })
        }}
      >
        {/* TRIOXTRADE LOGO */}
        <Logo />

        {/* Sign up header text */}
        <Box mb={4}>
          <Typography variant="h4" color="secondary.main" fontWeight={"bold"}>Sign Up</Typography>
          <Typography variant="caption">Please fill your details to open an account</Typography>
        </Box>

        {/* Sign up formsheet component */}
        <FormSheet type="signup" onSubmit={handleSignUp} isLoading={isLoading} errorMessage={errorMessage}/>
      </Box>

      {/* Snackbar component to show signup success */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Account created successfully!
        </Alert>
      </Snackbar>

      {/* Aesthethic visual section for large screens */}
      {isDesktop && (
        <Box width={"45%"} sx={{
          position: "relative",
          overflow: "hidden"
        }}>
          <Box 
            component={"img"}
            src={SignupImage}
            alt="Signup visual"
            sx={{
              position: "relative",
              objectFit: "cover",
              width: "90%",
              zIndex: 2
            }}
          />
          <Box
          sx={{
            position: "absolute",
            top: "-40px",
            right: "-60px",
            width: "220px",
            height: "220px",
            backgroundColor: "#00F0FF",
            transform: "rotate(10deg)",
            clipPath: "polygon(0% 0%, 100% 10%, 90% 100%, 0% 90%)",
            zIndex: 1,
          }}
        />

          {/* Light Cyan Mid Left Accent */}
          <Box
            sx={{
              position: "absolute",
              left: "-30px",
              top: "40%",
              width: "80px",
              height: "120px",
              backgroundColor: "#00F0FF",
              clipPath: "polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%)",
              zIndex: 1,
            }}
          />

          {/* Blue Curved Shape - Bottom Right */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-20px",
              right: "-30px",
              width: "180px",
              height: "180px",
              backgroundColor: "#005BFF",
              borderTopLeftRadius: "80px",
              borderBottomRightRadius: "50px",
              zIndex: 1,
            }}
          />
          {/* White T-Arrow Shape - Bottom Right */}
          <Box
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              width: "60px",
              height: "60px",
              backgroundColor: "#fff",
              clipPath: "polygon(0 30%, 40% 30%, 40% 0, 60% 0, 60% 30%, 100% 30%, 100% 50%, 60% 50%, 60% 100%, 40% 100%, 40% 50%, 0 50%)",
              zIndex: 2,
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default SignUpPage;