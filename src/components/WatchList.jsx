import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Box, Typography, Divider, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { setCoinPrices } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const topAssets = [
  // Stocks (fetched via Finnhub)
  { type: 'stock', symbol: 'AAPL' },
  { type: 'stock', symbol: 'TSLA' },
  { type: 'stock', symbol: 'MSFT' },
  { type: 'stock', symbol: 'META' },
  { type: 'stock', symbol: 'NVDA' },
  { type: 'stock', symbol: 'AMZN' },

  // Crypto (manual name/logo + Finnhub price)
  {
    type: 'crypto',
    symbol: 'BINANCE:BTCUSDT',
    name: 'Bitcoin',
    logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  },
  {
    type: 'crypto',
    symbol: 'BINANCE:ETHUSDT',
    name: 'Ethereum',
    logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  },
  {
    type: 'crypto',
    symbol: 'BINANCE:BNBUSDT',
    name: 'BNB',
    logo: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png',
  },
  {
    type: 'crypto',
    symbol: 'BINANCE:SOLUSDT',
    name: 'Solana',
    logo: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
  },
];

const sortedAssets = topAssets.sort((a, b) => a.symbol.replace('BINANCE:', '').localeCompare(b.symbol.replace('BINANCE:', '')));

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);

  const dispatch = useDispatch();

  const fetchWatchlist = async () => {
    const token = import.meta.env.VITE_FINNHUB_API_KEY;

    try {
      const coinPrices = {};
      const results = await Promise.all(
        sortedAssets.map(async (asset) => {
          if (asset.type === 'stock') {
            const [profile, quote] = await Promise.all([
              axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${asset.symbol}&token=${token}`),
              axios.get(`https://finnhub.io/api/v1/quote?symbol=${asset.symbol}&token=${token}`),
            ]);

            return {
              symbol: asset.symbol,
              name: profile.data.name || asset.symbol,
              logo: profile.data.logo,
              price: quote.data.c,
              type: 'stock',
            };
          } else {
            const quote = await axios.get(
              `https://finnhub.io/api/v1/quote?symbol=${asset.symbol}&token=${token}`
            );

            coinPrices[asset.symbol] = quote.data.c;

            return {
              symbol: asset.symbol,
              name: asset.name,
              logo: asset.logo,
              price: quote.data.c,
              type: 'crypto',
            };
          }
        })
      );
      dispatch(setCoinPrices(coinPrices));
      setWatchlist(results);
    } catch (error) {
      console.error('Failed to fetch watchlist:', error);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return(
    <Box>
      <Typography fontWeight={"bold"}>Watchlist</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#3CE8F2', borderBottom: 'none', fontSize: "10px", padding: "0" }}>Ticker/Name</TableCell>
            <TableCell sx={{ color: '#3CE8F2', borderBottom: 'none', fontSize: "10px", padding: "0" }}>Type</TableCell>
            <TableCell sx={{ color: '#3CE8F2', borderBottom: 'none', fontSize: "10px", padding: "0" }}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {watchlist.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell sx={{ borderBottom: 'none' }}>
                <Box display="flex" alignItems="center">
                  <Avatar src={item.logo} alt={item.name} sx={{ width: 24, height: 24, mr: 1 }} />
                  <Box>
                    <Typography fontWeight="bold" fontSize={"8px"}>{item.symbol.replace('BINANCE:', '')}</Typography>
                    <Typography fontSize={"8px"} color="#94a3b8">{item.name}</Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell sx={{ color: '#94a3b8', borderBottom: 'none', fontSize: "8px" }}>
                {item.type === 'crypto' ? 'Crypto' : 'Stock'}
              </TableCell>
              <TableCell sx={{ fontSize: "8px", fontWeight: 'bold', borderBottom: 'none' }}>
                ${item.price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );

};

export default WatchList;
