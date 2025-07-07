import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  Button,
  FormControl,
  Stack,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Divider,
  Tooltip,
  IconButton
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ContentCopy } from "@mui/icons-material";
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../services/axios';
import { addTransaction } from '../../redux/userSlice';
import usdtAddress from "../../assets/usdtQr.png";
import ethAddress from "../../assets/ethereumQr.png";
import btcAddress from "../../assets/bitcoinQr.png";
import solAddress from "../../assets/solQr.png";
import successIcon from "../../assets/successfulIcon.png";

const Deposit = () => {

  const [page, setPage] = useState(0);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USDT");
  const [copyTooltip, setCopyTooltip] = useState("Copy");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const dispatch = useDispatch();
  const coinPrices = useSelector((state) => state.user.coinPrices);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const currencies = [
    { value: "USDT", label: "USDT (erc-20)", price: 1, qrCode: usdtAddress, address: "0x034CbCE34A117cd7269215Cac19996AbF4C64889" },
    { value: "BTC", label: "Bitcoin", price: coinPrices["BINANCE:BTCUSDT"], qrCode: btcAddress, address: "bc1q8jew6hky4vjztz3spkuepkndwepreelr9jfezd" },
    { value: "ETH", label: "Ethereum", price: coinPrices["BINANCE:ETHUSDT"], qrCode: ethAddress, address: "0x034CbCE34A117cd7269215Cac19996AbF4C64889" },
    { value: "SOL", label: "Solana", price: coinPrices["BINANCE:SOLUSDT"], qrCode: solAddress, address: "Evnmjd1Ycz5Z81fz2aEU9W2JbALwU9hF3EVYZWJCwXrv" }
  ];

  const selectedCurrency = currencies.find((cur) => cur.value === currency);
  const transactionId = `DEP-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;


  const getCryptoEquivalent = () => {
    // const selectedCurrency = currencies.find((cur) => cur.value === currency);
    if (!selectedCurrency || isNaN(amount) || amount <= 0) return "...";
    const decimals = currency === "USDT" ? 2 : 5
    const value = Number(amount) / selectedCurrency.price;
    return `${value.toFixed(decimals)} ${currency}`;
  };

  const handleNext = () => {
    if (page === 1 && (Number(amount) <= 0 || isNaN(Number(amount)))) {
      alert("Please enter a valid amount.");
      return;
    }
    setPage(page + 1);
  };

  const confirmTransaction = async () => {
    try {
      const payload = {
        transactionId,
        userId: user._id,
        amount: Number(amount),
        type: "deposit",
      };

      const response = await api.post("/transactions/add", payload);

      dispatch(addTransaction(response.data));
      setPage(3);
    } catch (err) {
      alert("Error creating deposit transaction");
      console.error(err);
    }
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedCurrency.address);
    setCopyTooltip("Copied!");

    setTimeout(() => {
      setCopyTooltip("Copy");
    }, 2000);
  };

  const handleFinalClick = () => {
    setOpenSuccessModal(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 5000);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        // border: "1px solid #3CE8F2",
        borderRadius: "8px",
        // color: '#fff',
        // minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        px: 2,
        minHeight: "85vh"
        // height: 'calc(100vh - 120px)'
      }}
    >
      { page === 0 && (
        <>
          {/* Heading */}
          <Box textAlign="center">
            <Typography variant="h4" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
              Deposit Funds
            </Typography>
            <Typography variant="body2" color="#929EAE" sx={{ mt: 1 }}>
              Secure and safely deposit money into your account.
            </Typography>
          </Box>

          <Box 
            display={'flex'} 
            justifyContent={"space-between"}
            border={'1px solid'} 
            borderColor={"secondary.main"} 
            bgcolor={"#2B2B2B"}
            borderRadius={"5px"}
            px={2}
            py={1.5}
            width={"80%"}
          >
            <Box display={'flex'} gap={2}>
              <CheckCircleOutlineIcon sx={{ color: '#00f0ff' }} />
              <Typography fontWeight="bold">Crypto Wallet</Typography>
            </Box>
            <AccountBalanceWalletIcon sx={{ color: '#00f0ff' }} />
          </Box>

          {/* Button */}
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              backgroundColor: '#095CE0',
              color: "#fff",
              textTransform: 'none',
              px: 3,
              py: 1.2,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
              // '&:hover': {
              //   backgroundColor: '#0050cc',
              // },
            }}
          >
            Deposit Now
          </Button>
        
        </>
      )}

      { page === 1 && (
        <>
          <Box textAlign={"center"}>
            <Typography variant="h4" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>Deposit Funds</Typography>
            <Typography fontWeight={"bold"} fontSize={".9rem"}>via crypto wallet</Typography>
            <Typography variant="body2" color="#929EAE" fontSize={".7rem"} sx={{ mt: 1 }}>Secure and safely deposit money into your account.</Typography>
          </Box>
          <Box display={'flex'} flexDirection={"column"} width={"85%"} gap={2}>
            <TextField
              label="Amount"
              // name="amount"
              type='number'
              value={amount}
              onChange={handleAmountChange}
              fullWidth
              sx={{
                bgcolor: "#2B2B2B",
                "& .MuiOutlinedInput-root": {borderRadius: "8px"},
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3CE8F2",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2EC4CC", // Hover state (darker teal)
                },
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="currency-label">Currency</InputLabel>
              <Select
                labelId="currency-label"
                // name="location"
                value={currency}
                onChange={handleCurrencyChange}
                label="Currency"
                sx={{
                  // fontSize: "10px",
                  bgcolor: "#2B2B2B",
                  ".MuiSvgIcon-root": { color: "#fff" }, // Dropdown icon color
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3CE8F2",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2EC4CC", // Hover state (darker teal)
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3CE8F2",
                  }
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      maxWidth: "80%",
                      mt: 1,
                      bgcolor: "#2B2B2B", // Dropdown menu background
                      color: "white", // Menu item text color
                    }
                  }
                }}
              >
                {currencies.map((cur) => (
                  <MenuItem key={cur.value} value={cur.value} sx={{fontSize: ".75rem", minHeight: "38px"}}>
                    {cur.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box display={'flex'} gap={3}>
            <Button 
              variant='contained' 
              onClick={handlePrev}
              sx={{
                width: "45%",
                backgroundColor: '#2B2B2B',
                color: "#fff",
                textTransform: 'none',
                px: 3,
                py: 1.2,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              Back
            </Button>
            <Button 
              onClick={handleNext}
              variant='contained' 
              sx={{
                width: "45%",
                backgroundColor: '#095CE0',
                color: "#fff",
                textTransform: 'none',
                px: 3,
                py: 1.2,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 'bold',  
              }}
            >
              Continue
            </Button>
          </Box>
        </>
      )}

      { page === 2 && (
        <>
        <Box textAlign={"center"}>
          <Typography variant="h5" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>Confirm Your Deposit</Typography>
          <Typography fontWeight={"bold"} fontSize={".9rem"}>You are about to deposit ${Number(amount).toLocaleString()} into your account.</Typography>
          <Typography variant="body2" color="#929EAE" fontSize={".7rem"} sx={{ mt: 1 }}>Please review the information and confirm.</Typography>
        </Box>

        <Box width={"100%"} display={'flex'} flexDirection={"column"} gap={2}>
          <Box
            bgcolor="#2B2B2B"
            border={"2px solid"}
            borderColor={"secondary.main"}
            p={2}
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            width={"100%"}
            borderRadius={"8px"}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography color='secondary.main' fontWeight={"bold"}>Payment method</Typography>
              <Box display={"flex"} gap={1}>
                <AccountBalanceWalletIcon sx={{ color: "secondary.main", fontSize: "medium" }}/>
                <Typography color='secondary.main' fontWeight={"bold"} fontSize={".75rem"}>Crypto Wallet</Typography>
              </Box>
            </Box>
            <Divider sx={{ borderColor: "secondary.main", width: "100%", height: "2px" }}/>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography fontWeight={"bold"} fontSize={".9rem"}>You will send</Typography>
              <Typography fontWeight={"bold"} fontSize={".9rem"}>{getCryptoEquivalent()}</Typography>
            </Box>
            {/* <Box display={"flex"} justifyContent={"space-between"}>
              <Typography color='#8F8F8F' fontSize={".75rem"} fontWeight={"bold"}>Equivalent to</Typography>
              <Typography color='#8F8F8F' fontSize={".75rem"} fontWeight={"bold"}>{amount} BTC</Typography>
            </Box> */}
          </Box>

          {/* <Box display={"flex"} justifyContent={"space-between"} border={"2px solid"} borderColor={"secondary.main"} width={"100%"} bgcolor={"#2B2B2B"} borderRadius={"8px"} p={2}>
            <Typography>Amount to deposit</Typography>
            <Typography>{amount} USD</Typography>
          </Box> */}
        </Box>
        
        <Box display={'flex'} flexDirection={"column"} gap={1.5} width={"100%"}>
          <Button
            fullWidth
            variant='contained'
            onClick={confirmTransaction}
            sx={{
              // width: "45%",
              backgroundColor: '#095CE0',
              color: "#fff",
              px: 3,
              py: 1.2,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            Confirm & Pay
          </Button>
          <Button 
            fullWidth
            variant='contained' 
            onClick={handlePrev}
            sx={{
              // width: "45%",
              backgroundColor: '#2B2B2B',
              color: "#fff",
              textTransform: 'none',
              px: 3,
              py: 1.2,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            Back
          </Button>
          {/* <Button 
            onClick={handleNext}
            variant='contaiend' 
            sx={{
              // width: "45%",
              backgroundColor: '#095CE0',
              color: "#fff",
              textTransform: 'none',
              px: 3,
              py: 1.2,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 'bold',  
            }}
          >
            Continue
          </Button> */}
        </Box>
        </>
      )}

      { page === 3 && (
        <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={1.5}>
        <Box textAlign={"center"}>
          <Typography fontWeight={"bold"} fontSize={"1.5rem"}>Make Your Payment</Typography>
          <Typography color='#929EAE' fontSize={".8rem"}>Your order{" "} 
            <Typography component={"span"} color='#fff' fontSize={".8rem"}>
              {transactionId} 
            </Typography>{" "}
             has been placed successfully.
          </Typography>
          <Typography color='#929EAE' fontSize={".8rem"}>To complete, please send{" "}
            <Typography component={"span"} color='#fff' fontSize={".8rem"}>
              {getCryptoEquivalent()} 
            </Typography>{" "}
            to the address below.</Typography>
        </Box>

        <Box
          bgcolor={"#2B2B2B"}
          border={"1px solid"}
          borderColor={"secondary.main"}
          width={"100%"}
          borderRadius={"8px"}
          p={2}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography fontWeight={"bold"}>Payment</Typography>
            <Typography fontWeight={"bold"}>{getCryptoEquivalent()}</Typography>
          </Box>
          <Divider sx={{ borderColor: "secondary.main", height: "2px", mt: 1}}/>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={1} mt={1}>
            <Typography color='#686767'>Payment Address</Typography>
            <Box width={"100%"} textAlign={"center"}>
              <img src={selectedCurrency.qrCode} alt='wallet address QR code' width={"150px"} height={"150px"}/>
              <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Typography
                  // whiteSpace={"nowrap"}
                  overflow={"auto"}
                  onClick={handleCopy}
                  fontSize={".75rem"}
                  // textOverflow={"ellipsis"}
                >
                  {selectedCurrency.address}
                </Typography>
                <Tooltip title={copyTooltip} arrow>
                  <IconButton onClick={handleCopy} sx={{ color: "secondary.main" }}>
                    <ContentCopy fontSize='small'/>
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box textAlign={"center"}>
          <Typography color='#929EAE' fontSize={".6rem"}>Be aware that this order will be cancelled if you send the wrong amount</Typography>
          <Typography fontWeight={"bold"} fontSize={".75rem"}>Account will be credited once payment has been received.</Typography>
        </Box>

        <Box display={"flex"} flexDirection={"column"} gap={2} width={"100%"}>
          <Button
            fullWidth
            variant='contained'
            onClick={handleFinalClick}
            sx={{
              // width: "45%",
              backgroundColor: '#095CE0',
              color: "#fff",
              px: 3,
              py: 1.2,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            I've made the payment
          </Button>

          {/* <Button
            onClick={() => navigate("/dashboard")}
            fullWidth
            variant='contained'
            // onClick={handleNext}
            sx={{
              // width: "45%",
              backgroundColor: '#000000',
              color: "secondary.main",
              px: 3,
              py: 1.2,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            Back to Dashboard
          </Button> */}
        </Box>
        </Box>
      )}

      <Dialog 
        open={openSuccessModal} 
        PaperProps={{ sx: { backgroundColor: 'black', textAlign: 'center' } }} 
        BackdropProps={{ sx: {backgroundColor: "rgb(0, 0, 0, 0.9)"} }}
      >
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <Box component={"img"} src={successIcon} alt='Success Icon'  width={"150px"}/>
            {/* <VerifiedIcon sx={{ fontSize: 80, color: "#007bff" }} /> */}
            <Typography variant="h5" color="#3CE8F2" fontWeight="bold">Successful</Typography>
            <Typography color="#fff" fontSize="0.9rem">
              Your account will be credited once the payment is confirmed
            </Typography>
            <Typography color="#888" fontSize="0.75rem">
              Please contact support if there is an issue with your deposit.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Pagination dots */}
      {(page<3) && <Stack direction="row" gap={1}>
        {[0, 1, 2, 3].map((index) => (
          <Box
            key={index}
            onClick= {() => { if (index < 3) setPage(index); }}
            sx={{
              cursor: "pointer",
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: index === page ? '#00f0ff' : '#1a1a1a',
              border: '1px solid #00f0ff',
            }}
          />
        ))}
      </Stack>}
    </Box>
  );
}

export default Deposit;