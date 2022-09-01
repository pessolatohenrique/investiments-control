const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  city: { type: String },
  state: { type: String },
  country: { type: String },
});

const AuthorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: LocationSchema,
  },
  { collection: "authors" }
);
module.exports = mongoose.model("Author", AuthorSchema);
