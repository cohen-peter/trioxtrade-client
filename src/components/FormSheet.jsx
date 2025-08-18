import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Link,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { ErrorOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import TermsDialog from './TermsDialog';

// sets the schema of the react-hook-form based on type "signup/login"
const setSchema = (type) => {

  const base = {
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8).required("Enter a password"),
  };

  if (type === "signup") {
    return yup.object().shape({
      ...base,
      firstName: yup.string().required("First name is required").max(50).min(2, "Firstname must be at least 2 characters"),
      lastName: yup.string().required("Last name is required").max(50).min(2, "Lastname must be at least 2 characters"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm your password"),
    });
  }

  if (type === "signin") {
    return yup.object().shape(base);
  }
};

// Formsheet component
const FormSheet = ({ type = "signup", onSubmit, isLoading, errorMessage }) => {

  // state to hold and show the password/confirmation on the password visibility icon click
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // state to show and accept the terms and conditions 
  const [openTerms, setOpenTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const navigate = useNavigate();
  const schema = setSchema(type);
  
  // sets the defaultValues for the form based on the type
  const defaultValues = type === "signup"
    ? {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
    : {
      email: '',
      password: '',
    };

  // initializes the react form using the default values and yup resolver for validation
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  // function to handlesubmit using the onsubmit function prop sent from the parent component
  const handleFormSubmit = async (data) => {
    if (type === "signup" && !acceptedTerms) {
      alert("You must accept the Terms & Conditions before signing up.");
      return;
    }

    if (onSubmit) {
      const formData = {...data};
      const response = await onSubmit(formData);
      if (response) {
        reset();
      }
    };
  };

  return (   

    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate >
      <Grid container spacing={2}>
        {/* signup only */}
        {type === "signup" && (
        <>
        {/* firstname */}
        <Grid size={12}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                label="First Name"
                sx={{ fontSize: "16px" }}
                fullWidth
                {...field}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
        </Grid>

        {/* lastname */}
        <Grid size={12}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                label="Last Name"
                fullWidth
                {...field}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Grid>
        </>
        )}

        {/* email */}
        <Grid size={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="Email"
                type="email"
                fullWidth
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
          
        {/* password */}
        <Grid size={12}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                {...field}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff sx={{ fontSize: "1.3rem" }} /> : <Visibility sx={{ fontSize: "1.3rem" }}/>}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>

        {/* confrim password signup only */}
        {type === "signup" && (
          <Grid size={12}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                {...field}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff sx={{ fontSize: "1.3rem" }} /> : <Visibility sx={{ fontSize: "1.3rem" }}/>}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
        )}

        {/* component to show errorMessage if any errors on signin/signup */}
        {errorMessage && (
          <Grid size={12}>
            <Alert 
              severity='error' 
              icon={<ErrorOutline sx={{ fontSize: "16px", mt: "1px" }} />}
              sx={{
                alignItems: "center",
                maxWidth: "100%",
                height: "30px", 
                fontSize: "12px", 
                padding: "0 1em",
                ".MuiAlert-icon": {
                  padding: 0,
                  mr: .5
                }
              }}
            >
                {errorMessage}
            </Alert>
          </Grid>
        )}

        {(type == "signin") && <Typography
          component="a"
          href="/forgot-password"
          sx={{
            color: "white",
            fontSize: "12px",
            textDecoration: "none",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline", color: "secondary.main"}
          }}
        >
          Forgot Password?
        </Typography>}

        {type === "signup" && (
          <Box display="flex" alignItems="center" gap={1}>
            <Checkbox
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              sx={{
                p: 0,
                color: "#ffffff", // unchecked color
                "&.Mui-checked": {
                  color: "#3ce8f2", // checked color
                },
              }}
            />
            <Typography variant="body2">
              I accept the{" "}
              <Link
                color="secondary.main"
                onClick={(e) => {
                  e.preventDefault(); // prevent form submit
                  setOpenTerms(true);
                }}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Terms & Conditions
              </Link>
            </Typography>
          </Box>
        )}


        {/* Terms Popup */}
        <TermsDialog
          open={openTerms}
          onClose={() => setOpenTerms(false)}
          onAccept={() => {
            // setAcceptedTerms(true);
            setOpenTerms(false);
          }}
        />

        <Grid size={12}>
          {/* submit button */}
          <Button
            fullWidth
            size="large"
            type="submit"
            disabled={isLoading}
            sx={{
              py: .5,
              backgroundColor: "secondary.main",
              color: 'primary.main',
              borderRadius: "8px",
              position: "relative",
              "&:hover": {
                backgroundColor: "#1eaab1"
              }
            }}
          >
            {/* visual component to communicate activity to the user */}
            {isLoading ? (
              <CircularProgress size={24} color='inherit' /> 
            ) : (
              type === "signup" ? "Sign Up" : "Sign In"
            )}
          </Button>

          {/* switch between signup/login */}
          <Typography
            onClick={() => {
              if (type === "signup") {
                navigate("/login");
              } else {
                navigate("/signup");
              }
            }}
            sx={{
              textDecoration: "underline",
              fontSize: ".75rem",
              // textAlign: "center",
              mt: "1rem",
              "&:hover": {
                cursor: "pointer",
                color: "secondary.main",
              },
            }}
          >
            {type === "signup"
            ? "Already have an account ? Login"
            : "Don't have an account ? Signup"}
          </Typography>
        </Grid>
      </Grid>
    </form>
     
  );
};

export default FormSheet;
