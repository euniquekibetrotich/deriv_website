import { api } from './client';

// GET TICKERS (backend proxy)
export async function fetchTicker24h() {
  const res = await api.get('/market/tickers');
  return res.data;
}

// GET CANDLES (backend proxy)
export async function fetchCandles(symbol, interval) {
  const res = await api.get(
    `/market/candles?symbol=${symbol}&interval=${interval}`
  );
  return res.data;
}

// symbols list (you can expand later)
export const marketSymbols = [
  { symbol: 'R_75', label: 'Volatility 75', name: 'Synthetic Index' },
  { symbol: 'R_100', label: 'Volatility 100', name: 'Synthetic Index' },
  { symbol: 'BTCUSD', label: 'Bitcoin', name: 'Crypto' }
];