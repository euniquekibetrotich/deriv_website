import { User } from '../models/index.js';
import { createReferralCode } from '../utils/referral-code.js';
import { signToken } from '../utils/token.js';

// =========================
// REGISTER
// =========================
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email, and password are required'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters'
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        message: 'Email already exists'
      });
    }

    const user = await User.create({
      name,
      email,
      passwordHash: password,
      referralCode: createReferralCode(name)
    });

    return res.status(201).json({
      user: user.toSafeJSON(),
      token: signToken(user)
    });
  } catch (error) {
    next(error);
  }
}

// =========================
// LOGIN
// =========================
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    return res.json({
      user: user.toSafeJSON(),
      token: signToken(user)
    });
  } catch (error) {
    next(error);
  }
}