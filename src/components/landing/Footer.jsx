import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import {
  Email,
  Phone,
} from '@mui/icons-material';
import footerLogo from "../../assets/footerLogo.png";

const Footer = () => {

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={6}>
        <Grid>
          <Box mb={2}
            component={"img"}
            src={footerLogo}
            alt='Trioxtrade Logo'
            width={140}
          />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Contact Us
          </Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <Phone sx={{ color: '#00E5FF', mr: 1 }} fontSize="small" />
            <Typography variant="body2">(524) 333 6565</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Email sx={{ color: '#00E5FF', mr: 1 }} fontSize="small" />
            <Typography variant="body2">support@trioxtrade.com</Typography>
          </Box>
        </Grid>
      </Grid>

      <Box mt={6} pt={2} borderTop="1px solid #444" textAlign="center">
        <Typography variant="body2" sx={{ color: 'gray' }}>
          © 2025 Trioxtrade Investment • All Rights Reserved
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
