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

// Get all users
exports.getAllUsers = (req, res) => {
  db.query(
    `SELECT u.id, u.username, u.email, u.role, u.created_at, u.last_login,
            r.recommended_path, r.team
     FROM users u
     LEFT JOIN recommendations r ON r.user_id = u.id
     ORDER BY u.created_at DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ message: 'DB error' })
      res.json({ success: true, data: results })
    }
  )
}

// Get stats
exports.getStats = (req, res) => {
  const queries = {
    totalUsers: 'SELECT COUNT(*) as count FROM users',
    careerPaths: 'SELECT recommended_path, COUNT(*) as count FROM recommendations GROUP BY recommended_path ORDER BY count DESC',
    popularResources: 'SELECT r.title, r.url, r.type, COUNT(*) as views FROM resources r GROUP BY r.id ORDER BY r.id DESC LIMIT 5',
  }

  Promise.all([
    new Promise((resolve, reject) => db.query(queries.totalUsers, (err, r) => err ? reject(err) : resolve(r[0].count))),
    new Promise((resolve, reject) => db.query(queries.careerPaths, (err, r) => err ? reject(err) : resolve(r))),
    new Promise((resolve, reject) => db.query(queries.popularResources, (err, r) => err ? reject(err) : resolve(r))),
  ]).then(([totalUsers, careerPaths, popularResources]) => {
    res.json({ success: true, totalUsers, careerPaths, popularResources })
  }).catch(() => res.status(500).json({ message: 'DB error' }))
}

// Add specialist
exports.addSpecialist = (req, res) => {
  const { team_id, name, slug, description, avg_income } = req.body
  if (!team_id || !name || !slug) return res.status(400).json({ message: 'team_id, name and slug required' })
  db.query(
    'INSERT INTO specialists (team_id, name, slug, description, avg_income) VALUES (?, ?, ?, ?, ?)',
    [team_id, name, slug, description, avg_income],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to add specialist' })
      // Auto create 4 levels
      const levels = [['Beginner', 1], ['Intermediate', 2], ['Advanced', 3], ['Expert', 4]]
      const levelInserts = levels.map(([name, order]) =>
        new Promise((resolve, reject) =>
          db.query('INSERT INTO levels (specialist_id, name, order_index) VALUES (?, ?, ?)',
            [result.insertId, name, order],
            (err) => err ? reject(err) : resolve()
          )
        )
      )
      Promise.all(levelInserts)
        .then(() => res.json({ success: true, id: result.insertId }))
        .catch(() => res.json({ success: true, id: result.insertId, warning: 'Levels not created' }))
    }
  )
}

// ── PROJECTS ──────────────────────────────────────


exports.getAllProjects = (req, res) => {
  db.query(`
    SELECT p.*, l.name as level_name, s.name as specialist_name
    FROM projects p
    JOIN levels l ON l.id = p.level_id
    JOIN specialists s ON s.id = l.specialist_id
    ORDER BY s.name, l.order_index
  `, (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' })
    res.json({ success: true, data: results })
  })
}

exports.addProject = (req, res) => {
  const { level_id, title, description, url, difficulty } = req.body
  if (!level_id || !title) return res.status(400).json({ message: 'level_id and title required' })
  db.query(
    'INSERT INTO projects (level_id, title, description, url, difficulty) VALUES (?, ?, ?, ?, ?)',
    [level_id, title, description || '', url || null, difficulty || 'easy'],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to add project' })
      res.json({ success: true, id: result.insertId })
    }
  )
}

exports.updateProject = (req, res) => {
  const { id } = req.params
  const { title, description, url, difficulty } = req.body
  db.query(
    'UPDATE projects SET title=?, description=?, url=?, difficulty=? WHERE id=?',
    [title, description, url || null, difficulty || 'easy', id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Failed to update' })
      res.json({ success: true })
    }
  )
}

exports.deleteProject = (req, res) => {
  const { id } = req.params
  db.query('DELETE FROM projects WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Failed to delete' })
    res.json({ success: true })
  })
}

// ── CERTIFICATES ───────────────────────────────────

exports.getAllCertificates = (req, res) => {
  db.query(`
    SELECT c.*, l.name as level_name, s.name as specialist_name
    FROM certificates c
    JOIN levels l ON l.id = c.level_id
    JOIN specialists s ON s.id = l.specialist_id
    ORDER BY s.name, l.order_index
  `, (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' })
    res.json({ success: true, data: results })
  })
}

exports.addCertificate = (req, res) => {
  const { level_id, name, provider, url } = req.body
  if (!level_id || !name) return res.status(400).json({ message: 'level_id and name required' })
  db.query('INSERT INTO certificates (level_id, name, provider, url) VALUES (?, ?, ?, ?)',
    [level_id, name, provider || '', url || ''],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to add certificate' })
      res.json({ success: true, id: result.insertId })
    })
}

exports.updateCertificate = (req, res) => {
  const { id } = req.params
  const { name, provider, url } = req.body
  db.query('UPDATE certificates SET name=?, provider=?, url=? WHERE id=?',
    [name, provider, url, id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Failed to update' })
      res.json({ success: true })
    })
}

exports.deleteCertificate = (req, res) => {
  const { id } = req.params
  db.query('DELETE FROM certificates WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Failed to delete' })
    res.json({ success: true })
  })
}

// Get questions
exports.getQuestions = (req, res) => {
  db.query('SELECT * FROM questions ORDER BY order_index', (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' })
    res.json({ success: true, questions: results })
  })
}

// Add question
exports.addQuestion = (req, res) => {
  const { question_text, option_a, option_b, option_c, option_d, order_index } = req.body
  db.query(
    'INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, order_index) VALUES (?, ?, ?, ?, ?, ?)',
    [question_text, option_a, option_b, option_c, option_d, order_index || 0],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Failed to add question' })
      res.json({ success: true, id: result.insertId })
    }
  )
}

// Update question
exports.updateQuestion = (req, res) => {
  const { id } = req.params
  const { question_text, option_a, option_b, option_c, option_d } = req.body
  db.query(
    'UPDATE questions SET question_text=?, option_a=?, option_b=?, option_c=?, option_d=? WHERE id=?',
    [question_text, option_a, option_b, option_c, option_d, id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Failed to update' })
      res.json({ success: true })
    }
  )
}

// Delete question
exports.deleteQuestion = (req, res) => {
  const { id } = req.params
  db.query('DELETE FROM questions WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Failed to delete' })
    res.json({ success: true })
  })
}