const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');

// Profielpagina tonen (GET)
router.get('/:id', async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  res.render('profile', { profile });
});

// Profiel opslaan of updaten (POST)
router.post('/:id', async (req, res) => {
  const { location, tags, gender } = req.body;
  const updated = await Profile.findByIdAndUpdate(req.params.id, {
    location,
    tags: tags.split(',').map(t => t.trim()),
    gender
  }, { new: true, upsert: true });

  res.redirect(`/profile/${req.params.id}`);
});

module.exports = router;