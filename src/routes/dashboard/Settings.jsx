import { Alert, Box, Snackbar, Typography, TextField, IconButton, Button, InputAdornment, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Edit, CheckCircle, Lock  } from "@mui/icons-material";
import api from "../../services/axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../redux/userSlice";
import { getNames } from "country-list";
import 'react-phone-input-2/lib/material.css';
import PhoneInput from 'react-phone-input-2';

const countries = getNames();

const Settings = () => {

  const user = useSelector((state) => state.user.user);
  const [userData, setUserData] = useState(user);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    if (user[name] !== value) setHasChanges(true);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await api.put(`/user/update/${user._id}`, userData)
      const updatedUser = response.data;
      dispatch(updateUserDetails(updatedUser));
      if (updatedUser) {
        // show save change was successful
        setShowSuccess(true);
        setHasChanges(false);
        setTimeout(() => {
          setShowSuccess(false);
        }, 1000);
      }
      
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography color="secondary.main" fontSize={"32px"} fontWeight={"bold"}>Profile Info</Typography>
      <Typography fontWeight={"bold"} variant="caption">You have full control to manage your own account setting.</Typography>
      <Box mt={3}>
        <Typography fontWeight={"bold"} borderBottom={"1px solid grey"} mb={2} pb={.5}>Profile</Typography>
        <Typography fontWeight={"bold"}>Personal Information</Typography>
        <Typography fontWeight={"bold"} variant="caption">Basic info, like your name and address, that you use on our platform.</Typography>
        <Box 
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          p={2}
          pt={4}
          width={"100%"} 
          // height={"50vh"} 
          bgcolor={"rgb(255, 255, 255, 0.3)"} 
          borderRadius={"5px"} mt={2}
        >
          <TextField
            label="First Name"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Lock sx={{ color: "white" }} />
                </InputAdornment>
              )
            }}
          />
          {/* <TextField
            label="Phone Number"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
            fullWidth
          /> */}
          <Box>
            <style>{`
              .react-tel-input .special-label {
                background: transparent;
                font-size: 10px;
                left: 8px
              }
              .react-tel-input .form-control {
                border-radius: 8px;
                border: 1px solid grey
              }
              .react-tel-input .form-control:focus { 
                box-shadow: 0 0 0 1px #fff
              }
              .react-tel-input .form-control:hover {
                border-color: white;
              }
              .react-tel-input .flag-dropdown {
                border-radius: 8px 0 0 8px
              }
              .react-tel-input .selected-flag .arrow {
                border-top: 4px solid #fff
              }
              }
            `}</style>
            <PhoneInput
              country={'us'} 
              value={userData.phoneNumber}
              onChange={(phone) => {
                setUserData((prev) => ({ ...prev, phoneNumber: phone }));
                if (user.phoneNumber !== phone) setHasChanges(true);
              }}
              inputStyle={{
                width: '100%',
                backgroundColor: 'rgb(255,255,255,0)',
                // border: "1px solid grey",
                color: '#fff',
                height: "40px",
                fontSize: "12px"
              }}
              buttonStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: "white"
                // border: 'none'
              }}
              dropdownStyle={{
                color: "black"
              }}
              containerStyle={{ width: '100%' }}
            />
          </Box>

          <TextField
            label="USDT Address (Bsc bep-20)"
            name="walletAddress"
            value={userData.walletAddress}
            onChange={handleChange}
            fullWidth
          />
          {/* <TextField
            label="Location"
            name="location"
            value={userData.location}
            onChange={handleChange}
            fullWidth
          /> */}
          <FormControl fullWidth>
            <InputLabel id="location-label">Location</InputLabel>
            <Select
              labelId="location-label"
              name="location"
              value={userData.location}
              onChange={handleChange}
              label="Location"
              sx={{
                // fontSize: "10px",
                ".MuiSvgIcon-root": { color: "#fff" }, // Dropdown icon color
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 300,
                    maxWidth: "80%",
                    bgcolor: "white", // Dropdown menu background
                    color: "black", // Menu item text color
                  }
                }
              }}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country} sx={{fontSize: ".75rem", minHeight: "38px"}}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleSubmit} sx={{ borderRadius: "8px"}} disabled={!hasChanges || isLoading}>
            { isLoading ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : (
              "Save Changes"
            )}
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Saved Changes!
        </Alert>
      </Snackbar>
    </Box>
  )
};

export default Settings;
