import { useState } from 'react';
import { Outlet } from 'react-router';
import {
  Avatar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  CircularProgress
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import api from '../services/axios';
import { updateUserDetails } from '../redux/userSlice';

// sets the width of the drawer on mobile
const drawerWidth = 240; 

const DashboardLayout = () => {

  const theme = useTheme();
  // sets whether the drawer is opened or closed
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // sets the breakpoint for mobile screens
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  // function to toggle the sidebar on mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      setIsUploading(true);
      const response = await api.put(`/user/update/${user._id}`, formData)
      dispatch(updateUserDetails(response.data));
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: "column", 
        bgcolor: "rgba(255, 255, 255, 0.2)", 
        minHeight: "100vh", 
      }}
    >
      <Box
        sx={{
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
          {/* displays sidebar toggle button on mobile */}
          {!isDesktop && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* user name and profile picture widget */}
          <Box 
            display={"flex"}
            alignItems={"center"}
            bgcolor={"background.alt"}
            gap={1}
            paddingInline={1}
            paddingBlock={.5}
            borderRadius={8}
            marginLeft={"auto"}
          >
            <input
              id='upload-avatar'
              type='file'
              accept='image/*'
              style={{ display: "none" }}
              onChange={handleProfilePictureChange}
            />
            <label htmlFor='upload-avatar' style={{ cursor: "pointer", position: "relative" }}>
              <Avatar 
                alt={`${user.firstName} ${user.lastName}`}
                src={user?.profilePicture}
                sx={{
                  width: "32px",
                  height: "32px"
                }}
              />
              {isUploading && (
                <Box
                  position={"absolute"}
                  top={0}
                  left={0}
                  width={"100%"}
                  height={"100%"}
                  bgcolor={"rgb(0,0,0,0.4)"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"50%"}
                >
                  <CircularProgress size={24} sx={{ color: "white"  }} />
                </Box>
              )}
            </label>

            <Typography fontWeight={"bold"} fontSize={"14px"}>{`${user.firstName} ${user.lastName}`}</Typography>
          </Box>

        </Toolbar>
      </Box>

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={!isDesktop}
      />

      {/* Outlet for the dashboard routes */}
      <Box
        component="main"
        sx={{
          ml: { md: `${drawerWidth}px` },
          padding: "20px"
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
