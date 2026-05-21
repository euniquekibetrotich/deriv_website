import { Router } from 'express';
import { derivWS } from '../services/deriv.ws.service.js';

export const tradeRouter = Router();

// place trade
tradeRouter.post('/buy', async (req, res) => {
  try {
    const trade = await derivWS.buyContract(req.body);

    res.json({
      success: true,
      trade
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});