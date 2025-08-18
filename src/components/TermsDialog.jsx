import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { useState } from "react";

const TermsDialog = ({ open, onClose, onAccept }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper" // allows scrolling inside
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "whitesmoke", // your custom bg color
          color: "black", // optional: text color
        },
      }}
    >
      <DialogTitle>Terms & Conditions</DialogTitle>
      <DialogContent dividers sx={{ maxHeight: "70vh" }}>
        <Typography variant="body2" gutterBottom>
          Welcome to <strong>Trioxtrade</strong>. These Terms and Conditions ("Terms") govern your use of our website,
          platform, and services. By creating an account, accessing, or using Trioxtrade, you agree to comply
          with and be bound by these Terms. Please read them carefully.
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>1. Eligibility</strong><br />
          • You must be at least 18 years old to use our platform.<br />
          • By registering, you confirm that the information you provide is accurate and complete.<br />
          • You are responsible for complying with any local laws or regulations regarding cryptocurrency trading or investments.<br />
          • We reserve the right to refuse service, suspend, or terminate accounts at our discretion.
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>2. Risk Disclosure</strong><br />
          • Cryptocurrency and digital asset investments involve significant risks, including market volatility,
            potential loss of capital, and regulatory uncertainty.<br />
          {/* • Trioxtrade does not provide financial, investment, or legal advice. All decisions you make are at your
            own risk.<br /> */}
          • You acknowledge that past performance is not indicative of future results.
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>3. Account Registration & Security</strong><br />
          • To access our services, you must create an account and complete our verification process (KYC/AML compliance).<br />
          • You are responsible for maintaining the confidentiality of your login credentials.<br />
          • Notify us immediately of any unauthorized use or suspected security breach.
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>4. Deposits & Withdrawals</strong><br />
          • Deposits and withdrawals may be subject to blockchain confirmation times and network fees.<br />
          • Trioxtrade reserves the right to place temporary holds on withdrawals for security, KYC/AML, or
            compliance purposes.<br />
          • We are not responsible for delays caused by third-party payment processors, blockchain congestion,
            or incorrect wallet addresses provided by you.
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>5. Investment Plans</strong><br />
          • By subscribing to any investment plan, you agree to the plan’s terms, profit rates, and withdrawal
            policies as stated on the platform.<br />
          • Trioxtrade reserves the right to modify, suspend, or discontinue investment plans at any time.
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>6. Compliance with Laws</strong><br />
          • You agree to comply with all applicable laws and regulations, including Anti-Money Laundering
            (AML) and Know Your Customer (KYC) requirements.<br />
          • Trioxtrade may require you to verify your identity before allowing certain transactions.<br />
          • Accounts engaged in suspicious, fraudulent, or illegal activity will be suspended or terminated
            without notice.
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>7. Fees</strong><br />
          • Trioxtrade may charge fees for certain transactions or services, which will be disclosed on the
            platform.<br />
          • You agree to pay all applicable fees, network costs, and taxes associated with your use of the
            platform.
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>8. Intellectual Property</strong><br />
          • All content, branding, logos, software, and designs on Trioxtrade are the property of Trioxtrade
            and may not be used without our prior written consent.<br />
          • You are granted a limited, non-exclusive, non-transferable license to use the platform for
            personal purposes only.
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>9. Limitation of Liability</strong><br />
          • Trioxtrade is not liable for any direct, indirect, incidental, or consequential damages arising from
            your use of the platform.<br />
          • We do not guarantee uninterrupted service, and we are not responsible for losses due to technical
            issues, hacks, or force majeure events.<br />
          • You agree that your use of the platform is at your own risk.
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>10. Termination</strong><br />
          • Trioxtrade reserves the right to suspend or terminate your account at any time, without notice, if
            you breach these Terms.<br />
          • You may close your account at any time, subject to the completion of pending transactions.
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>11. Changes to Terms</strong><br />
          • We may update these Terms from time to time. Any changes will be posted on the platform.<br />
          • Continued use of the platform after changes constitutes acceptance of the revised Terms.
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>12. Governing Law</strong><br />
          • These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in
            which Trioxtrade operates.<br />
          • Any disputes shall be resolved exclusively in the courts of that jurisdiction.
        </Typography>

        <Typography variant="body2" gutterBottom>
          <strong>13. Contact Us</strong><br />
          • For questions or concerns regarding these Terms, please contact our support team via the official
            communication channels on the platform.
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          By accepting or continuing to use Trioxtrade, you acknowledge that you have read, understood,
          and agree to these Terms and Conditions.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error" sx={{borderRadius: "8px"}}>Close</Button>
        {/* <Button onClick={onAccept} color="primary" variant="contained">Accept</Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default TermsDialog;
