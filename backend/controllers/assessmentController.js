require('dotenv').config();
const Groq = require('groq-sdk');
const db = require('../config/db');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.getQuestions = (req, res) => {
  db.query('SELECT * FROM questions ORDER BY order_index', (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json({ success: true, questions: results });
  });
};

exports.analyze = async (req, res) => {
  const { answers } = req.body;
  if (!answers || answers.length === 0)
    return res.status(400).json({ message: 'No answers provided' });

  const prompt = `
You are a cybersecurity career advisor.
A user answered the following career assessment questions:

${answers.map((a, i) => `Q${i + 1}: ${a.question}\nAnswer: ${a.answer}`).join('\n\n')}

Based on these answers, recommend ONE specific cybersecurity career path.
Choose only from: Penetration Tester, SOC Analyst, DFIR Analyst, Threat Intelligence Analyst, OSINT Analyst, Malware Analyst.

Respond ONLY in this exact JSON format with no extra text:
{
  "recommended_path": "career name here",
  "team": "Red Team or Blue Team",
  "reason": "2-3 sentence explanation of why this path suits them",
  "key_traits": ["trait1", "trait2", "trait3"]
}
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
    });

    const raw = completion.choices[0].message.content.trim();
    const result = JSON.parse(raw);

    db.query(
      `INSERT INTO recommendations (user_id, recommended_path, team, reason)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE recommended_path=?, team=?, reason=?, updated_at=NOW()`,
      [req.userId, result.recommended_path, result.team, result.reason,
       result.recommended_path, result.team, result.reason]
    );

    res.json({ success: true, result });
  } catch (err) {
  console.error('Groq full error:', JSON.stringify(err, null, 2))
  console.error('Groq message:', err.message)
  res.status(500).json({ message: 'AI analysis failed', error: err.message })
}

};