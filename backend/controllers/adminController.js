const db = require('../config/db');

exports.getAllResources = (req, res) => {
  db.query(
    `SELECT r.*, l.name as level_name, s.name as specialist_name
     FROM resources r
     JOIN levels l ON l.id = r.level_id
     JOIN specialists s ON s.id = l.specialist_id
     ORDER BY s.name, l.order_index`,
    (err, results) => {
      if (err) return res.status(500).json({ message: 'DB error' });
      res.json({ success: true, data: results });
    }
  );
};

exports.addResource = (req, res) => {
  const { level_id, title, url, type } = req.body;
  db.query('INSERT INTO resources (level_id, title, url, type) VALUES (?, ?, ?, ?)',
    [level_id, title, url, type],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to add' });
      res.json({ success: true, id: result.insertId });
    });
};

exports.updateResource = (req, res) => {
  const { id } = req.params;
  const { title, url, type } = req.body;
  db.query('UPDATE resources SET title=?, url=?, type=? WHERE id=?',
    [title, url, type, id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Failed to update' });
      res.json({ success: true });
    });
};

exports.deleteResource = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM resources WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Failed to delete' });
    res.json({ success: true });
  });
};  