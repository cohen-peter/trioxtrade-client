import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import logo from "../../assets/logo.png";
import theme from "../../theme";
import { useNavigate } from "react-router";

// sets width of the mobile menu drawer
const drawerWidth = 240; 

// sections of the landing page (nav links on click)
const navItems = [
  {
  label: "Home",
  onClick: () => scrollToSection("home")
  },
  {
  label: "About",
  onClick: () => scrollToSection("about")
  },
  {
  label: "Services",
  onClick: () => scrollToSection("services")
  },
  {
  label: "Plans",
  onClick: () => scrollToSection("plans")
  },
];

// function that takes an id and scrolls to the section that has that id
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Navbar = (props) => {

  // sets a breakpoint for mobile/desktop screens
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); 
  // checks whether the mobile menu is open
  const [mobileOpen, setMobileOpen] = useState(false); 
  
  const navigate = useNavigate();

  // toggles the mobile menu
  const toggleMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  // parameters for the mui drawer
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  // mui drawer component items
  const drawer = (
    <Box onClick={toggleMenu} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 3 }}>
        TRIOXTRADE
      </Typography>

      <Divider sx={{ borderColor: "text.primary" }}/>
      <List>
        {navItems.map(({ label, onClick }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton 
              onClick={onClick}
              sx={{ 
                textAlign: 'center',
                "&:hover": {
                  color: "secondary.main",
                  textDecoration: "underline",
                  textDecorationColor: "secondary.main"
                }
              }}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button onClick={() => navigate("/signup")}>Get Started</Button>

    </Box>
  );

  return (
    <>
      <AppBar component="nav" sx={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.7)' }}>
        <Toolbar sx={{ p: "1rem" }}>

          {/* Logo and Title */}
          <Box display="flex" gap={2} flexGrow={1} alignItems="center">
            <Box
              component="img"
              src={logo}
              alt="Company Logo"
              sx={{ width: 40, height: 40, objectFit: "contain" }}
            />
            <Box display="flex" flexDirection="column">
              <Typography variant="h6">TRIOXTRADE</Typography>
              <Typography color="secondary" variant="caption">
                INVESTMENT
              </Typography>
            </Box>
          </Box>

          {/* Desktop Menu */}
          {isDesktop && (
            <Box>
              {navItems.map(({ label, onClick }) => (
                <Button 
                  key={label} 
                  variant="text" 
                  onClick={onClick}
                  sx={{ 
                    color: "text.primary",
                    "&:hover": {
                      color: "secondary.main",
                      textDecoration: "underline",
                      textDecorationColor: "secondary.main"
                    }
                  }}
                >
                  {label}
                </Button>
              ))}
              <Button 
                size="small" 
                onClick={() => navigate("/signup")}
                sx={{ ml:"8px"}}
              >
                Get Started
              </Button>

            </Box>
          )}

          {/* Mobile Menu Icon */}
          {!isDesktop && (
            <IconButton 
              edge="end" 
              color="inherit" 
              onClick={toggleMenu} 
              aria-label="open navigation menu"
            >
              <Menu fontSize="large" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <nav>
        <Drawer
          container={container}
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={toggleMenu}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              bgcolor: "primary.main",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Navbar;
