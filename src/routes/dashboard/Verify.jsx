import { useState } from "react";
import { Box, Typography, Checkbox, MenuItem, Select, Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { getNames } from "country-list";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import api from "../../services/axios";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../redux/userSlice";

const countries = getNames();

const Verify = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [step, setStep] = useState(
    user.verified == "true" ? 4 : 
    user.verified == "pending" ? 3:
    1
  );
  const [selectedCountry, setSelectedCountry] = useState(user.location);
  const [selectedDoc, setSelectedDoc] = useState("Identify Card");
  const [ idImage, setIdImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleNext = () => setStep((prev) => prev + 1);
  // const handleSubmit = () => setStep(3);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("idCard", idImage);
    // console.log(typeof frontImage)
    try {
      setLoading(true);
      const response = await api.put(`/user/update/${user._id}`, { verified: "pending", location: selectedCountry }); // adapt endpoint as needed
      const updatedUser = response.data;
      dispatch(updateUserDetails(updatedUser));
      await api.put(`/user/upload-idcard/${user._id}`, formData)
      setStep(3);
    } catch (error) {
      console.error("Verification submission failed:", error);
      // Optional: show error to user
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setIdImage(file); // ✅ store the file for upload
    setPreview(URL.createObjectURL(file)); // preview only
  }
};


  return (
    <Box sx={{ bgcolor: "black", color: "white", height: {xs: "80vh", sm: "85vh"}, px: 3, py: 4, borderRadius: "8px" }}>
      {step === 1 && (
        <Box display={"flex"} flexDirection={"column"}  justifyContent={"center"} height={"100%"}>

          <Typography variant="h5" fontWeight="bold" mb={4} color="secondary.main">Verify account</Typography>

          <Typography fontSize={14} mb={1}>Select Country of Residence</Typography>
          {/* <Box
            sx={{
              border: "1px solid #3CE8F2",
              borderRadius: 2,
              // px: 2,
              // py: 1.5,
              mb: 4,
              bgcolor: "#1a1a1a",
            }}
          > */}
            <Select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              displayEmpty
              fullWidth
              sx={{
                color: "white",
                mb: 4,
                borderColor: "#3ce8f2",
                "& .MuiSelect-icon": { color: "#3CE8F2" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 500,
                    maxWidth: "80%",
                    bgcolor: "white", // Dropdown menu background
                    color: "black", // Menu item text color
                  }
                }
              }}
            >
              <MenuItem value="" disabled>Select country</MenuItem>
              {countries.map((country, i) => (
                <MenuItem key={i} value={country}>{country}</MenuItem>
              ))}
            </Select>
          {/* </Box> */}

          <Typography fontSize={14} mb={1}>Select a valid Government-issued document</Typography>
          {["Identify Card", "Passport", "Driver’s License"].map((doc, i) => (
            <Box
              key={i}
              onClick={() => setSelectedDoc(doc)}
              sx={{
                border: "1px solid",
                borderColor: selectedDoc === doc ? "#3CE8F2" : "white",
                bgcolor: selectedDoc === doc ? "#3CE8F2" : "#1a1a1a",
                color: selectedDoc === doc ? "black" : "#777",
                borderRadius: 2,
                px: 1.5,
                py: 1,
                mb: 2,
                cursor: "pointer",
              }}
            >
              {doc}
            </Box>
          ))}

          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
            {/* <Checkbox size="small" checked sx={{ p: 0.5 }} /> */}
            <Typography fontSize={12} color="gray">
              This information is used for identity verification only and is not stored to protect your privacy.
            </Typography>
          </Box>

          <Box
            onClick={handleNext}
            sx={{
              bgcolor: "#3CE8F2",
              color: "black",
              textAlign: "center",
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Continue
          </Box>
        </Box>
      )}

      {step === 2 && (
        <Box display={"flex"} flexDirection={"column"}  justifyContent={"center"} height={"100%"}>
        
          <Typography variant="h5" fontWeight="bold" mb={3} color="secondary.main">Verify account</Typography>
          <Typography fontSize={14} mb={2}>Upload Image of {selectedDoc}</Typography>

          <Box
            sx={{
              bgcolor: "#1a1a1a",
              borderRadius: 2,
              py: 4,
              mb: 2,
              textAlign: "center",
              color: "#777",
              cursor: "pointer",
              position: "relative",
              maxHeight: {xs: "200px", sm: "250px"},
              width: "100%"
            }}
            onClick={() => document.getElementById("front-upload").click()}
          >
            {preview ? (
              <img
                src={preview}
                alt="front-id"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
                // style={{ width: "100%", borderRadius: 8 }}
              />
            ) : (
              <>
                <CameraAltIcon sx={{ fontSize: 40, color: "#3CE8F2" }} /><br />
                Upload front page
              </>
            )}
            <input
              type="file"
              id="front-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Box>

          {[
            "Government-issued",
            "Original full-size, unedited document",
            "Place documents against a single-coloured background",
            "Readable, well-lit, coloured images",
          ].map((text, idx) => (
            <Typography key={idx} fontSize={13} color="lightgreen" mb={0.5}>✅ {text}</Typography>
          ))}

          {[
            "No black and white images",
            "No edited or expired documents",
          ].map((text, idx) => (
            <Typography key={idx} fontSize={13} color="red" mb={0.5}>❌ {text}</Typography>
          ))}

          <Box sx={{ display: "flex", alignItems: "flex-start", mt: 3, mb: 2 }}>
            {/* <Checkbox size="small" checked sx={{ p: 0.5 }} /> */}
            <Typography fontSize={12} color="gray">
              This information is used for identity verification only, and is not stored to protect your privacy.
            </Typography>
          </Box>

          <Box
            onClick={loading ? null : handleSubmit}
            sx={{
              bgcolor: "#3CE8F2",
              color: "black",
              textAlign: "center",
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <Box
                component="span"
                sx={{
                  width: 20,
                  height: 20,
                  border: "2px solid #000",
                  borderTop: "2px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              />
            ) : (
              "Submit"
            )}
          </Box>

        </Box>
      )}

      {step === 3 && (
        <Box textAlign="center" display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} height={"100%"}>
          {/* <Typography variant="h6" fontWeight="bold" mb={3}>Verify account</Typography> */}

          <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "lightgreen", mb: 2 }} />

          <Typography variant="h5" fontWeight="bold">Submitted for Verification</Typography>
          <Typography color="#aaa" fontSize={14} mt={1} mb={4}>
            Your identification has been submitted for manual review. You will be notified once approved.
          </Typography>

          <Button
            // onClick={handleGoToVerifiedPage}
            onClick={() => navigate("/dashboard")}
            fullWidth
            sx={{
              bgcolor: "#3CE8F2",
              color: "black",
              textAlign: "center",
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Back to Dashboard
          </Button>
        </Box>
      )}

      {step === 4 && (
        <Box textAlign="center" display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} height={"100%"}>
          <Typography variant="h6" fontWeight="bold" mb={3}>Account Verified</Typography>

          <VerifiedUserIcon sx={{ fontSize: 80, color: "#3CE8F2", mb: 2 }} />

          <Typography variant="h5" fontWeight="bold">Your Account is Verified</Typography>
          <Typography color="#aaa" fontSize={14} mt={1} mb={4}>
            You now have full access to all features on Trioxtrade.
          </Typography>

          <Button
            onClick={() => navigate("/dashboard")}
            fullWidth
            sx={{
              bgcolor: "#3CE8F2",
              color: "black",
              textAlign: "center",
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Back to Dashboard
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Verify;
