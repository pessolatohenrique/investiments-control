const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  city: { type: String },
  state: { type: String },
  country: { type: String },
});

const InvestimentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String },
    type: { type: String },
    platform: { type: String },
    net_value: { type: Number },
  },
  { collection: "investiments" }
);
module.exports = mongoose.model("Investiment", InvestimentSchema);
