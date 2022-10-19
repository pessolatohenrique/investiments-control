const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String },
    total_value: { type: Number },
    initial_date: { type: Date },
    final_date: { type: Date },
    total_installments: { type: Number },
    monthly_profitability: { type: Number },
    invest_in_month: { type: Number },
    status: { type: Boolean },
  },
  { collection: "goals" }
);

module.exports = mongoose.model("Goal", GoalSchema);
