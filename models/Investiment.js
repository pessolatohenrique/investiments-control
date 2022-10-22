const mongoose = require("mongoose");

const IndexerSchema = new mongoose.Schema({
  name: { type: String },
  contracted_rate: { type: Number },
  has_tax: { type: Boolean },
});

const DreamTypeSchema = new mongoose.Schema({
  name: { type: String },
  months: { type: Number },
});

const InvestimentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: "Goal" },
    type: { type: String },
    category: { type: String },
    description: { type: String },
    dream_type: DreamTypeSchema,
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
module.exports = mongoose.model("Investiment", InvestimentSchema);
