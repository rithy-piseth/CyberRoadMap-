require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://172.20.10.7:5173',  // your local IP
    'https://cyberroad.vercel.app'
  ],
  credentials: true
}))
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/assessment', require('./routes/assessment'));
app.use('/api/specialists', require('./routes/specialist'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/career', require('./routes/career'));

app.get('/', (req, res) => res.json({ message: '🚀 Cyber Road API running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on http://0.0.0.0:${PORT}`));
