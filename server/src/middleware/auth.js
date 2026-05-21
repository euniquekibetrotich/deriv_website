import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/index.js';

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    const payload = jwt.verify(token, env.jwtSecret);

    if (!payload?.id) {
      return res.status(401).json({
        message: 'Invalid token payload'
      });
    }

    const user = await User.findByPk(payload.id);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid session'
      });
    }

    // optional safety layer
    if (user.status === 'suspended') {
      return res.status(403).json({
        message: 'Account suspended'
      });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
}