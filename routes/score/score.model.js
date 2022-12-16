const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  gameId: String,
  userId: String,
  score: Number,
});

scoreSchema.index({ gameId: 1, userId: 1 }, { unique: true });

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
