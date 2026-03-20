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
You are a cybersecurity career advisor. Analyze the user behavioral answers carefully.

Answer patterns:
- Mostly A = OSINT Analyst, Threat Intelligence Analyst (research, curiosity, information gathering)
- Mostly B = Penetration Tester, Web Application Hacker, Exploit Developer, Red Team Operator, Social Engineer (offensive, hands-on, experimental)
- Mostly C = DFIR Analyst, Malware Analyst, Digital Forensics Analyst (analytical, systematic, investigative)
- Mostly D = SOC Analyst, Cloud Security Engineer, GRC Analyst, Vulnerability Management Analyst, Security Engineer (defensive, protective, structured)

User answers:
${answers.map((a, i) => `Q${i + 1}: ${a.question}\nAnswer: ${a.answer}`).join('\n\n')}

Choose ONLY from these 15 career paths:
Blue Team: SOC Analyst, DFIR Analyst, Threat Intelligence Analyst, Cloud Security Engineer, GRC Analyst, Vulnerability Management Analyst, Security Engineer, Digital Forensics Analyst
Red Team: Penetration Tester, OSINT Analyst, Malware Analyst, Web Application Hacker, Social Engineer, Exploit Developer, Red Team Operator

Respond ONLY in this exact JSON format with no extra text:
{
  "recommended_path": "exact career name from the list above",
  "team": "Red Team or Blue Team",
  "reason": "2-3 sentences explaining why this specific path matches their behavioral patterns",
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