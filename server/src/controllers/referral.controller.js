import { Commission, Referral, User } from '../models/index.js';

export async function trackReferral(req, res, next) {
  try {
    const { referralCode, visitorId } = req.body;

    if (!referralCode) {
      return res.status(400).json({
        message: 'Referral code is required'
      });
    }

    const affiliate = await User.findOne({
      where: { referralCode }
    });

    if (!affiliate) {
      return res.status(404).json({
        message: 'Referral code not found'
      });
    }

    const referral = await Referral.create({
      userId: affiliate.id,
      referralCode,
      visitorId,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      status: 'clicked'
    });

    return res.status(201).json({
      referralId: referral.id,
      message: 'Referral tracked'
    });

  } catch (error) {
    next(error);
  }
}


export async function convertReferral(req, res, next) {
  try {
    const { referralId, referredEmail, amount = 25 } = req.body;

    if (!referralId || !referredEmail) {
      return res.status(400).json({
        message: 'Referral ID and referred email are required'
      });
    }

    const referral = await Referral.findByPk(referralId);

    if (!referral) {
      return res.status(404).json({
        message: 'Referral not found'
      });
    }

    // 🚨 PREVENT DOUBLE CONVERSION
    if (referral.status === 'registered') {
      return res.status(409).json({
        message: 'Referral already converted'
      });
    }

    referral.status = 'registered';
    referral.referredEmail = referredEmail;
    await referral.save();

    // 💰 CREATE COMMISSION (SAFE)
    const commission = await Commission.create({
      userId: referral.userId,
      referralId: referral.id,
      referredUserId: null, // will be filled when user fully registers
      amount,
      type: 'SIGNUP',
      status: 'pending',
      source: 'deriv'
    });

    return res.status(201).json({
      message: 'Referral conversion recorded',
      commission
    });

  } catch (error) {
    next(error);
  }
}