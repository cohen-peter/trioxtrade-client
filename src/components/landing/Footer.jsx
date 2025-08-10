import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import {
  Email,
  Telegram,
  WhatsApp
} from '@mui/icons-material';
import footerLogo from "../../assets/footerLogo.png";

const Footer = () => {

  return (
    <Container sx={{ py: 5 }}>
      <Box
        component="footer"
        sx={{
          width: "100%",
          // bgcolor: "#095CE0",
          color: "white",
          mt: 6,
          pt: 4,
          pb: 2,
          px: { xs: 3, sm: 8 },
        }}
      >
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" gap={4}>


          {/* Left */}
          <Box flex={1}>
            <Box mb={2}
              component={"img"}
              src={footerLogo}
              onClick={() => navigate("/")}
              sx={{cursor: "pointer"}}
              alt='Trioxtrade Logo'
              width={140}
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
            <Box display="flex" alignItems="center" mb={1}>
              <Email sx={{ mr: 1, color: "#3CE8F2" }} />
              <Typography fontSize={14}>support@trioxtrade.com</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <WhatsApp sx={{ mr: 1, color: "#3CE8F2" }} />
              <Typography fontSize={14}>+44 7931 377432</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Telegram sx={{ mr: 1, color: "#3CE8F2" }} />
              <Typography fontSize={14}>@trioxsupport</Typography>
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
    </Container>
  );
};

export default Footer;
