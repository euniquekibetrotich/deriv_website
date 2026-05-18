import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { Activity, BarChart2, TrendingUp, TrendingDown, Minus, RefreshCw, Clock, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { MarketChart } from './MarketChart.jsx';
import { openDerivSocket, toDerivCandles, volatilityMarkets } from '../api/derivMarketData.js';

const granularities = [
  { label: '1 minute', value: 60 },
  { label: '5 minutes', value: 300 },
  { label: '15 minutes', value: 900 },
  { label: '1 hour', value: 3600 }
];

const indicators = [
  { id: 'rsi', label: 'RSI', color: '#377cfc' },
  { id: 'macd', label: 'MACD', color: '#f59e0b' },
  { id: 'bollinger', label: 'Bollinger', color: '#16a34a' },
  { id: 'sma', label: 'SMA', color: '#8b5cf6' },
  { id: 'ema', label: 'EMA', color: '#ec4899' }
];

function formatQuote(value) {
  if (!value) return '--';
  return Number(value).toLocaleString('en-US', { maximumFractionDigits: 5 });
}

// Simple RSI calculation
function calculateRSI(closes, period = 14) {
  if (closes.length < period + 1) return 50;
  
  let gains = 0;
  let losses = 0;
  
  for (let i = closes.length - period; i < closes.length; i++) {
    const change = closes[i] - closes[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }
  
  if (losses === 0) return 100;
  const rs = gains / losses;
  return 100 - (100 / (1 + rs));
}

// Simple MACD calculation
function calculateMACD(closes, fast = 12, slow = 26, signal = 9) {
  if (closes.length < slow + signal) return { macd: 0, signal: 0, histogram: 0 };
  
  // Simplified EMA calculation
  const fastEMA = closes.slice(-fast).reduce((a, b) => a + b, 0) / fast;
  const slowEMA = closes.slice(-slow).reduce((a, b) => a + b, 0) / slow;
  const macd = fastEMA - slowEMA;
  
  return {
    macd: macd,
    signal: macd * 0.9,
    histogram: macd * 0.1
  };
}

export function AnalysisTool() {
  const socketRef = useRef(null);
  const [symbol, setSymbol] = useState('R_75');
  const [granularity, setGranularity] = useState(60);
  const [candles, setCandles] = useState([]);
  const [spot, setSpot] = useState(null);
  const [status, setStatus] = useState('Connecting');
  const [error, setError] = useState('');
  const [selectedIndicators, setSelectedIndicators] = useState(['rsi', 'macd']);
  const [analysisMode, setAnalysisMode] = useState('auto');

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
          count: 200,
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

  // Calculate technical indicators
  const closes = useMemo(() => candles.map(c => c.close), [candles]);
  const rsi = useMemo(() => calculateRSI(closes), [closes]);
  const macd = useMemo(() => calculateMACD(closes), [closes]);

  // Generate trading signal
  const getSignal = () => {
    if (rsi < 30 && macd.histogram > 0) return { type: 'buy', strength: 'strong', text: 'Strong Buy' };
    if (rsi < 35 && macd.histogram > 0) return { type: 'buy', strength: 'moderate', text: 'Buy' };
    if (rsi > 70 && macd.histogram < 0) return { type: 'sell', strength: 'strong', text: 'Strong Sell' };
    if (rsi > 65 && macd.histogram < 0) return { type: 'sell', strength: 'moderate', text: 'Sell' };
    return { type: 'neutral', strength: 'none', text: 'Neutral' };
  };

  const signal = getSignal();

  const handleIndicatorToggle = (event, newIndicators) => {
    setSelectedIndicators(newIndicators);
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
              <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: '#377cfc', display: 'grid', placeItems: 'center' }}>
                <BarChart2 size={18} color="#ffffff" />
              </Box>
              <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 900 }}>
                Analysis Tool
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
              Technical analysis with real-time indicators and trading signals
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
            Refresh
          </Button>
        </Stack>
      </Box>

      <Grid container>
        {/* Left Panel - Market & Indicators */}
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2.5, height: '100%', bgcolor: '#0b1220', borderRight: { md: '1px solid rgba(255,255,255,0.08)' } }}>
            <Stack spacing={2.5}>
              {/* Market Selection */}
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

              {/* Timeframe */}
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

              {/* Indicators Toggle */}
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, display: 'block', mb: 0.5 }}>
                  Indicators
                </Typography>
                <ToggleButtonGroup
                  value={selectedIndicators}
                  onChange={handleIndicatorToggle}
                  aria-label="technical indicators"
                  orientation="vertical"
                  sx={{ 
                    width: '100%',
                    '& .MuiToggleButton-root': { 
                      color: '#ffffff',
                      borderColor: 'rgba(255,255,255,0.15)',
                      py: 0.8,
                      px: 1.5,
                      justifyContent: 'flex-start',
                      gap: 0.5,
                      '&.Mui-selected': {
                        bgcolor: 'rgba(56, 124, 252, 0.2)',
                        borderColor: 'rgba(56, 124, 252, 0.4)',
                        color: '#377cfc'
                      }
                    }
                  }}
                >
                  {indicators.map((indicator) => (
                    <ToggleButton key={indicator.id} value={indicator.id}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: indicator.color }} />
                      {indicator.label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              {/* Live Price */}
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Target size={16} color="#4ade80" />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 800 }}>
                    Current Price
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
                  Technical analysis chart with indicators
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                {selectedIndicators.map((id) => {
                  const indicator = indicators.find(i => i.id === id);
                  return indicator ? (
                    <Chip 
                      key={id}
                      size="small"
                      label={indicator.label}
                      sx={{ 
                        bgcolor: `${indicator.color}24`, 
                        color: indicator.color,
                        fontWeight: 800,
                        fontSize: '0.7rem'
                      }} 
                    />
                  ) : null;
                })}
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
              {candles.length ? <MarketChart candles={candles} height={380} /> : <Box sx={{ height: 380 }} />}
            </Box>
          </Box>
        </Grid>

        {/* Right Panel - Analysis & Signals */}
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2.5, height: '100%', bgcolor: '#0b1220', borderLeft: { md: '1px solid rgba(255,255,255,0.08)' } }}>
            <Stack spacing={2}>
              {/* Signal Header */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: signal.type === 'buy' ? '#16a34a' : signal.type === 'sell' ? '#ff444f' : '#64748b', display: 'grid', placeItems: 'center' }}>
                  {signal.type === 'buy' ? <TrendingUp size={16} color="#ffffff" /> : signal.type === 'sell' ? <TrendingDown size={16} color="#ffffff" /> : <Minus size={16} color="#ffffff" />}
                </Box>
                <Typography sx={{ color: '#ffffff', fontWeight: 900, fontSize: '0.85rem' }}>
                  SIGNAL ANALYSIS
                </Typography>
              </Stack>

              {/* Main Signal */}
              <Box sx={{ 
                p: 2.5, 
                borderRadius: 3, 
                bgcolor: signal.type === 'buy' ? 'rgba(22, 163, 74, 0.15)' : signal.type === 'sell' ? 'rgba(255, 68, 79, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                border: `1px solid ${signal.type === 'buy' ? 'rgba(22, 163, 74, 0.3)' : signal.type === 'sell' ? 'rgba(255, 68, 79, 0.3)' : 'rgba(100, 116, 139, 0.3)'}`,
                textAlign: 'center'
              }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, display: 'block', mb: 0.5 }}>
                  RECOMMENDATION
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: signal.type === 'buy' ? '#4ade80' : signal.type === 'sell' ? '#f87171' : '#94a3b8', 
                    fontWeight: 900 
                  }}
                >
                  {signal.text}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
                  Confidence: {signal.strength === 'strong' ? 'High' : signal.strength === 'moderate' ? 'Medium' : 'Low'}
                </Typography>
              </Box>

              {/* RSI Indicator */}
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#377cfc' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>RSI (14)</Typography>
                  </Stack>
                  <Typography sx={{ color: '#377cfc', fontWeight: 900 }}>{rsi.toFixed(1)}</Typography>
                </Stack>
                <Box sx={{ width: '100%', height: 6, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                  <Box 
                    sx={{ 
                      height: '100%', 
                      width: `${rsi}%`, 
                      bgcolor: rsi < 30 ? '#16a34a' : rsi > 70 ? '#ff444f' : '#377cfc',
                      borderRadius: 3,
                      transition: 'width 0.3s ease'
                    }} 
                  />
                </Box>
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>Oversold</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>Overbought</Typography>
                </Stack>
              </Box>

              {/* MACD Indicator */}
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>MACD</Typography>
                  </Stack>
                  <Typography sx={{ color: macd.histogram > 0 ? '#4ade80' : '#f87171', fontWeight: 900 }}>
                    {macd.histogram > 0 ? '+' : ''}{macd.histogram.toFixed(4)}
                  </Typography>
                </Stack>
                <Stack spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>MACD Line</Typography>
                    <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 700 }}>{macd.macd.toFixed(4)}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>Signal</Typography>
                    <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 700 }}>{macd.signal.toFixed(4)}</Typography>
                  </Stack>
                </Stack>
              </Box>

              {/* Market Stats */}
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, display: 'block', mb: 1 }}>
                  Market Stats
                </Typography>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Trend</Typography>
                    <Typography sx={{ color: closes.length > 1 && closes[closes.length - 1] > closes[0] ? '#4ade80' : '#f87171', fontWeight: 800 }}>
                      {closes.length > 1 && closes[closes.length - 1] > closes[0] ? 'Bullish' : 'Bearish'}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Volatility</Typography>
                    <Typography sx={{ color: '#f59e0b', fontWeight: 800 }}>High</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Candles</Typography>
                    <Typography sx={{ color: '#ffffff', fontWeight: 800 }}>{candles.length}</Typography>
                  </Stack>
                </Stack>
              </Box>

              {/* Disclaimer */}
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <AlertTriangle size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
                  <Typography variant="caption" sx={{ color: '#fbbf24', lineHeight: 1.5 }}>
                    Technical analysis is for educational purposes only. Always do your own research before trading.
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

// Simple Alert component for error display
function Alert({ severity, sx, children }) {
  return (
    <Box sx={{ 
      p: 1.5, 
      borderRadius: 2, 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      ...sx 
    }}>
      {severity === 'error' && <AlertTriangle size={18} />}
      {severity === 'success' && <CheckCircle size={18} />}
      {severity === 'warning' && <AlertTriangle size={18} />}
      <Typography variant="body2">{children}</Typography>
    </Box>
  );
}