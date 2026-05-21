import { botEngine } from './bot.engine.js';
import { derivWS } from './deriv.ws.service.js';

class BotLoop {
  constructor() {
    this.interval = null;
    this.latestTicks = new Map();
    this.isRunning = false;
  }

  async start() {
    await derivWS.connect();

    console.log('🚀 Bot Loop starting...');

    // subscribe to major markets (you can expand later)
    const symbols = ['R_75', 'R_100'];

    symbols.forEach((symbol) => {
      derivWS.subscribeTicks(symbol, (tick) => {
        this.latestTicks.set(symbol, tick.quote);
      });
    });

    this.isRunning = true;

    this.interval = setInterval(() => {
      this.runCycle();
    }, 2000); // safe interval (not too aggressive)

    console.log('✅ Bot Loop running');
  }

  async runCycle() {
    if (!this.isRunning) return;

    const bots = await botEngine.listBots();

    for (const bot of bots) {
      const price = this.latestTicks.get(bot.symbol);

      if (!price) continue;

      try {
        await botEngine.evaluateAndTrade(bot.id, price);
      } catch (err) {
        console.error(`Bot ${bot.id} error:`, err.message);
      }
    }
  }

  stop() {
    clearInterval(this.interval);
    this.isRunning = false;
  }
}

export const botLoop = new BotLoop();