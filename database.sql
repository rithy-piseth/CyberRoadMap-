-- =====================
-- CYBER ROADMAP TABLES
-- =====================

-- Users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams (Blue / Red)
CREATE TABLE teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  description TEXT
);

-- Specialists (Pentest, SOC, OSINT...)
CREATE TABLE specialists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  team_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  avg_income VARCHAR(50),
  FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- Learning levels per specialist
CREATE TABLE levels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  specialist_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  order_index INT DEFAULT 0,
  FOREIGN KEY (specialist_id) REFERENCES specialists(id)
);

-- Project recommendations per level
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  level_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  FOREIGN KEY (level_id) REFERENCES levels(id)
);

-- Certificate recommendations per level
CREATE TABLE certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  level_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  provider VARCHAR(100),
  url VARCHAR(255),
  FOREIGN KEY (level_id) REFERENCES levels(id)
);

-- Resources per level (admin edits these)
CREATE TABLE resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  level_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  url VARCHAR(255) NOT NULL,
  type ENUM('video', 'article', 'course', 'tool') DEFAULT 'article',
  FOREIGN KEY (level_id) REFERENCES levels(id)
);

-- Career path chosen by user
CREATE TABLE career_paths (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  path_name VARCHAR(100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- QCM Questions
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_text TEXT NOT NULL,
  option_a VARCHAR(255),
  option_b VARCHAR(255),
  option_c VARCHAR(255),
  option_d VARCHAR(255),
  order_index INT DEFAULT 0
);

-- AI Recommendations
CREATE TABLE recommendations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  recommended_path VARCHAR(100),
  team VARCHAR(50),
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =====================
-- SEED DATA
-- =====================

INSERT INTO teams (name, slug, description) VALUES
('Blue Team', 'blue-team', 'Defensive cybersecurity — protect, detect, and respond to threats'),
('Red Team', 'red-team', 'Offensive cybersecurity — simulate attacks to find vulnerabilities');

INSERT INTO specialists (team_id, name, slug, description, avg_income) VALUES
(1, 'SOC Analyst', 'soc-analyst', 'Monitor and analyze security events to detect and respond to threats in real-time.', '$55,000 - $90,000/year'),
(1, 'DFIR Analyst', 'dfir-analyst', 'Investigate security incidents and perform digital forensics to understand breaches.', '$70,000 - $110,000/year'),
(1, 'Threat Intelligence Analyst', 'threat-intel', 'Gather and analyze threat data to predict and prevent cyber attacks.', '$75,000 - $115,000/year'),
(2, 'Penetration Tester', 'pentest', 'Simulate cyberattacks to identify vulnerabilities before malicious hackers can exploit them.', '$80,000 - $130,000/year'),
(2, 'OSINT Analyst', 'osint', 'Collect and analyze publicly available information to support investigations and threat hunting.', '$60,000 - $95,000/year'),
(2, 'Malware Analyst', 'malware-analyst', 'Analyze malicious software to understand its behavior, origin, and impact.', '$75,000 - $120,000/year');

-- Levels for Penetration Tester
INSERT INTO levels (specialist_id, name, order_index) VALUES
(4, 'Beginner', 1),
(4, 'Intermediate', 2),
(4, 'Advanced', 3),
(4, 'Expert', 4);

-- Levels for SOC Analyst
INSERT INTO levels (specialist_id, name, order_index) VALUES
(1, 'Beginner', 1),
(1, 'Intermediate', 2),
(1, 'Advanced', 3),
(1, 'Expert', 4);

-- Levels for DFIR Analyst
INSERT INTO levels (specialist_id, name, order_index) VALUES
(2, 'Beginner', 1),
(2, 'Intermediate', 2),
(2, 'Advanced', 3),
(2, 'Expert', 4);

-- Levels for Threat Intelligence Analyst
INSERT INTO levels (specialist_id, name, order_index) VALUES
(3, 'Beginner', 1),
(3, 'Intermediate', 2),
(3, 'Advanced', 3),
(3, 'Expert', 4);

-- Levels for OSINT Analyst
INSERT INTO levels (specialist_id, name, order_index) VALUES
(5, 'Beginner', 1),
(5, 'Intermediate', 2),
(5, 'Advanced', 3),
(5, 'Expert', 4);

-- Levels for Malware Analyst
INSERT INTO levels (specialist_id, name, order_index) VALUES
(6, 'Beginner', 1),
(6, 'Intermediate', 2),
(6, 'Advanced', 3),
(6, 'Expert', 4);

-- Projects for Penetration Tester (level_id 1-4)
INSERT INTO projects (level_id, title, description) VALUES
(1, 'Set up a home lab with Kali Linux', 'Install Kali Linux in VirtualBox or VMware and explore the tools available.'),
(1, 'Practice on TryHackMe beginner rooms', 'Complete beginner-friendly rooms on TryHackMe to learn basic concepts.'),
(1, 'Build a simple port scanner in Python', 'Write a basic port scanner using Python socket library.'),
(2, 'Complete HackTheBox easy machines', 'Root at least 5 easy machines on HackTheBox platform.'),
(2, 'Perform network recon on a lab environment', 'Use Nmap and Wireshark to map out a virtual network.'),
(2, 'Write a vulnerability assessment report', 'Document findings from a simulated pentest in professional format.'),
(3, 'Participate in CTF competitions', 'Join CTF events on CTFtime.org and solve challenges.'),
(3, 'Perform a full pentest on a mock company', 'Use a vulnerable VM like VulnHub to simulate a real engagement.'),
(3, 'Contribute to a bug bounty program', 'Sign up on HackerOne or Bugcrowd and find real vulnerabilities.'),
(4, 'Develop a custom exploitation tool', 'Build a tool that automates a specific attack technique.'),
(4, 'Lead a red team engagement simulation', 'Plan and execute a full red team operation on a lab environment.'),
(4, 'Publish a CVE or security research', 'Responsibly disclose a vulnerability and get it published.');

-- Certificates for Penetration Tester (level_id 1-4)
INSERT INTO certificates (level_id, name, provider, url) VALUES
(1, 'CompTIA Security+', 'CompTIA', 'https://www.comptia.org/certifications/security'),
(1, 'eJPT (Junior Penetration Tester)', 'eLearnSecurity', 'https://elearnsecurity.com/product/ejpt-certification/'),
(2, 'CEH (Certified Ethical Hacker)', 'EC-Council', 'https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/'),
(2, 'CompTIA PenTest+', 'CompTIA', 'https://www.comptia.org/certifications/pentest'),
(3, 'OSCP (Offensive Security Certified Professional)', 'Offensive Security', 'https://www.offensive-security.com/pwk-oscp/'),
(3, 'PNPT (Practical Network Penetration Tester)', 'TCM Security', 'https://certifications.tcm-sec.com/pnpt/'),
(4, 'OSWE (Offensive Security Web Expert)', 'Offensive Security', 'https://www.offensive-security.com/awae-oswe/'),
(4, 'CRTE (Certified Red Team Expert)', 'Pentester Academy', 'https://www.pentesteracademy.com/redteamlab');

-- Resources for Penetration Tester (level_id 1-4)
INSERT INTO resources (level_id, title, url, type) VALUES
(1, 'TryHackMe - Complete Beginner Path', 'https://tryhackme.com/path/outline/beginner', 'course'),
(1, 'NetworkChuck - Ethical Hacking for Beginners', 'https://www.youtube.com/c/NetworkChuck', 'video'),
(1, 'The Web Application Hacker Handbook', 'https://www.amazon.com/Web-Application-Hackers-Handbook/dp/1118026470', 'article'),
(2, 'HackTheBox Academy', 'https://academy.hackthebox.com', 'course'),
(2, 'PortSwigger Web Security Academy', 'https://portswigger.net/web-security', 'course'),
(3, 'Offensive Security PWK Course', 'https://www.offensive-security.com/pwk-oscp/', 'course'),
(3, 'VulnHub Practice Machines', 'https://www.vulnhub.com', 'tool'),
(4, 'Sektor7 Malware Development', 'https://institute.sektor7.net', 'course'),
(4, 'Red Team Development and Operations', 'https://redteam.guide', 'article');

-- QCM Questions
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, order_index) VALUES
('What activity excites you the most in cybersecurity?', 'Investigating how an attack happened after it occurred', 'Finding and exploiting vulnerabilities before attackers do', 'Monitoring systems and alerts in real-time 24/7', 'Gathering intelligence from public sources about threat actors', 1),
('How do you prefer to solve problems?', 'Digging deep into logs and evidence like a detective', 'Breaking things to understand how they work', 'Building systems that detect and block threats automatically', 'Researching and connecting information from many sources', 2),
('Which environment do you prefer working in?', 'Incident response — fast-paced, high-stakes situations', 'Offensive labs — simulating attacks in controlled environments', 'Security operations center — continuous monitoring shifts', 'Open-source research — finding hidden information online', 3),
('What tools are you most interested in learning?', 'Volatility, Autopsy, FTK — forensics tools', 'Metasploit, Burp Suite, Nmap — attack tools', 'Splunk, ELK Stack, IBM QRadar — SIEM tools', 'Maltego, Shodan, Recon-ng — OSINT tools', 4),
('What outcome gives you the most satisfaction?', 'Solving a complex forensic puzzle and finding the attacker', 'Successfully compromising a system during a pentest', 'Detecting and stopping a threat before it causes damage', 'Exposing a hidden threat actor through research', 5),
('How do you feel about coding and scripting?', 'I enjoy reverse engineering compiled code and malware', 'I like writing exploits and automation scripts', 'I prefer configuring tools over writing code', 'I use scripts mainly for automating data collection', 6),
('What cybersecurity domain interests you most?', 'Digital forensics and incident response', 'Offensive security and penetration testing', 'Security monitoring and threat detection', 'Intelligence gathering and threat hunting', 7);