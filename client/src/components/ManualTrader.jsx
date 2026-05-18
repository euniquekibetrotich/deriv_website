import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Activity, ArrowDown, ArrowUp, Clock, Play, RefreshCw, Wallet, TrendingUp, BarChart2, Settings, Zap } from 'lucide-react';
import { MarketChart } from './MarketChart.jsx';
import { openDerivSocket, toDerivCandles, volatilityMarkets } from '../api/derivMarketData.js';

const granularities = [
  { label: '1 minute', value: 60 },
  { label: '5 minutes', value: 300 },
  { label: '15 minutes', value: 900 },
  { label: '1 hour', value: 3600 }
];

function formatQuote(value) {
  if (!value) return '--';
  return Number(value).toLocaleString('en-US', { maximumFractionDigits: 5 });
}

export function ManualTrader() {
  const socketRef = useRef(null);
  const [symbol, setSymbol] = useState('R_75');
  const [granularity, setGranularity] = useState(60);
  const [candles, setCandles] = useState([]);
  const [spot, setSpot] = useState(null);
  const [status, setStatus] = useState('Connecting');
  const [error, setError] = useState('');
  const [stake, setStake] = useState('10');
  const [duration, setDuration] = useState('5');
  const [lastAction, setLastAction] = useState('');
  const [contractType, setContractType] = useState('rise');

  const selectedMarket = useMemo(
    () => volatilityMarkets.find((item) => item.symbol === symbol) || volatilityMarkets[0],
    [symbol]
  );

  const connect = () => {
    setError('');
    setStatus('Connecting');
    setCandles([]);
    setSpot(null);

    if (socketRef.current) {
      socketRef.current.close();
    }

    const socket = openDerivSocket();
    socketRef.current = socket;

    socket.onopen = () => {
      setStatus('Live');
      socket.send(
        JSON.stringify({
          ticks_history: symbol,
          adjust_start_time: 1,
          count: 160,
          end: 'latest',
          start: 1,
          style: 'candles',
          granularity
        })
      );
      socket.send(JSON.stringify({ ticks: symbol, subscribe: 1 }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.error) {
        setError(data.error.message || 'Deriv market data error');
        return;
      }

      if (data.msg_type === 'candles') {
        setCandles(toDerivCandles(data.candles));
      }

      if (data.msg_type === 'tick') {
        const quote = Number(data.tick.quote);
        setSpot(quote);
        setCandles((current) => {
          if (!current.length) return current;
          const next = [...current];
          const last = { ...next[next.length - 1] };
          last.close = quote;
          last.high = Math.max(last.high, quote);
          last.low = Math.min(last.low, quote);
          next[next.length - 1] = last;
          return next;
        });
      }
    };

    socket.onerror = () => {
      setStatus('Disconnected');
      setError('Could not connect to Deriv WebSocket market data.');
    };

    socket.onclose = () => {
      setStatus('Disconnected');
    };
  };

  useEffect(() => {
    connect();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [symbol, granularity]);

  const simulateManualTrade = (direction) => {
    setLastAction(`${direction} demo order prepared for ${selectedMarket.label} at ${formatQuote(spot)}`);
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        overflow: 'hidden', 
        borderRadius: 4, 
        border: '1px solid rgba(255,255,255,0.12)', 
        bgcolor: '#0e0e0e',
        color: '#ffffff'
      }}
    >
      {/* Header */}
      <Box sx={{ px: { xs: 2, md: 3 }, py: 2, bgcolor: '#151717', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }} justifyContent="space-between">
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: '#ff444f', display: 'grid', placeItems: 'center' }}>
                <Activity size={18} color="#ffffff" />
              </Box>
              <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 900 }}>
                D.Trader
              </Typography>
              <Chip 
                label={status} 
                size="small"
                sx={{ 
                  bgcolor: status === 'Live' ? '#16a34a' : '#f59e0b', 
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.7rem'
                }} 
              />
            </Stack>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.5, fontSize: '0.875rem' }}>
              Real-time Deriv WebSocket data for Volatility Index markets
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            startIcon={<RefreshCw size={16} />} 
            onClick={connect} 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.08)', 
              color: '#ffffff',
              borderColor: 'rgba(255,255,255,0.2)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.14)', borderColor: 'rgba(255,255,255,0.3)' }
            }}
          >
            Reconnect
          </Button>
        </Stack>
      </Box>

      <Grid container>
        {/* Left Panel - Trade Setup */}
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2.5, height: '100%', bgcolor: '#0b1220', borderRight: { md: '1px solid rgba(255,255,255,0.08)' } }}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Settings size={16} color="#4ade80" />
                <Typography sx={{ color: '#ffffff', fontWeight: 900, fontSize: '0.85rem' }}>
                  TRADE SETUP
                </Typography>
              </Stack>
              
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, display: 'block', mb: 0.5 }}>
                  Market
                </Typography>
                <TextField 
                  select 
                  value={symbol} 
                  onChange={(event) => setSymbol(event.target.value)}
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.15)' },
                    '& .MuiInputBase-input': { color: '#ffffff', py: 1.2 },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
                    '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.6)' },
                    '& .MuiMenuItem-root': { color: '#101828', bgcolor: '#ffffff' },
                    bgcolor: 'rgba(255,255,255,0.04)',
                    borderRadius: 2
                  }}
                >
                  {volatilityMarkets.map((market) => (
                    <MenuItem key={market.symbol} value={market.symbol}>
                      {market.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, display: 'block', mb: 0.5 }}>
                  Timeframe
                </Typography>
                <TextField 
                  select 
                  value={granularity} 
                  onChange={(event) => setGranularity(Number(event.target.value))}
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.15)' },
                    '& .MuiInputBase-input': { color: '#ffffff', py: 1.2 },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
                    '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.6)' },
                    '& .MuiMenuItem-root': { color: '#101828', bgcolor: '#ffffff' },
                    bgcolor: 'rgba(255,255,255,0.04)',
                    borderRadius: 2
                  }}
                >
                  {granularities.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, display: 'block', mb: 0.5 }}>
                  Stake (USD)
                </Typography>
                <TextField 
                  type="number"
                  value={stake} 
                  onChange={(event) => setStake(event.target.value)}
                  InputProps={{ 
                    startAdornment: <Typography sx={{ mr: 1, color: '#4ade80', fontWeight: 800 }}>$</Typography>,
                    sx: { color: '#ffffff', py: 1.2 }
                  }}
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.15)' },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
                    bgcolor: 'rgba(255,255,255,0.04)',
                    borderRadius: 2
                  }}
                />
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, display: 'block', mb: 0.5 }}>
                  Duration (ticks)
                </Typography>
                <TextField 
                  type="number"
                  value={duration} 
                  onChange={(event) => setDuration(event.target.value)}
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.15)' },
                    '& .MuiInputBase-input': { color: '#ffffff', py: 1.2 },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
                    bgcolor: 'rgba(255,255,255,0.04)',
                    borderRadius: 2
                  }}
                />
              </Box>

              <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TrendingUp size={16} color="#4ade80" />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 800 }}>
                    Live Price
                  </Typography>
                </Stack>
                <Typography variant="h4" sx={{ color: '#4ade80', fontWeight: 900, mt: 0.5 }}>
                  {formatQuote(spot)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>

        {/* Center Panel - Chart */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2.5, bgcolor: '#0f172a' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography sx={{ color: '#ffffff', fontWeight: 900, fontSize: '1.1rem' }}>
                    {selectedMarket.label}
                  </Typography>
                  <Chip 
                    icon={<Clock size={12} />} 
                    label={granularities.find((item) => item.value === granularity)?.label} 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(56, 124, 252, 0.15)', 
                      color: '#377cfc',
                      fontWeight: 800,
                      border: '1px solid rgba(56, 124, 252, 0.25)'
                    }} 
                  />
                </Stack>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 0.3 }}>
                  Live candlestick chart from Deriv API
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#16a34a' }} />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Bullish</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff444f' }} />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Bearish</Typography>
                </Box>
              </Stack>
            </Stack>
            
            {error ? <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(239,68,68,0.1)', color: '#f87171' }}>{error}</Alert> : null}
            {!candles.length && !error ? <LinearProgress sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#377cfc' } }} /> : null}
            
            <Box sx={{ 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: 3, 
              overflow: 'hidden',
              bgcolor: '#0e0e0e'
            }}>
              {candles.length ? <MarketChart candles={candles} height={400} /> : <Box sx={{ height: 400 }} />}
            </Box>
          </Box>
        </Grid>

        {/* Right Panel - Order Controls */}
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2.5, height: '100%', bgcolor: '#0b1220', borderLeft: { md: '1px solid rgba(255,255,255,0.08)' } }}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Zap size={16} color="#f59e0b" />
                <Typography sx={{ color: '#ffffff', fontWeight: 900, fontSize: '0.85rem' }}>
                  ORDER PANEL
                </Typography>
              </Stack>

              <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 800, display: 'block', mb: 0.5 }}>
                  Contract Type
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip 
                    label="Rise" 
                    clickable
                    onClick={() => setContractType('rise')}
                    sx={{ 
                      bgcolor: contractType === 'rise' ? '#16a34a' : 'rgba(255,255,255,0.08)', 
                      color: contractType === 'rise' ? '#ffffff' : 'rgba(255,255,255,0.7)',
                      fontWeight: 800,
                      border: contractType === 'rise' ? 'none' : '1px solid rgba(255,255,255,0.15)'
                    }} 
                  />
                  <Chip 
                    label="Fall" 
                    clickable
                    onClick={() => setContractType('fall')}
                    sx={{ 
                      bgcolor: contractType === 'fall' ? '#ff444f' : 'rgba(255,255,255,0.08)', 
                      color: contractType === 'fall' ? '#ffffff' : 'rgba(255,255,255,0.7)',
                      fontWeight: 800,
                      border: contractType === 'fall' ? 'none' : '1px solid rgba(255,255,255,0.15)'
                    }} 
                  />
                </Stack>
              </Box>

              <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 800, display: 'block', mb: 0.5 }}>
                  Order Summary
                </Typography>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Stake</Typography>
                    <Typography sx={{ color: '#ffffff', fontWeight: 800 }}>${stake || 0}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Duration</Typography>
                    <Typography sx={{ color: '#ffffff', fontWeight: 800 }}>{duration || 0} ticks</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Market</Typography>
                    <Typography sx={{ color: '#ffffff', fontWeight: 800, fontSize: '0.75rem' }}>{selectedMarket.label}</Typography>
                  </Stack>
                </Stack>
              </Box>

              <Button 
                variant="contained" 
                size="large" 
                startIcon={<ArrowUp size={18} />} 
                onClick={() => simulateManualTrade('RISE')}
                disabled={!spot}
                sx={{ 
                  bgcolor: '#16a34a', 
                  color: '#ffffff',
                  py: 1.5,
                  fontWeight: 900,
                  borderRadius: 3,
                  boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)',
                  '&:hover': { bgcolor: '#15803d' },
                  '&:disabled': { opacity: 0.4 }
                }}
              >
                Buy Rise
              </Button>
              
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<ArrowDown size={18} />} 
                onClick={() => simulateManualTrade('FALL')}
                disabled={!spot}
                sx={{ 
                  bgcolor: '#ff444f', 
                  color: '#ffffff',
                  py: 1.5,
                  fontWeight: 900,
                  borderRadius: 3,
                  boxShadow: '0 4px 14px rgba(255, 68, 79, 0.4)',
                  '&:hover': { bgcolor: '#dc2626' },
                  '&:disabled': { opacity: 0.4 }
                }}
              >
                Buy Fall
              </Button>

              <Stack direction="row" spacing={1}>
                <Button 
                  component="a" 
                  href="https://app.deriv.com/trader" 
                  target="_blank" 
                  rel="noreferrer" 
                  variant="outlined" 
                  startIcon={<Wallet size={16} />}
                  fullWidth
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.04)',
                    color: '#ffffff',
                    borderColor: 'rgba(255,255,255,0.2)',
                    py: 1,
                    fontWeight: 700,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' }
                  }}
                >
                  Deriv Trader
                </Button>
                <Button 
                  component="a" 
                  href="https://app.deriv.com/bot" 
                  target="_blank" 
                  rel="noreferrer" 
                  variant="outlined" 
                  startIcon={<Play size={16} />}
                  fullWidth
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.04)',
                    color: '#ffffff',
                    borderColor: 'rgba(255,255,255,0.2)',
                    py: 1,
                    fontWeight: 700,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' }
                  }}
                >
                  Deriv Bot
                </Button>
              </Stack>

              {lastAction ? <Alert severity="success" sx={{ bgcolor: 'rgba(22,163,74,0.15)', color: '#4ade80' }}>{lastAction}</Alert> : null}
              
              <Alert severity="warning" sx={{ bgcolor: 'rgba(245,158,11,0.15)', color: '#fbbf24', fontSize: '0.75rem' }}>
                Demo trading only. Connect Deriv API for real trades.
              </Alert>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}