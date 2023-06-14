const mongoose = require("mongoose");

const IndexerSchema = new mongoose.Schema({
  name: { type: String },
  contracted_rate: { type: Number },
  has_tax: { type: Boolean },
});

const InvestimentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: "Goal" },
    type: { type: String },
    category: { type: String },
    description: { type: String },
    indexer: IndexerSchema,
    platform: { type: String },
    net_value: { type: Number },
    final_date: { type: Date },
    monthly_profitability: { type: Number },
    invested_amount: { type: Number },
    expected_net_value: { type: Number },
    average_price: { type: Number },
    average_dividents: { type: Number },
    has_redeemed: { type: Boolean },
  },
  { collection: "investiments" }
);

InvestimentSchema.methods.findByUserId = function ({ userId }) {
  return this.model('Investiment').find({ userId });
};

module.exports = mongoose.model("Investiment", InvestimentSchema);
