const db = require('../config/db');

exports.getAllTeams = (req, res) => {
  db.query(
    `SELECT t.id as team_id, t.name as team_name, t.slug as team_slug,
            t.description as team_description,
            s.id as specialist_id, s.name as specialist_name,
            s.slug as specialist_slug, s.description, s.avg_income
     FROM teams t
     LEFT JOIN specialists s ON s.team_id = t.id
     ORDER BY t.id, s.id`,
    (err, results) => {
      if (err) return res.status(500).json({ message: 'DB error' });
      res.json({ success: true, data: results });
    }
  );
};

exports.getSpecialist = (req, res) => {
  const { slug } = req.params;
  db.query(
    `SELECT s.*, t.name as team_name FROM specialists s
     JOIN teams t ON t.id = s.team_id WHERE s.slug = ?`,
    [slug],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'DB error' });
      if (results.length === 0) return res.status(404).json({ message: 'Not found' });

      const specialist = results[0];
      db.query(
        `SELECT l.id, l.name as level_name, l.order_index FROM levels l
         WHERE l.specialist_id = ? ORDER BY l.order_index`,
        [specialist.id],
        (err2, levels) => {
          if (err2) return res.status(500).json({ message: 'DB error' });
          res.json({ success: true, specialist, levels });
        }
      );
    }
  );
};

exports.getLevelContent = (req, res) => {
  const { levelId } = req.params;
  const projects = new Promise((resolve, reject) =>
    db.query('SELECT * FROM projects WHERE level_id = ?', [levelId], (err, r) =>
      err ? reject(err) : resolve(r))
  );
  const certificates = new Promise((resolve, reject) =>
    db.query('SELECT * FROM certificates WHERE level_id = ?', [levelId], (err, r) =>
      err ? reject(err) : resolve(r))
  );
  const resources = new Promise((resolve, reject) =>
    db.query('SELECT * FROM resources WHERE level_id = ?', [levelId], (err, r) =>
      err ? reject(err) : resolve(r))
  );

  Promise.all([projects, certificates, resources])
    .then(([p, c, r]) => res.json({ success: true, projects: p, certificates: c, resources: r }))
    .catch(() => res.status(500).json({ message: 'DB error' }));
};