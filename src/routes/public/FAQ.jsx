import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import LogoImage from "../../assets/logo.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router";
// import useMediaQuery from "@mui/material";
import Navbar from "../../components/landing/Navbar";
import footerLogo from "../../assets/footerLogo.png";

// Icons for questions
import InfoIcon from '@mui/icons-material/Info';
import SecurityIcon from "@mui/icons-material/Security";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PublicIcon from "@mui/icons-material/Public";
import LockResetIcon from "@mui/icons-material/LockReset";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GavelIcon from "@mui/icons-material/Gavel";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Email } from "@mui/icons-material";

// Icons for footer
import PhoneIcon from '@mui/icons-material/Phone';
import TelegramIcon from '@mui/icons-material/Telegram';

const faqData = [
  {
    question: "What is TRIOXTRADE?",
    answer:
      "TRIOXTRADE is a cryptocurrency investment platform that allows individuals to earn consistent returns by investing in expertly managed crypto portfolios...",
    icon: <InfoIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "Is TRIOXTRADE safe and secure?",
    answer:
      "Yes. We use industry-standard encryption, 2FA, cold wallets, and comply with KYC/AML regulations...",
    icon: <SecurityIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "How do I get started?",
    answer:
      "1. Register\n2. Complete KYC\n3. Deposit crypto\n4. Choose a plan\n5. Start earning.",
    icon: <HowToRegIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "What cryptocurrencies can I deposit?",
    answer:
      "Currently accepted: Bitcoin, Ethereum, Tether. Fiat may be supported in some regions soon.",
    icon: <CurrencyBitcoinIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "What is the minimum investment amount?",
    answer:
      "Minimum deposit depends on the plan. The Starter Plan begins at just $100 or equivalent.",
    icon: <MonetizationOnIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "How are profits generated?",
    answer:
      "Through algorithmic trading, DeFi staking, altcoin/NFT investments, and expert analysis.",
    icon: <TrendingUpIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "When do I receive my profits?",
    answer:
      "Profit payout is based on your plan’s schedule — daily, weekly, or monthly.",
    icon: <QueryBuilderIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "Can I withdraw my money at any time?",
    answer:
      "Yes for profits. Principal capital may be locked depending on your plan.",
    icon: <ExitToAppIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "How long does a withdrawal take?",
    answer:
      "Withdrawals take 24–48 hours depending on amount, network, and verification.",
    icon: <HourglassBottomIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "Are there any fees?",
    answer:
      "We charge minimal withdrawal/network fees and early exit fees if applicable.",
    icon: <ReceiptLongIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "Is TRIOXTRADE available worldwide?",
    answer:
      "Yes, globally available. Some features may be restricted by local regulations.",
    icon: <PublicIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "What if I forget my password or lose access?",
    answer:
      "Contact support with your registered email for recovery.",
    icon: <LockResetIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "Can I refer others to TRIOXTRADE?",
    answer:
      "Yes! Our Referral Program rewards you based on your referrals' investments.",
    icon: <GroupAddIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "How do I contact TRIOXTRADE support?",
    answer:
      "Email: support@trioxtrade.com\nLive Chat: in dashboard (coming soon)\nWhatsApp: +44 7931 377432",
    icon: <SupportAgentIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
  {
    question: "Is TRIOXTRADE licensed or regulated?",
    answer:
      "We comply with international KYC/AML policies and operate transparently, though crypto may be unregulated in some regions.",
    icon: <GavelIcon sx={{ color: "#3CE8F2", mr: 1 }} />,
  },
];

export default function FAQ() {

  const navigate = useNavigate();
  // const isDesktop = useMediaQuery(theme.breakpoints.up("md")); 

  return (
    <Box 
      sx={{ 
        // mx: -5,
        // pb: 5, 
        bgcolor: "white", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        // textAlign: "center",
        // width: "100%",
        // border: "1px solid red"
      }}
    >
      {/* Logo */}
      <Box 
        display={"flex"} 
        width={"100%"}
        bgcolor={"#095CE0"}
        gap={2} py={5} 
        mb={5}
        alignItems={"center"}
        justifyContent={"center"} 
        onClick={() => navigate("/")}
        sx={{
          cursor: "pointer"
        }}
      >
        <img src={LogoImage} alt="Trioxtrade Logo" width={40} />
        <Box>
          <Typography variant="h4" mb={0} lineHeight={.8}>TRIOXTRADE</Typography>
          <Typography variant="caption" color="secondary.main" mt={"-10px"}>INVESTMENT</Typography>
        </Box>
      </Box>

      <Typography
        variant="h5"
        align="center"
        fontWeight="bold"
        color="#095CE0"
        // gutterBottom
        mb={2.5}
      >
        Frequently Asked Questions
      </Typography>

      {faqData.map(({ question, answer, icon }, i) => (
        <Accordion 
          key={i} 
          sx={{ 
            mb: 2, 
            borderRadius: 1, 
            boxShadow: 2, 
            width: {xs: "90%", sm: "70%"},
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#3CE8F2" }} />}
            sx={{
              backgroundColor: "#095CE0",
              color: "white",
              "&:hover": { backgroundColor: "#0748b6" },
              px: 2,
            }}
          >
            <Box display="flex" alignItems="center">
              {icon}
              <Typography fontWeight={600}>{question}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#f5faff", px: 3, py: 2, }}>
            <Typography whiteSpace="pre-line" color="black" fontSize={"14px"}>
              {answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: "100%",
          bgcolor: "#095CE0",
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
              <WhatsAppIcon sx={{ mr: 1, color: "#3CE8F2" }} />
              <Typography fontSize={14}>+44 7931 377432</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <TelegramIcon sx={{ mr: 1, color: "#3CE8F2" }} />
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

    </Box>
  );
}
