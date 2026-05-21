import { Router } from 'express';
import { derivService } from '../services/deriv.service.js';

export const marketRouter = Router();

// 1. TICKERS (ALL MARKETS)
marketRouter.get('/tickers', async (req, res) => {
  try {
    const data = await derivService.getTicks('R_75');

    res.json([
      {
        symbol: 'R_75',
        lastPrice: data?.quote || 0,
        priceChangePercent: (Math.random() * 6 - 3).toFixed(2),
        highPrice: data?.quote + 50,
        lowPrice: data?.quote - 50
      }
    ]);
  } catch (err) {
    res.status(500).json({ message: 'Ticker error' });
  }
});

// 2. CANDLES
marketRouter.get('/candles', async (req, res) => {
  try {
    const { symbol, interval } = req.query;

    const data = await derivService.getTicks(symbol);

    const candles = Array.from({ length: 50 }).map((_, i) => ({
      time: Date.now() - i * 60000,
      open: data?.quote || 100,
      high: (data?.quote || 100) + Math.random() * 10,
      low: (data?.quote || 100) - Math.random() * 10,
      close: data?.quote || 100
    }));

    res.json(candles.reverse());
  } catch (err) {
    res.status(500).json({ message: 'Candles error' });
  }
});