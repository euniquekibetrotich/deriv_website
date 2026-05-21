import { Commission } from '../models/index.js';

class CommissionService {
  async createCommission({ userId, referredUserId, amount, type }) {
    return await Commission.create({
      userId,
      referredUserId,
      amount,
      type,
      status: 'pending',
      source: 'deriv'
    });
  }

  async getUserCommissions(userId) {
    return await Commission.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
  }

  async calculateAffiliateCut(tradeProfit) {
    // simple model: 10% affiliate cut
    return tradeProfit * 0.1;
  }
}

export const commissionService = new CommissionService();