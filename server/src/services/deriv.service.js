import axios from 'axios';

class DerivService {
  constructor() {
    this.baseUrl = 'https://api.deriv.com';
  }

  // 1. Get market tick data (Volatility, Forex, etc.)
  async getTicks(symbol = 'R_75') {
    try {
      const res = await axios.get(
        `https://api.deriv.com/api/external/v3/ticks?symbol=${symbol}`
      );
      return res.data;
    } catch (error) {
      console.error('Deriv tick error:', error.message);
      return null;
    }
  }

  // 2. Placeholder: validate API token later
  async validateToken(token) {
    try {
      const res = await axios.post(`${this.baseUrl}/authorize`, {
        token
      });
      return res.data;
    } catch (error) {
      return null;
    }
  }

  // 3. Placeholder: trade history (for future commission logic)
  async getTradeHistory(accountId) {
    try {
      const res = await axios.get(
        `${this.baseUrl}/api/external/v3/trades?account=${accountId}`
      );
      return res.data;
    } catch (error) {
      console.error('Trade history error:', error.message);
      return null;
    }
  }
}

export const derivService = new DerivService();