import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FooterImage from "../../assets/footerImage.png";
import { useNavigate } from 'react-router';

const PreFooter = () => {

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        py: 8,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 6,
        }}
      >
        <Box sx={{ flex: 1, textAlign: isDesktop ? 'center' : 'left' }}>
          <Box
            component="img"
            src={FooterImage}
            alt="Trading UI"
            sx={{
              width: '100%',
              maxWidth: isDesktop ? 500 : 250,
            }}
          />
        </Box>

        <Box sx={{ 
          flex: 1, 
          textAlign: isDesktop ? 'left' : 'center' 
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            <Typography 
              component="span" 
              sx={{ color: '#00E5FF' }}
            >
              Start Trading with
            </Typography>{' '}
            <br />
            TRIOXTRADE
          </Typography>

          <Typography
            variant="body1"
            sx={{ 
              mt: 3, 
              color: 'grey.400', 
              maxWidth: 400, 
              mx: isDesktop ? 0 : "auto" 
            }}
          >
            Trust our local team of experts to guide and support your business operations through maintaining of your accounts and with the provision of treasury services.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/signup")}
            sx={{
              mt: 4,
              bgcolor: '#212121',
              color: '#00E5FF',
              py: 1.5,
              '&:hover': {
                bgcolor: '#00E5FF',
                color: '#000',
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PreFooter;
