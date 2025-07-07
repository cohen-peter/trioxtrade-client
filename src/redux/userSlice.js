import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  transactions: [],
  coinPrices: {}
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload.transactions;
    },
    addTransaction: (state, action) => {
      state.transactions.unshift(action.payload);
    },
    setCoinPrices: (state, action) => {
      state.coinPrices = action.payload;
    },
    updateUserDetails: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  }
})

export const { setLogin, setLogout, setTransactions, addTransaction, setCoinPrices, updateUserDetails } = userSlice.actions;
export default userSlice.reducer;