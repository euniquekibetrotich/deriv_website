import { Router } from 'express';
import { convertReferral, trackReferral } from '../controllers/referral.controller.js';
import { requireAuth } from '../middleware/auth.js';

export const referralRouter = Router();

referralRouter.post('/track', trackReferral);
referralRouter.post('/convert', requireAuth, convertReferral);
