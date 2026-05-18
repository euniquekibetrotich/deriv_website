const BINANCE_BASE_URL = 'https://api.binance.com/api/v3';

export const marketSymbols = [
  { symbol: 'BTCUSDT', label: 'BTC/USD', name: 'Bitcoin' },
  { symbol: 'ETHUSDT', label: 'ETH/USD', name: 'Ethereum' },
  { symbol: 'BNBUSDT', label: 'BNB/USD', name: 'BNB' },
  { symbol: 'SOLUSDT', label: 'SOL/USD', name: 'Solana' },
  { symbol: 'XRPUSDT', label: 'XRP/USD', name: 'XRP' },
  { symbol: 'ADAUSDT', label: 'ADA/USD', name: 'Cardano' }
];

export async function fetchTicker24h(symbols = marketSymbols.map((item) => item.symbol)) {
  const requests = symbols.map((symbol) =>
    fetch(`${BINANCE_BASE_URL}/ticker/24hr?symbol=${symbol}`).then((response) => {
      if (!response.ok) throw new Error(`Could not load ticker for ${symbol}`);
      return response.json();
    })
  );

  return Promise.all(requests);
}

export async function fetchCandles(symbol, interval = '1h', limit = 120) {
  const response = await fetch(`${BINANCE_BASE_URL}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
  if (!response.ok) throw new Error(`Could not load candles for ${symbol}`);
  const data = await response.json();

  return data.map((item) => ({
    time: Math.floor(item[0] / 1000),
    open: Number(item[1]),
    high: Number(item[2]),
    low: Number(item[3]),
    close: Number(item[4])
  }));
}

