const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  photoUrl: String,
  location: String,
  tags: [String],
  gender: String
});

module.exports = mongoose.model('Profile', ProfileSchema);
