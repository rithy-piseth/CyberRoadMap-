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
You are a cybersecurity career advisor helping a complete beginner find their ideal career path.

The questions were designed around personality, interests, and natural thinking style — NOT technical knowledge.

PERSONALITY TO CAREER MAPPING:

Answer A pattern = Research and intelligence gathering personality:
- Loves finding information, tracking, investigating through public sources
- Best fits: OSINT Analyst (tracking people and infrastructure online) or Threat Intelligence Analyst (studying attack campaigns and threat actors)
- Choose OSINT Analyst if answers focus on tracking individuals and finding hidden info
- Choose Threat Intelligence Analyst if answers focus on understanding attackers and predicting threats

Answer B pattern = Offensive and challenger personality:
- Loves finding weaknesses, testing limits, thinking like an attacker, creative problem solving
- Best fits: Penetration Tester (general hacking), Web Application Hacker (web vulnerabilities), Exploit Developer (deep technical exploitation), Red Team Operator (full attack simulations), Social Engineer (human manipulation)
- Choose Penetration Tester for general offensive interest
- Choose Web Application Hacker if web and apps are mentioned
- Choose Social Engineer if human behavior and manipulation interest is shown
- Choose Exploit Developer if deep technical and coding interest is shown
- Choose Red Team Operator if large scale simulation and leadership is shown

Answer C pattern = Investigative and analytical personality:
- Loves piecing together evidence, reconstructing events, solving mysteries methodically
- Best fits: DFIR Analyst (incident response), Digital Forensics Analyst (evidence and legal), Malware Analyst (analyzing malicious software behavior)
- Choose DFIR Analyst if incident response and live investigation is preferred
- Choose Digital Forensics Analyst if evidence collection and documentation is preferred
- Choose Malware Analyst if analyzing suspicious programs and behavior is preferred

Answer D pattern = Protective and systematic personality:
- Loves building systems, enforcing rules, preventing problems, keeping order
- Best fits: SOC Analyst (monitoring threats), Cloud Security Engineer (securing cloud), GRC Analyst (compliance and governance), Vulnerability Management Analyst (finding and fixing weaknesses), Security Engineer (building security systems)
- Choose SOC Analyst if monitoring and real time response is preferred
- Choose Cloud Security Engineer if technology infrastructure is preferred
- Choose GRC Analyst if rules compliance and governance is preferred
- Choose Vulnerability Management Analyst if finding and fixing weaknesses is preferred
- Choose Security Engineer if building and designing security systems is preferred

User answers:
${answers.map((a, i) => `Q${i + 1}: ${a.question}\nAnswer: ${a.answer}`).join('\n\n')}

Instructions:
1. Count how many A, B, C, D answers the user gave
2. Find the dominant pattern
3. Use the sub-guidelines to pick the MOST specific career from the 15 options
4. Write the reason in simple beginner-friendly language — no jargon

Available career paths (choose exactly one):
Blue Team: SOC Analyst, DFIR Analyst, Threat Intelligence Analyst, Cloud Security Engineer, GRC Analyst, Vulnerability Management Analyst, Security Engineer, Digital Forensics Analyst
Red Team: Penetration Tester, OSINT Analyst, Malware Analyst, Web Application Hacker, Social Engineer, Exploit Developer, Red Team Operator

Respond ONLY in this exact JSON format:
{
  "recommended_path": "exact career name from the list above",
  "team": "Red Team or Blue Team",
  "reason": "2-3 sentences in simple language explaining why this path suits their personality based on their answers — no technical jargon",
  "key_traits": ["personality trait 1", "personality trait 2", "personality trait 3"]
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