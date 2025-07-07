import { 
  Box, 
  Container, 
  Typography, 
  useTheme, 
  useMediaQuery 
} from "@mui/material";
import FormSheet from "../../components/FormSheet.jsx";
import Logo from "../../components/Logo.jsx";
import SignInImage from "../../assets/signInImage.png";
import api from "../../services/axios.js";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/userSlice.js";
import { useState } from "react";

const SignInPage = () => {

  // state to set if button loading (ux state for visual while contacting backend)
  const [isLoading, setIsLoading] = useState(false);
  // state to hold any error message from the server
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // function to handle the signIn using the data. passed to the formsheet component
  const handleSignIn = async (data) => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await api.post("/auth/login", data);
      const loggedIn = response.data;
      
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/dashboard");
      };
    } catch (error) {
      const message = error?.response?.data?.msg || "Server Error. Please try again later"
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  
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

    {/* Sign in form section */}
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ...(isDesktop && {
          width: "40%"
        })
      }}
    >
      {/* TRIOXTRADE LOGO */}
      <Logo />

      {/* Sign In header texts */}
      <Box mb={4} >
        <Typography
          variant="h4"
          color="secondary.main"
          fontWeight={"bold"}
        >Sign In</Typography>
        <Typography variant="caption">Please fill your detail to access your account</Typography>
      </Box>

      {/* Sign in formsheet component */}
      <FormSheet type="signin" onSubmit={handleSignIn} isLoading={isLoading} errorMessage={errorMessage}/>
    </Box>

    {/* Aesthethic visual section for large screens */}
    {isDesktop && (
      <Box width={"35%"} sx={{
        position: "relative",
        overflow: "hidden",
      }}
      >
        <Box 
          component={"img"}
          src={SignInImage}
          alt="Signin visual"
          sx={{
            position: "relative",
            objectFit: "cover",
            width: "90%",
            zIndex: 2
          }}
        />

      </Box>
    )}
    
    </Container>
  );
};


export default SignInPage;