import { Bot } from '../models/index.js';

export async function createBot(req, res, next) {
  try {

    const {
      name,
      symbol,
      strategy,
      stake,
      duration
    } = req.body;

    const bot = await Bot.create({
      userId: req.user.id,
      name,
      symbol,
      strategy,
      stake,
      duration
    });

    return res.status(201).json(bot);

  } catch (error) {
    next(error);
  }
}

export async function getBots(req, res, next) {
  try {

    const bots = await Bot.findAll({
      where: {
        userId: req.user.id
      },
      order: [['createdAt', 'DESC']]
    });

    return res.json(bots);

  } catch (error) {
    next(error);
  }
}

export async function startBot(req, res, next) {
  try {

    const bot = await Bot.findByPk(req.params.id);

    if (!bot) {
      return res.status(404).json({
        message: 'Bot not found'
      });
    }

    bot.isRunning = true;

    await bot.save();

    return res.json({
      message: 'Bot started',
      bot
    });

  } catch (error) {
    next(error);
  }
}

export async function stopBot(req, res, next) {
  try {

    const bot = await Bot.findByPk(req.params.id);

    if (!bot) {
      return res.status(404).json({
        message: 'Bot not found'
      });
    }

    bot.isRunning = false;

    await bot.save();

    return res.json({
      message: 'Bot stopped',
      bot
    });

  } catch (error) {
    next(error);
  }
}