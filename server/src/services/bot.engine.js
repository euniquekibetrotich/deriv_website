class BotEngine {
  constructor() {
    this.bots = new Map();
  }

  addBot(botId, config) {
    this.bots.set(botId, {
      config,
      lastTrade: 0
    });

    console.log(`🤖 Bot added: ${botId}`, config);
  }

  listBots() {
    return [...this.bots.values()];
  }

  async evaluateAndTrade(botId, price) {

    const bot = this.bots.get(botId);

    if (!bot) return;

    const now = Date.now();

    if (now - bot.lastTrade < bot.config.cooldown) {
      return;
    }

    console.log(
      `📈 ${botId} evaluating price:`,
      price
    );

    bot.lastTrade = now;
  }
}

export const botEngine = new BotEngine();