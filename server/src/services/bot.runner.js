import { derivWS } from './deriv.ws.service.js';
import { botEngine } from './bot.engine.js';

class BotRunner {
  constructor() {
    this.interval = null;
    this.latestPrices = new Map();
  }

  async start() {

    console.log('🚀 Starting Bot Runner...');

    // connect websocket
    await derivWS.connect();

    // subscribe markets
    derivWS.subscribeTicks('R_75', (tick) => {
      this.latestPrices.set('R_75', tick.quote);
    });

    derivWS.subscribeTicks('R_100', (tick) => {
      this.latestPrices.set('R_100', tick.quote);
    });

    // sample bot
    botEngine.addBot('test_bot_1', {
      symbol: 'R_75',
      threshold: 50,
      stake: 1,
      duration: 5,
      durationUnit: 't',
      cooldown: 5000
    });

    // loop
    this.interval = setInterval(() => {
      this.runCycle();
    }, 2000);

    console.log('✅ Bot Runner ACTIVE');
  }

  async runCycle() {

    const bots = botEngine.listBots();

    for (const bot of bots) {

      const symbol = bot.config.symbol;

      const price = this.latestPrices.get(symbol);

      if (!price) continue;

      console.log(
        `📊 ${symbol}:`,
        price
      );
    }
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

export const botRunner = new BotRunner();