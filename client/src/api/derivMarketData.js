const DERIV_WS_URL = 'wss://ws.derivws.com/websockets/v3?app_id=1089';

export const volatilityMarkets = [
  { symbol: 'R_10', label: 'Volatility 10 Index' },
  { symbol: 'R_25', label: 'Volatility 25 Index' },
  { symbol: 'R_50', label: 'Volatility 50 Index' },
  { symbol: 'R_75', label: 'Volatility 75 Index' },
  { symbol: 'R_100', label: 'Volatility 100 Index' },
  { symbol: '1HZ10V', label: 'Volatility 10 (1s) Index' },
  { symbol: '1HZ25V', label: 'Volatility 25 (1s) Index' },
  { symbol: '1HZ50V', label: 'Volatility 50 (1s) Index' },
  { symbol: '1HZ75V', label: 'Volatility 75 (1s) Index' },
  { symbol: '1HZ100V', label: 'Volatility 100 (1s) Index' }
];

export function openDerivSocket() {
  return new WebSocket(DERIV_WS_URL);
}

export function toDerivCandles(candles = []) {
  return candles
    .map((item) => ({
      time: Number(item.epoch),
      open: Number(item.open),
      high: Number(item.high),
      low: Number(item.low),
      close: Number(item.close)
    }))
    .filter((item) => item.time && Number.isFinite(item.close));
}

