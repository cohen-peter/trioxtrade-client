import { 
  Box, 
  Typography 
} from "@mui/material";
import LogoImage from "../assets/logo.png";
import { useNavigate } from "react-router";

const Logo = () => {

  const navigate = useNavigate();
  return (
    <>
    {/* Trioxtrade logo */}
    <Box 
      display={"flex"} 
      gap={2} py={{ xs: 4, sm: 10 }} 
      alignItems={"center"} 
      margin={"0 auto"}
      onClick={() => navigate("/")}
      sx={{
        cursor: "pointer"
      }}
    >
      <img src={LogoImage} alt="Trioxtrade Logo" width={40} />
      <Box>
        <Typography variant="h4" mb={0} lineHeight={.8}>TRIOXTRADE</Typography>
        <Typography variant="caption" color="secondary.main" mt={"-10px"}>INVESTMENT</Typography>
      </Box>
    </Box>
    </>
  );
}

export default Logo;