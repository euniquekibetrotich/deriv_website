import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { dashboardRouter } from './dashboard.routes.js';
import { referralRouter } from './referral.routes.js';
import { marketRouter } from './market.routes.js';
import { tradeRouter } from './trade.routes.js';
import { botRouter } from './bot.routes.js';



export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/dashboard', dashboardRouter);
apiRouter.use('/referrals', referralRouter);
apiRouter.use('/market', marketRouter);
apiRouter.use('/trade', tradeRouter);
apiRouter.use('/bots', botRouter);
