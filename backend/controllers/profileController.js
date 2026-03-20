const db = require('../config/db');

exports.getProfile = (req, res) => {
  db.query(
    `SELECT u.id, u.username, u.email, u.created_at,
            r.recommended_path, r.team, r.reason,
            cp.path_name as chosen_path
     FROM users u
     LEFT JOIN recommendations r ON r.user_id = u.id
     LEFT JOIN career_paths cp ON cp.user_id = u.id
     WHERE u.id = ?`,
    [req.userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'DB error' });
      if (results.length === 0) return res.status(404).json({ message: 'User not found' });
      res.json({ success: true, profile: results[0] });
    }
  );
};