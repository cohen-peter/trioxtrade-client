import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton,
  ListItemText, 
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router';
import DashboardIcon from '../assets/dashboardIcon.png';
import InvestmentIcon from '../assets/investmentIcon.png';
import PlanIcon from '../assets/planIcon.png';
import TransactionIcon from '../assets/transactionsIcon.png';
import SettingsIcon from '../assets/settingsIcon.png';
import HelpIcon from '../assets/helpIcon.png';
import LogoutIcon from '../assets/logoutIcon.png';
import LogoImage from '../assets/logo.png';
import theme from '../theme';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setLogout, setTransactions } from '../redux/userSlice';

//switch icons for something more consistent
import icon2 from "../assets/icon2.png"
import icon3 from "../assets/icon3.png"

// width of the sidebar/drawer
const drawerWidth = 240;

// the different routes/options on the sidebar with their icons
const menuItems = [
  { text: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { text: "Deposit", icon: icon2, path: '/dashboard/deposit'},
  { text: "Withdrawal", icon: icon3, path: '/dashboard/withdrawal'},
  { text: 'Transactions', icon: TransactionIcon, path: '/dashboard/transactions' },
  { text: "Investment", icon: InvestmentIcon, path: "/dashboard/investments"},
  // { text: "Our Plans", icon: PlanIcon, path: "/dashboard/plans"},
  { text: 'Settings', icon: SettingsIcon, path: '/dashboard/settings'}
];

// sidebar component. takes isMobile to render the type of sidebar depending on screen size
// handledrawertoggle to toggle the sidebar on mobile and mobileopen state from dashboardlayout
// to check whether sidebar is open.
const Sidebar = ({ mobileOpen, handleDrawerToggle, isMobile }) => {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function to logout the user
  const handleLogout = () => {
    dispatch(
      setLogout({
        user: null,
        token: null
      })
    );
    dispatch(setTransactions({transactions: []}))
    navigate("/login");
  };

  // contents of the sidebar/drawer component
  const drawerContent = (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        overflow: 'auto', 
      }}
    >

      <Box display={"flex"} flexDirection={"column"}>

        {/* Trioxtrade Logo */}
        <Box 
          display={"flex"} 
          gap={1} 
          py={3} 
          alignItems={"center"} 
          margin={"0 auto"}
        >
          <img src={LogoImage} alt="Trioxtrade Logo" width={25}/>
          <Box>
            <Typography 
              sx={{
                fontSize: "1.4rem"
              }} 
              mb={0} 
              lineHeight={.8}
            >
              TRIOXTRADE
            </Typography>
            <Typography 
              color="secondary.main" 
              sx={{
                fontSize: ".7rem"
              }}
            >
              INVESTMENT
            </Typography>
          </Box>
        </Box>
      
        {/* Top menu */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              sx={{
                padding: 0,
                mb: 1,
              }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={isMobile ? handleDrawerToggle : undefined}
                sx={{
                  borderRadius: "8px",
                  '&:hover': {
                    bgcolor: "background.alt"
                  },
                  "&.Mui-selected": {
                    bgcolor: "background.alt"
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: "background.alt"
                  }
                }}
              >
                <Box
                  component={"img"}
                  width={20}
                  src={item.icon}
                  mr={2}
                />
                <ListItemText primary={item.text} sx={{ color: "text.primary" }}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Box>

      {/* Bottom menu */}
      <List sx={{mb: "64px"}}>

        <ListItem sx={{ padding: 0 }}>
          <ListItemButton
            sx={{
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "background.alt"
              }
            }}
          >
            <Box
              component={"img"}
              width={20}
              src={HelpIcon}
              mr={2}
            />
            <ListItemText primary="Help" />
          </ListItemButton>
        </ListItem>

        <ListItem sx={{ padding: 0 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "background.alt"
              }
            }}
          >
            <Box
              component={"img"}
              width={20}
              src={LogoutIcon}
              mr={2}
            />
            <ListItemText primary="Logout" />
          </ListItemButton> 
        </ListItem>
      </List>

    </Box>
  );

  return (
    <SwipeableDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': { 
          paddingInline: 2,
          width: drawerWidth, 
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.default,
        }
      }}
    >
      {drawerContent}
    </SwipeableDrawer>
  );
};

export default Sidebar;
