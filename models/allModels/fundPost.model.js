import mongoose from 'mongoose';

const fundPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    totalFund: {
      type: Number,
      required: true,
    },
    currentFund: {
      type: Number,
      required: true,
    },
    fundDate: {
      type: Date,
      required: true,
    },
    fundTime: {
      type: String,
      required: true,
    },
    totalFundPercentage: {
      type: Number,
      required: true,
    },
    fundImage: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auth',
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const FundPost = mongoose.model('FundPost', fundPostSchema);
export default FundPost;
