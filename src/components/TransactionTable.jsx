import React from "react";
import { Avatar, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import CreditIcon from "../assets/creditIcon.png";
import DebitIcon from "../assets/debitIcon.png";


const TransactionTable = ({ transactions = [], type }) => {
  const filtered = (type
    ? transactions.filter(t => t.type === type)
    : transactions
  ).slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!filtered.length) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 2,
          border: "1px solid #3CE8F2",
          mt: 4,
          borderRadius: "8px",
          bgcolor: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <PlayArrow fontSize="small"/>
        <Typography color="white" fontSize={"12px"}>No transactions found!</Typography>
      </Box>
    );
  }

  return (
    <TableContainer sx={{ mt: 4, borderRadius: "5px", overflow: "hidden" }}>
      <Table size="small" sx={{ bgcolor: "#fff" }}>
        <TableHead sx={{ bgcolor: "#2B2B2B" }}>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Details</TableCell>
            <TableCell sx={{ color: "white" }}>Txn ID</TableCell>
            <TableCell sx={{ color: "white" }}>Amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody sx={{ color: "black" }}>
          {filtered.map((t) => (
            <TableRow key={t._id}>
              <TableCell sx={{ color: "black" }}>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Avatar 
                    src={
                      t.type === "withdrawal"
                      ? DebitIcon
                      : CreditIcon
                    } 
                    sx={{ width: "28px", height: "28px" }}
                  />
                  <Box>
                    <Typography fontSize={".75rem"} fontWeight={"bold"}>{t.type.charAt(0).toUpperCase() + t.type.slice(1)}</Typography>
                    <Box display={"flex"} gap={"2px"}>
                      <Typography fontSize={".5rem"} fontWeight={"bold"}>
                        {new Date(t.date).toLocaleDateString("en-US", {
                          year: "numeric", 
                          month: "short", 
                          day: "numeric"
                        })}
                      </Typography>
                      <Typography fontSize=".5rem" fontWeight="bold">•</Typography>
                      <Typography 
                        fontSize={".5rem"} 
                        fontWeight={"bold"}
                        color={
                          t.status === "completed" 
                            ? "green" 
                            : t.status === "pending" 
                            ? "orange" 
                            : "red" 
                        }
                      >
                        {t.status}
                      </Typography>
                    </Box>
                  </Box>
                  {/* {t.status} | {new Date(t.date).toLocaleDateString()} | {t.type} */}
                </Box>
              </TableCell>
              <TableCell sx={{ color: "black", fontSize: ".75rem", fontWeight: "bold" }}>{t.transactionId}</TableCell>
              <TableCell sx={{ color: "black", fontSize: ".75rem", fontWeight: "bold" }}>${t.amount.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


  );
};

export default TransactionTable;
