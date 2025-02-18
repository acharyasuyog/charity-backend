import { StatusCodes } from 'http-status-codes';
import models from '../models/index.model.js';

export const createDonation = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized, Please use token :)' });
  }

  try {
    const { amount, campaignId, paymentId, status } = req.body;

    const campaign = await models.Campaign.findById(campaignId);
    if (!campaign) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Campaign not found' });
    }

    const newDonation = new models.Donation({
      amount,
      donor: userId,
      campaign: campaignId,
      paymentId,
      status,
    });
    await newDonation.save();
    campaign.currentFund += amount;
    campaign.totalFund -= amount;
    campaign.totalFundPercentage =
      (campaign.currentFund / campaign.totalFund) * 100;

    await models.Campaign.findByIdAndUpdate(campaign, {
      // participants: campaign.participants.push(userId),
      participants: [...campaign.participants, userId],
    });
    status === 'completed';
    await campaign.save();

    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: newDonation });
  } catch (error) {
    // status === 'failed';
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
