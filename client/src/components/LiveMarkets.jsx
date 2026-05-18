import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Button, Chip, Grid, LinearProgress, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { BarChart3, RefreshCw, TrendingDown, TrendingUp } from 'lucide-react';
import { fetchCandles, fetchTicker24h, marketSymbols } from '../api/marketData.js';
import { MarketChart } from './MarketChart.jsx';

const intervals = ['15m', '1h', '4h', '1d'];

function formatPrice(value) {
  const number = Number(value);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: number > 100 ? 2 : 5
  }).format(number);
}

export function LiveMarkets() {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
  const [interval, setInterval] = useState('1h');
  const [tickers, setTickers] = useState([]);
  const [candles, setCandles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const selectedMeta = useMemo(
    () => marketSymbols.find((item) => item.symbol === selectedSymbol) || marketSymbols[0],
    [selectedSymbol]
  );

  const loadMarketData = async () => {
    setLoading(true);
    setError('');
    try {
      const [tickerData, candleData] = await Promise.all([
        fetchTicker24h(),
        fetchCandles(selectedSymbol, interval)
      ]);
      setTickers(tickerData);
      setCandles(candleData);
    } catch (err) {
      setError(err.message || 'Could not load market data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarketData();
  }, [selectedSymbol, interval]);

  useEffect(() => {
    const timer = window.setInterval(loadMarketData, 60000);
    return () => window.clearInterval(timer);
  }, [selectedSymbol, interval]);

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, border: '1px solid #d0d5dd', borderRadius: 4, bgcolor: '#ffffff' }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ md: 'center' }}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <BarChart3 color="#ff444f" />
              <Typography variant="h5" sx={{ color: '#101828', fontWeight: 900 }}>
                Live market data
              </Typography>
            </Stack>
            <Typography sx={{ color: '#344054', mt: 0.5 }}>
              Real Binance public API prices and candlestick data. Refreshes every 60 seconds.
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <TextField select label="Market" value={selectedSymbol} onChange={(event) => setSelectedSymbol(event.target.value)} size="small" sx={{ minWidth: 160 }}>
              {marketSymbols.map((item) => (
                <MenuItem key={item.symbol} value={item.symbol}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select label="Interval" value={interval} onChange={(event) => setInterval(event.target.value)} size="small" sx={{ minWidth: 120 }}>
              {intervals.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="outlined" startIcon={<RefreshCw size={16} />} onClick={loadMarketData}>
              Refresh
            </Button>
          </Stack>
        </Stack>

        {error ? <Alert severity="error">{error}</Alert> : null}
        {loading && !candles.length ? <LinearProgress /> : null}

        <Grid container spacing={2}>
          {tickers.slice(0, 6).map((ticker) => {
            const meta = marketSymbols.find((item) => item.symbol === ticker.symbol);
            const change = Number(ticker.priceChangePercent);
            const positive = change >= 0;
            return (
              <Grid item xs={12} sm={6} md={4} key={ticker.symbol}>
                <Box
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedSymbol(ticker.symbol)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedSymbol(ticker.symbol);
                    }
                  }}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: selectedSymbol === ticker.symbol ? '2px solid #ff444f' : '1px solid #d0d5dd',
                    bgcolor: selectedSymbol === ticker.symbol ? '#fff1f2' : '#f8fafc',
                    cursor: 'pointer'
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography sx={{ color: '#101828', fontWeight: 900 }}>{meta?.label || ticker.symbol}</Typography>
                      <Typography variant="body2" sx={{ color: '#344054' }}>{meta?.name}</Typography>
                    </Box>
                    <Chip
                      icon={positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      label={`${change.toFixed(2)}%`}
                      sx={{
                        bgcolor: positive ? '#dcfce7' : '#ffe4e6',
                        color: positive ? '#14532d' : '#881337',
                        border: positive ? '1px solid #86efac' : '1px solid #fda4af'
                      }}
                    />
                  </Stack>
                  <Typography variant="h6" sx={{ color: '#101828', fontWeight: 900, mt: 1 }}>
                    {formatPrice(ticker.lastPrice)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#475467' }}>
                    24h high {formatPrice(ticker.highPrice)} · low {formatPrice(ticker.lowPrice)}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ p: { xs: 1, md: 2 }, borderRadius: 3, border: '1px solid #d0d5dd', bgcolor: '#ffffff' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Box>
              <Typography sx={{ color: '#101828', fontWeight: 900 }}>
                {selectedMeta.label} candlestick chart
              </Typography>
              <Typography variant="body2" sx={{ color: '#344054' }}>
                {interval} candles
              </Typography>
            </Box>
            {loading ? <Chip label="Updating" sx={{ bgcolor: '#fef3c7', color: '#78350f' }} /> : <Chip label="Live API" sx={{ bgcolor: '#dcfce7', color: '#14532d' }} />}
          </Stack>
          {candles.length ? <MarketChart candles={candles} /> : null}
        </Box>
      </Stack>
    </Paper>
  );
}

