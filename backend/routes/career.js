const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/auth');
router.post('/choose', verifyToken, (req, res) => {
  const { path_name } = req.body;
  db.query(
    `INSERT INTO career_paths (user_id, path_name) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE path_name=?, updated_at=NOW()`,
    [req.userId, path_name, path_name],
    (err) => {
      if (err) return res.status(500).json({ message: 'Failed to save' });
      res.json({ success: true });
    }
  );
});
module.exports = router;