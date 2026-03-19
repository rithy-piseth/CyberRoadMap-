require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./config/db');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://cyberroad.vercel.app'],
  credentials: true
}));
app.use(express.json());

// ── Passport Google Strategy ──────────────────────────────
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const name = profile.displayName;
  const googleId = profile.id;

  // Check if user exists
  db.query('SELECT * FROM users WHERE google_id = ?', [googleId], (err, rows) => {
    if (err) return done(err, null);

    if (rows.length > 0) {
      // User exists → return user
      return done(null, rows[0]);
    } else {
      // Check if email already registered normally
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, emailRows) => {
        if (err) return done(err, null);

        if (emailRows.length > 0) {
          // Email exists → link google_id to existing account
          db.query('UPDATE users SET google_id = ? WHERE email = ?', [googleId, email], (err) => {
            if (err) return done(err, null);
            return done(null, emailRows[0]);
          });
        } else {
          // New user → create account
          db.query(
            'INSERT INTO users (google_id, username, email) VALUES (?, ?, ?)',
            [googleId, name, email],
            (err, result) => {
              if (err) return done(err, null);
              return done(null, {
                id: result.insertId,
                username: name,
                email,
                role: 'user'
              });
            }
          );
        }
      });
    }
  });
}));

app.use(passport.initialize());

// ── Routes ────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/assessment', require('./routes/assessment'));
app.use('/api/specialists', require('./routes/specialist'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/career', require('./routes/career'));

app.get('/', (req, res) => res.json({ message: '🚀 Cyber Road API running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));