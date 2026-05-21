import express from 'express';

import {
  createBot,
  getBots,
  startBot,
  stopBot
} from '../controllers/bot.controller.js';

import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getBots);

router.post('/', createBot);

router.post('/:id/start', startBot);

router.post('/:id/stop', stopBot);

export default router;