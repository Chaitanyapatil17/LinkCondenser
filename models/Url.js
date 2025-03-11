

const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortCode: String,
  longUrl: String,
});

module.exports = mongoose.model("Url", urlSchema); // ✅ Export correctly
