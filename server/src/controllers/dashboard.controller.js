import { fn, col } from 'sequelize';
import { Commission, Referral } from '../models/index.js';
import { env } from '../config/env.js';

export async function getDashboard(req, res, next) {
  try {
    const userId = req.user.id;

    const [
      totalReferrals,
      registered,
      funded,
      recentCommissions,
      commissionTotals
    ] = await Promise.all([
      Referral.count({ where: { userId } }),

      Referral.count({
        where: { userId, status: 'registered' }
      }),

      Referral.count({
        where: { userId, status: 'funded' }
      }),

      Commission.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
        limit: 10
      }),

      Commission.findAll({
        where: { userId },
        attributes: [
          'status',
          [fn('SUM', col('amount')), 'total']
        ],
        group: ['status']
      })
    ]);

    // normalize commission totals
    const totals = commissionTotals.reduce(
      (acc, row) => {
        acc[row.status] = Number(row.get('total')) || 0;
        return acc;
      },
      { pending: 0, approved: 0, paid: 0 }
    );

    return res.json({
      affiliate: req.user.toSafeJSON(),

      links: {
        landing: `${env.clientUrl}/?ref=${req.user.referralCode}`,
        register: `${env.clientUrl}/register?ref=${req.user.referralCode}`
      },

      stats: {
        clicks: totalReferrals, // ⚠️ only correct if you store clicks as referrals
        registrations: registered,
        fundedAccounts: funded,
        commissions: totals
      },

      recentCommissions: recentCommissions
    });

  } catch (error) {
    next(error);
  }
}