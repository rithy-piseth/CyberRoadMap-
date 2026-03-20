-- =====================
-- ADD NEW SPECIALISTS
-- =====================

-- Blue Team additions
INSERT INTO specialists (team_id, name, slug, description, avg_income) VALUES
(1, 'Cloud Security Engineer', 'cloud-security', 'Secure cloud infrastructure and services across AWS, Azure, and GCP. Responsible for identity management, network security, and compliance in cloud environments.', '$90,000 - $140,000/year'),
(1, 'GRC Analyst', 'grc-analyst', 'Manage governance, risk, and compliance frameworks to ensure organizational security standards. Bridge between technical teams and business leadership.', '$65,000 - $100,000/year'),
(1, 'Vulnerability Management Analyst', 'vuln-management', 'Identify, assess, prioritize and remediate vulnerabilities across systems and applications before attackers can exploit them.', '$70,000 - $105,000/year'),
(1, 'Security Engineer', 'security-engineer', 'Design, build, and implement security systems and infrastructure. Create tools and automation to protect the organization at scale.', '$85,000 - $130,000/year'),
(1, 'Digital Forensics Analyst', 'digital-forensics', 'Collect, preserve, and analyze digital evidence from computers, mobile devices, and networks to support investigations and legal proceedings.', '$65,000 - $105,000/year');

-- Red Team additions
INSERT INTO specialists (team_id, name, slug, description, avg_income) VALUES
(2, 'Web Application Hacker', 'web-app-hacker', 'Find and exploit vulnerabilities in web applications including XSS, SQLi, SSRF, IDOR, and business logic flaws.', '$75,000 - $125,000/year'),
(2, 'Social Engineer', 'social-engineer', 'Simulate human-based attacks like phishing, vishing, and physical intrusion testing to evaluate human security defenses.', '$70,000 - $115,000/year'),
(2, 'Exploit Developer', 'exploit-developer', 'Research software vulnerabilities and develop reliable exploits for penetration testing and security research.', '$100,000 - $160,000/year'),
(2, 'Red Team Operator', 'red-team-operator', 'Plan and execute full-scope adversary simulations to test an organization total security posture across people, process, and technology.', '$95,000 - $150,000/year');

-- =====================
-- CHECK SPECIALIST IDs BEFORE ADDING LEVELS
-- Run: SELECT id, name FROM specialists ORDER BY id;
-- Expected: 1-SOC, 2-DFIR, 3-ThreatIntel, 4-Pentest, 5-OSINT, 6-Malware
--           7-Cloud, 8-GRC, 9-VulnMgmt, 10-SecEng, 11-DigForensics
--           12-WebApp, 13-SocialEng, 14-ExploitDev, 15-RedTeam
-- =====================

-- =====================
-- LEVELS FOR ALL SPECIALISTS
-- =====================

-- Existing specialists already have levels (1-6)
-- Add levels for new specialists (7-15)
INSERT INTO levels (specialist_id, name, order_index) VALUES
-- Cloud Security Engineer (7)
(7, 'Beginner', 1), (7, 'Intermediate', 2), (7, 'Advanced', 3), (7, 'Expert', 4),
-- GRC Analyst (8)
(8, 'Beginner', 1), (8, 'Intermediate', 2), (8, 'Advanced', 3), (8, 'Expert', 4),
-- Vulnerability Management (9)
(9, 'Beginner', 1), (9, 'Intermediate', 2), (9, 'Advanced', 3), (9, 'Expert', 4),
-- Security Engineer (10)
(10, 'Beginner', 1), (10, 'Intermediate', 2), (10, 'Advanced', 3), (10, 'Expert', 4),
-- Digital Forensics (11)
(11, 'Beginner', 1), (11, 'Intermediate', 2), (11, 'Advanced', 3), (11, 'Expert', 4),
-- Web App Hacker (12)
(12, 'Beginner', 1), (12, 'Intermediate', 2), (12, 'Advanced', 3), (12, 'Expert', 4),
-- Social Engineer (13)
(13, 'Beginner', 1), (13, 'Intermediate', 2), (13, 'Advanced', 3), (13, 'Expert', 4),
-- Exploit Developer (14)
(14, 'Beginner', 1), (14, 'Intermediate', 2), (14, 'Advanced', 3), (14, 'Expert', 4),
-- Red Team Operator (15)
(15, 'Beginner', 1), (15, 'Intermediate', 2), (15, 'Advanced', 3), (15, 'Expert', 4);

-- =====================
-- CHECK LEVEL IDs BEFORE ADDING CONTENT
-- Run: SELECT id, specialist_id, name FROM levels ORDER BY specialist_id, order_index;
-- Existing levels 1-24 are for specialists 1-6
-- New levels 25-60 are for specialists 7-15
-- =====================

-- =====================
-- PROJECTS FOR EXISTING SPECIALISTS (missing ones)
-- =====================

-- DFIR Analyst levels: specialist 2 = levels 9,10,11,12
INSERT INTO projects (level_id, title, description) VALUES
(9, 'Analyze a memory dump with Volatility', 'Download a sample memory dump and extract running processes, network connections, and artifacts.'),
(9, 'Practice disk imaging with Autopsy', 'Create a disk image of a USB drive and analyze it using Autopsy forensic tool.'),
(9, 'Complete DFIR.training beginner labs', 'Work through beginner digital forensics labs to learn core investigation techniques.'),
(10, 'Investigate a simulated ransomware incident', 'Use provided log files and disk images to trace how ransomware spread across a network.'),
(10, 'Build a forensic analysis report', 'Document findings from a practice investigation in professional format with timeline.'),
(10, 'Analyze network capture files with Wireshark', 'Examine PCAP files to identify malicious activity and data exfiltration.'),
(11, 'Conduct a full incident response simulation', 'Lead a simulated IR exercise from detection through containment and recovery.'),
(11, 'Reverse engineer a malware sample', 'Analyze a known malware sample in a sandbox to understand its behavior.'),
(12, 'Develop custom forensic scripts', 'Write Python scripts to automate evidence collection and analysis.'),
(12, 'Testify as expert witness in mock trial', 'Practice presenting forensic findings in a legal context.');

-- Threat Intelligence levels: specialist 3 = levels 13,14,15,16
INSERT INTO projects (level_id, title, description) VALUES
(13, 'Set up a threat intelligence feed', 'Subscribe to free threat intel feeds and ingest them into a MISP instance.'),
(13, 'Create your first threat actor profile', 'Research a known threat actor using public sources and document TTPs.'),
(14, 'Map threats to MITRE ATT&CK framework', 'Take a recent threat report and map all tactics and techniques to ATT&CK.'),
(14, 'Build an IOC database', 'Collect and organize indicators of compromise from multiple threat reports.'),
(15, 'Produce a threat intelligence report', 'Write a professional TI report about a current campaign targeting a specific industry.'),
(15, 'Develop a threat hunting hypothesis', 'Create and test a threat hunting hypothesis based on recent intelligence.'),
(16, 'Lead a threat intelligence program', 'Design and implement a full threat intelligence program for a simulated organization.'),
(16, 'Present at a security conference', 'Share original threat research with the security community.');

-- OSINT Analyst levels: specialist 5 = levels 17,18,19,20
INSERT INTO projects (level_id, title, description) VALUES
(17, 'Find information about yourself online', 'Use OSINT tools to discover what is publicly available about you.'),
(17, 'Complete beginner OSINT challenges', 'Work through TraceLabs or Gralhix beginner OSINT exercises.'),
(18, 'Build a target profile using Maltego', 'Use Maltego community edition to map relationships between entities.'),
(18, 'Use Shodan to find exposed devices', 'Search for misconfigured devices and exposed services in a specific region.'),
(19, 'Conduct a full OSINT investigation', 'Complete a real-world style investigation on a fictional target persona.'),
(19, 'Geolocate images using only visual clues', 'Practice geolocation by identifying exact locations from photographs.'),
(20, 'Develop an OSINT automation script', 'Write a Python tool that automates data collection from multiple public sources.'),
(20, 'Contribute to a missing persons OSINT search', 'Volunteer with TraceLabs CTF to help find missing persons using OSINT.');

-- Malware Analyst levels: specialist 6 = levels 21,22,23,24
INSERT INTO projects (level_id, title, description) VALUES
(21, 'Set up a malware analysis sandbox', 'Configure a safe isolated VM environment with tools like Cuckoo or Any.run.'),
(21, 'Analyze your first malware sample statically', 'Use strings, PEview, and FLOSS to extract information from a binary without running it.'),
(22, 'Perform dynamic analysis of a trojan', 'Execute malware in a sandbox and document its network behavior and file system changes.'),
(22, 'Unpack a simple packed malware', 'Use x64dbg to unpack a UPX-packed binary and analyze the original code.'),
(23, 'Reverse engineer a C2 protocol', 'Analyze malware communications to understand its command and control mechanism.'),
(23, 'Write YARA rules for detection', 'Create YARA signatures to detect a malware family based on unique characteristics.'),
(24, 'Analyze a rootkit sample', 'Examine advanced malware that hides its presence from the operating system.'),
(24, 'Publish a malware analysis report', 'Write and publish a professional analysis of a malware sample to the community.');

-- =====================
-- PROJECTS FOR NEW SPECIALISTS
-- =====================

-- Cloud Security Engineer levels 25,26,27,28
INSERT INTO projects (level_id, title, description) VALUES
(25, 'Set up AWS free tier account securely', 'Create an AWS account and configure MFA, billing alerts, and basic IAM policies.'),
(25, 'Complete AWS Cloud Practitioner prep', 'Study cloud fundamentals including shared responsibility model and core services.'),
(25, 'Audit an S3 bucket for misconfigurations', 'Use AWS CLI to identify publicly exposed S3 buckets and fix them.'),
(26, 'Implement IAM least privilege policies', 'Review and tighten IAM roles and policies in a test AWS environment.'),
(26, 'Set up CloudTrail and GuardDuty', 'Enable AWS security monitoring services and analyze alerts.'),
(26, 'Complete a cloud security CTF challenge', 'Participate in flaws.cloud or similar cloud-focused security challenges.'),
(27, 'Design a secure multi-account AWS architecture', 'Plan and implement AWS Organizations with security controls across accounts.'),
(27, 'Perform a cloud penetration test', 'Test a cloud environment for misconfigurations using tools like Pacu or ScoutSuite.'),
(28, 'Build a cloud security automation pipeline', 'Create automated compliance checks using AWS Config and Lambda.'),
(28, 'Lead a cloud incident response exercise', 'Simulate a cloud breach and lead the response using AWS investigation tools.');

-- GRC Analyst levels 29,30,31,32
INSERT INTO projects (level_id, title, description) VALUES
(29, 'Study ISO 27001 and NIST frameworks', 'Read and summarize the key controls from major security frameworks.'),
(29, 'Create a simple risk register', 'Identify and document 10 security risks for a fictional small company.'),
(30, 'Conduct a gap analysis against NIST CSF', 'Assess a simulated organization against the NIST Cybersecurity Framework.'),
(30, 'Write a security policy document', 'Draft an acceptable use policy and password policy for an organization.'),
(31, 'Lead an internal security audit', 'Plan and execute a mock internal audit using ISO 27001 controls.'),
(31, 'Build a vendor risk assessment process', 'Create a questionnaire and scoring system for third-party risk management.'),
(32, 'Design a full GRC program', 'Develop a comprehensive governance, risk, and compliance framework for an organization.'),
(32, 'Prepare for a regulatory compliance audit', 'Simulate preparation for PCI-DSS or HIPAA compliance review.');

-- Vulnerability Management levels 33,34,35,36
INSERT INTO projects (level_id, title, description) VALUES
(33, 'Run your first Nessus scan', 'Set up Nessus Essentials free and scan a lab network for vulnerabilities.'),
(33, 'Learn CVSS scoring', 'Practice calculating CVSS scores for 10 different vulnerabilities.'),
(34, 'Build a vulnerability tracking spreadsheet', 'Create a system to track, prioritize, and remediate vulnerabilities.'),
(34, 'Scan a web application with OpenVAS', 'Run an OpenVAS scan and document all findings with severity ratings.'),
(35, 'Implement a vulnerability management program', 'Design a full VM program including scanning schedule and remediation SLAs.'),
(35, 'Integrate vulnerability data with SIEM', 'Feed Nessus scan results into Splunk and create dashboards.'),
(36, 'Build automated vulnerability reporting', 'Create scripts to automatically generate executive vulnerability reports.'),
(36, 'Lead a patch management campaign', 'Coordinate remediation of critical vulnerabilities across a simulated enterprise.');

-- Security Engineer levels 37,38,39,40
INSERT INTO projects (level_id, title, description) VALUES
(37, 'Set up a home firewall with pfSense', 'Install and configure pfSense to learn network security fundamentals.'),
(37, 'Deploy a WAF for a test web application', 'Set up ModSecurity or Cloudflare WAF and test its effectiveness.'),
(38, 'Build a security monitoring stack', 'Deploy ELK Stack with security dashboards for log analysis.'),
(38, 'Implement network segmentation in a lab', 'Design and implement VLANs and firewall rules to segment a test network.'),
(39, 'Automate security controls with Python', 'Write scripts to automate firewall rule management and log analysis.'),
(39, 'Build a honeypot and analyze attacks', 'Deploy a honeypot and study real-world attack patterns.'),
(40, 'Design zero-trust network architecture', 'Plan and partially implement a zero-trust security model for an organization.'),
(40, 'Lead a security infrastructure migration', 'Plan migration of legacy security tools to modern cloud-native solutions.');

-- Digital Forensics levels 41,42,43,44
INSERT INTO projects (level_id, title, description) VALUES
(41, 'Analyze a sample disk image with Autopsy', 'Download a practice forensic image and identify deleted files and artifacts.'),
(41, 'Extract metadata from files', 'Use ExifTool to extract and analyze metadata from images and documents.'),
(41, 'Complete a beginner forensics CTF', 'Participate in a forensics-focused CTF to practice evidence analysis.'),
(42, 'Perform mobile device forensics', 'Use open-source tools to extract and analyze data from an Android device image.'),
(42, 'Analyze browser forensics artifacts', 'Examine browser history, cache, and cookies from a disk image.'),
(43, 'Investigate a simulated data breach', 'Use disk images and logs to reconstruct how a breach occurred.'),
(43, 'Perform memory forensics', 'Extract running processes, network connections, and credentials from a memory dump.'),
(44, 'Testify as expert witness in mock court', 'Present forensic findings professionally in a simulated legal setting.'),
(44, 'Develop a forensic investigation framework', 'Create standardized procedures for digital evidence collection and analysis.');

-- Web App Hacker levels 45,46,47,48
INSERT INTO projects (level_id, title, description) VALUES
(45, 'Complete PortSwigger Web Security Academy', 'Work through beginner labs covering SQL injection, XSS, and authentication flaws.'),
(45, 'Set up Burp Suite Community Edition', 'Configure Burp Suite proxy and intercept your first web requests.'),
(46, 'Complete OWASP Top 10 labs', 'Practice exploiting each of the OWASP Top 10 vulnerabilities in a lab environment.'),
(46, 'Hack DVWA (Damn Vulnerable Web App)', 'Complete all challenges on DVWA at low and medium security levels.'),
(47, 'Find a bug bounty vulnerability', 'Submit a valid security finding to HackerOne or Bugcrowd.'),
(47, 'Complete advanced PortSwigger labs', 'Solve advanced labs covering SSRF, XXE, deserialization, and prototype pollution.'),
(48, 'Build a web application testing methodology', 'Document your personal systematic approach to web app pentesting.'),
(48, 'Mentor junior web app testers', 'Share knowledge through writeups, talks, or teaching others.');

-- Social Engineer levels 49,50,51,52
INSERT INTO projects (level_id, title, description) VALUES
(49, 'Study social engineering psychology', 'Read Influence by Cialdini and document key principles used in attacks.'),
(49, 'Create a phishing awareness presentation', 'Build training material to teach non-technical users to spot phishing.'),
(50, 'Run a simulated phishing campaign with GoPhish', 'Set up GoPhish and run a controlled phishing simulation on yourself.'),
(50, 'Practice vishing scenarios', 'Role-play phone-based social engineering scenarios to build confidence.'),
(51, 'Plan and execute a physical intrusion test', 'Attempt to access a restricted area using social engineering with permission.'),
(51, 'Build pretexting scenarios', 'Create convincing cover stories and test them in controlled environments.'),
(52, 'Design a full social engineering assessment', 'Plan and execute a comprehensive human-based attack simulation.'),
(52, 'Develop security awareness training program', 'Build a complete employee security awareness curriculum.');

-- Exploit Developer levels 53,54,55,56
INSERT INTO projects (level_id, title, description) VALUES
(53, 'Learn x86 assembly basics', 'Write simple assembly programs to understand low-level code execution.'),
(53, 'Practice buffer overflow on vulnerable apps', 'Exploit a simple buffer overflow vulnerability in a controlled lab.'),
(54, 'Exploit a real CVE in a lab environment', 'Download a vulnerable version of software and exploit a known CVE.'),
(54, 'Write shellcode from scratch', 'Develop custom shellcode for a specific target architecture.'),
(55, 'Bypass modern exploit mitigations', 'Defeat ASLR, DEP, and stack canaries using advanced techniques.'),
(55, 'Contribute an exploit to Metasploit', 'Write and submit a working Metasploit module for a known vulnerability.'),
(56, 'Discover a zero-day vulnerability', 'Use fuzzing and code auditing to find an undisclosed vulnerability.'),
(56, 'Responsibly disclose a CVE', 'Follow responsible disclosure process and get a CVE assigned.');

-- Red Team Operator levels 57,58,59,60
INSERT INTO projects (level_id, title, description) VALUES
(57, 'Study red team frameworks and methodology', 'Learn TIBER-EU, CBEST, and PTES red team methodologies.'),
(57, 'Complete a purple team exercise', 'Work with a blue team to test detection capabilities collaboratively.'),
(58, 'Deploy and use a C2 framework', 'Set up Cobalt Strike trial or Havoc C2 and practice basic operations.'),
(58, 'Simulate an APT attack chain', 'Replicate a known APT attack pattern in a lab from initial access to exfiltration.'),
(59, 'Lead a full red team engagement', 'Plan and execute a complete adversary simulation with defined objectives.'),
(59, 'Develop custom implants and tooling', 'Build custom red team tools to evade detection during operations.'),
(60, 'Design an adversary simulation program', 'Create a repeatable red team program for continuous security testing.'),
(60, 'Train and mentor red team members', 'Lead knowledge transfer sessions and develop junior operators.');

-- =====================
-- CERTIFICATES FOR EXISTING SPECIALISTS
-- =====================

-- DFIR levels 9,10,11,12
INSERT INTO certificates (level_id, name, provider, url) VALUES
(9, 'CompTIA Security+', 'CompTIA', 'https://www.comptia.org/certifications/security'),
(9, 'Google Cybersecurity Certificate', 'Google', 'https://grow.google/certificates/cybersecurity/'),
(10, 'GCFE (GIAC Certified Forensic Examiner)', 'GIAC', 'https://www.giac.org/certifications/certified-forensic-examiner-gcfe/'),
(10, 'EnCase Certified Examiner (EnCE)', 'OpenText', 'https://www.opentext.com/products/encase-forensic'),
(11, 'GCFA (GIAC Certified Forensic Analyst)', 'GIAC', 'https://www.giac.org/certifications/certified-forensic-analyst-gcfa/'),
(11, 'CHFI (Computer Hacking Forensic Investigator)', 'EC-Council', 'https://www.eccouncil.org/train-certify/computer-hacking-forensic-investigator-chfi/'),
(12, 'GASF (GIAC Advanced Smartphone Forensics)', 'GIAC', 'https://www.giac.org/certifications/advanced-smartphone-forensics-gasf/'),
(12, 'GREM (GIAC Reverse Engineering Malware)', 'GIAC', 'https://www.giac.org/certifications/reverse-engineering-malware-grem/');

-- Threat Intelligence levels 13,14,15,16
INSERT INTO certificates (level_id, name, provider, url) VALUES
(13, 'CompTIA Security+', 'CompTIA', 'https://www.comptia.org/certifications/security'),
(13, 'MISP Fundamentals', 'CIRCL', 'https://www.misp-project.org/'),
(14, 'CTIA (Certified Threat Intelligence Analyst)', 'EC-Council', 'https://www.eccouncil.org/train-certify/certified-threat-intelligence-analyst-ctia/'),
(14, 'GCTI (GIAC Cyber Threat Intelligence)', 'GIAC', 'https://www.giac.org/certifications/cyber-threat-intelligence-gcti/'),
(15, 'CRTIA (Certified Red Team Intelligence Analyst)', 'Mile2', 'https://mile2.com/'),
(16, 'SANS FOR578 Cyber Threat Intelligence', 'SANS', 'https://www.sans.org/cyber-security-courses/cyber-threat-intelligence/');

-- OSINT levels 17,18,19,20
INSERT INTO certificates (level_id, name, provider, url) VALUES
(17, 'Google IT Support Certificate', 'Google', 'https://grow.google/certificates/it-support/'),
(18, 'OSINT Fundamentals Certificate', 'TCM Security', 'https://certifications.tcm-sec.com/'),
(19, 'COSI (Certified OSINT Investigator)', 'OSMOSIS', 'https://www.osmosisinstituteoflearning.com/'),
(20, 'GOSI (GIAC Open Source Intelligence)', 'GIAC', 'https://www.giac.org/');

-- Malware Analyst levels 21,22,23,24
INSERT INTO certificates (level_id, name, provider, url) VALUES
(21, 'CompTIA Security+', 'CompTIA', 'https://www.comptia.org/certifications/security'),
(22, 'GREM (GIAC Reverse Engineering Malware)', 'GIAC', 'https://www.giac.org/certifications/reverse-engineering-malware-grem/'),
(23, 'GCIH (GIAC Certified Incident Handler)', 'GIAC', 'https://www.giac.org/certifications/certified-incident-handler-gcih/'),
(24, 'SANS FOR610 Malware Analysis', 'SANS', 'https://www.sans.org/cyber-security-courses/reverse-engineering-malware-malware-analysis-tools-techniques/');

-- =====================
-- CERTIFICATES FOR NEW SPECIALISTS
-- =====================

-- Cloud Security levels 25,26,27,28
INSERT INTO certificates (level_id, name, provider, url) VALUES
(25, 'AWS Cloud Practitioner', 'Amazon', 'https://aws.amazon.com/certification/certified-cloud-practitioner/'),
(25, 'Google Cloud Digital Leader', 'Google', 'https://cloud.google.com/certification/cloud-digital-leader'),
(26, 'AWS Solutions Architect Associate', 'Amazon', 'https://aws.amazon.com/certification/certified-solutions-architect-associate/'),
(26, 'CompTIA Cloud+', 'CompTIA', 'https://www.comptia.org/certifications/cloud'),
(27, 'AWS Security Specialty', 'Amazon', 'https://aws.amazon.com/certification/certified-security-specialty/'),
(27, 'CCSP (Certified Cloud Security Professional)', 'ISC2', 'https://www.isc2.org/Certifications/CCSP'),
(28, 'SANS SEC488 Cloud Security Essentials', 'SANS', 'https://www.sans.org/cyber-security-courses/cloud-security-essentials/'),
(28, 'Google Professional Cloud Security Engineer', 'Google', 'https://cloud.google.com/certification/cloud-security-engineer');

-- GRC levels 29,30,31,32
INSERT INTO certificates (level_id, name, provider, url) VALUES
(29, 'CompTIA Security+', 'CompTIA', 'https://www.comptia.org/certifications/security'),
(29, 'ISO 27001 Foundation', 'PECB', 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001'),
(30, 'CISM (Certified Information Security Manager)', 'ISACA', 'https://www.isaca.org/credentialing/cism'),
(30, 'CompTIA CySA+', 'CompTIA', 'https://www.comptia.org/certifications/cybersecurity-analyst'),
(31, 'CRISC (Certified in Risk and Info Systems Control)', 'ISACA', 'https://www.isaca.org/credentialing/crisc'),
(31, 'ISO 27001 Lead Implementer', 'PECB', 'https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001'),
(32, 'CISSP (Certified Information Systems Security Pro)', 'ISC2', 'https://www.isc2.org/Certifications/CISSP'),
(32, 'CISA (Certified Information Systems Auditor)', 'ISACA', 'https://www.isaca.org/credentialing/cisa');

-- Vulnerability Management levels 33,34,35,36
INSERT INTO certificates (level_id, name, provider, url) VALUES
(33, 'CompTIA Security+', 'CompTIA', 'https://www.comptia.org/certifications/security'),
(33, 'Tenable Nessus Fundamentals', 'Tenable', 'https://www.tenable.com/education'),
(34, 'CompTIA PenTest+', 'CompTIA', 'https://www.comptia.org/certifications/pentest'),
(34, 'Qualys Vulnerability Management', 'Qualys', 'https://www.qualys.com/training/'),
(35, 'GEVA (GIAC Enterprise Vulnerability Assessor)', 'GIAC', 'https://www.giac.org/'),
(35, 'Certified Vulnerability Assessor (CVA)', 'Mile2', 'https://mile2.com/'),
(36, 'CISSP', 'ISC2', 'https://www.isc2.org/Certifications/CISSP'),
(36, 'CISM', 'ISACA', 'https://www.isaca.org/credentialing/cism');

-- Security Engineer levels 37,38,39,40
INSERT INTO certificates (level_id, name, provider, url) VALUES
(37, 'CompTIA Network+', 'CompTIA', 'https://www.comptia.org/certifications/network'),
(37, 'CompTIA Security+', 'CompTIA', 'https://www.comptia.org/certifications/security'),
(38, 'Cisco CCNA Security', 'Cisco', 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html'),
(38, 'CompTIA CySA+', 'CompTIA', 'https://www.comptia.org/certifications/cybersecurity-analyst'),
(39, 'GSEC (GIAC Security Essentials)', 'GIAC', 'https://www.giac.org/certifications/security-essentials-gsec/'),
(39, 'Certified Network Defender (CND)', 'EC-Council', 'https://www.eccouncil.org/train-certify/certified-network-defender-cnd/'),
(40, 'CISSP', 'ISC2', 'https://www.isc2.org/Certifications/CISSP'),
(40, 'SANS SEC530 Defensible Security Architecture', 'SANS', 'https://www.sans.org/cyber-security-courses/defensible-security-architecture-and-engineering/');

-- Digital Forensics levels 41,42,43,44
INSERT INTO certificates (level_id, name, provider, url) VALUES
(41, 'CompTIA Security+', 'CompTIA', 'https://www.comptia.org/certifications/security'),
(41, 'AccessData Certified Examiner (ACE)', 'Exterro', 'https://www.exterro.com/forensic-toolkit'),
(42, 'GCFE (GIAC Certified Forensic Examiner)', 'GIAC', 'https://www.giac.org/certifications/certified-forensic-examiner-gcfe/'),
(42, 'EnCase Certified Examiner (EnCE)', 'OpenText', 'https://www.opentext.com/'),
(43, 'GCFA (GIAC Certified Forensic Analyst)', 'GIAC', 'https://www.giac.org/certifications/certified-forensic-analyst-gcfa/'),
(43, 'CHFI (Computer Hacking Forensic Investigator)', 'EC-Council', 'https://www.eccouncil.org/train-certify/computer-hacking-forensic-investigator-chfi/'),
(44, 'GASF (GIAC Advanced Smartphone Forensics)', 'GIAC', 'https://www.giac.org/certifications/advanced-smartphone-forensics-gasf/'),
(44, 'SANS FOR508 Advanced Incident Response', 'SANS', 'https://www.sans.org/cyber-security-courses/advanced-incident-response-threat-hunting-training/');

-- Web App Hacker levels 45,46,47,48
INSERT INTO certificates (level_id, name, provider, url) VALUES
(45, 'CompTIA Security+', 'CompTIA', 'https://www.comptia.org/certifications/security'),
(45, 'eWPT (Web Application Penetration Tester)', 'eLearnSecurity', 'https://elearnsecurity.com/product/ewpt-certification/'),
(46, 'CEH (Certified Ethical Hacker)', 'EC-Council', 'https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/'),
(46, 'BSCP (Burp Suite Certified Practitioner)', 'PortSwigger', 'https://portswigger.net/web-security/certification'),
(47, 'OSWE (Offensive Security Web Expert)', 'Offensive Security', 'https://www.offensive-security.com/awae-oswe/'),
(47, 'eWPTX (Web App Pentester eXtreme)', 'eLearnSecurity', 'https://elearnsecurity.com/'),
(48, 'OSCP', 'Offensive Security', 'https://www.offensive-security.com/pwk-oscp/'),
(48, 'SANS SEC542 Web App Penetration Testing', 'SANS', 'https://www.sans.org/cyber-security-courses/web-app-penetration-testing-ethical-hacking/');

-- Social Engineer levels 49,50,51,52
INSERT INTO certificates (level_id, name, provider, url) VALUES
(49, 'CompTIA Security+', 'CompTIA', 'https://www.comptia.org/certifications/security'),
(50, 'CEH (Certified Ethical Hacker)', 'EC-Council', 'https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/'),
(51, 'CPENT (Certified Penetration Testing Professional)', 'EC-Council', 'https://www.eccouncil.org/train-certify/cpent/'),
(51, 'SEPP (Social Engineering Penetration Testing Pro)', 'Social-Engineer LLC', 'https://www.social-engineer.com/'),
(52, 'OSCP', 'Offensive Security', 'https://www.offensive-security.com/pwk-oscp/'),
(52, 'SANS SEC467 Social Engineering', 'SANS', 'https://www.sans.org/cyber-security-courses/social-engineering-for-penetration-testers/');

-- Exploit Developer levels 53,54,55,56
INSERT INTO certificates (level_id, name, provider, url) VALUES
(53, 'CompTIA Security+', 'CompTIA', 'https://www.comptia.org/certifications/security'),
(54, 'OSCE3 (Offensive Security Expert)', 'Offensive Security', 'https://www.offensive-security.com/'),
(54, 'GXPN (GIAC Exploit Researcher and Advanced Pen Tester)', 'GIAC', 'https://www.giac.org/certifications/exploit-researcher-advanced-penetration-tester-gxpn/'),
(55, 'OSCP', 'Offensive Security', 'https://www.offensive-security.com/pwk-oscp/'),
(55, 'OSED (Offensive Security Exploit Developer)', 'Offensive Security', 'https://www.offensive-security.com/exp301-osed/'),
(56, 'SANS SEC660 Advanced Exploit Development', 'SANS', 'https://www.sans.org/cyber-security-courses/advanced-exploit-development-penetration-testers/'),
(56, 'OSEE (Offensive Security Exploitation Expert)', 'Offensive Security', 'https://www.offensive-security.com/awe-osee/');

-- Red Team Operator levels 57,58,59,60
INSERT INTO certificates (level_id, name, provider, url) VALUES
(57, 'CRTO (Certified Red Team Operator)', 'Zero-Point Security', 'https://www.zeropointsecurity.co.uk/red-team-ops'),
(57, 'PNPT (Practical Network Penetration Tester)', 'TCM Security', 'https://certifications.tcm-sec.com/pnpt/'),
(58, 'OSCP', 'Offensive Security', 'https://www.offensive-security.com/pwk-oscp/'),
(58, 'CRTE (Certified Red Team Expert)', 'Pentester Academy', 'https://www.pentesteracademy.com/redteamlab'),
(59, 'OSEP (Offensive Security Experienced Penetration Tester)', 'Offensive Security', 'https://www.offensive-security.com/pen300-osep/'),
(59, 'CRTO II (Advanced Red Team Ops)', 'Zero-Point Security', 'https://www.zeropointsecurity.co.uk/'),
(60, 'OSEE (Offensive Security Exploitation Expert)', 'Offensive Security', 'https://www.offensive-security.com/awe-osee/'),
(60, 'SANS SEC565 Red Team Operations', 'SANS', 'https://www.sans.org/cyber-security-courses/red-team-operations-adversary-emulation/');

-- =====================
-- RESOURCES FOR EXISTING SPECIALISTS
-- =====================

-- DFIR levels 9,10,11,12
INSERT INTO resources (level_id, title, url, type) VALUES
(9, 'Blue Team Labs Online - DFIR Path', 'https://blueteamlabs.online', 'course'),
(9, 'Autopsy Forensic Tool', 'https://www.autopsy.com/', 'tool'),
(9, 'DFIR.training Resources', 'https://www.dfir.training/', 'article'),
(10, 'Volatility Memory Forensics Framework', 'https://volatilityfoundation.org/', 'tool'),
(10, 'SANS DFIR Posters and Cheat Sheets', 'https://www.sans.org/blog/the-ultimate-list-of-sans-cheat-sheets/', 'article'),
(11, 'SANS FOR508 Course Materials', 'https://www.sans.org/cyber-security-courses/advanced-incident-response-threat-hunting-training/', 'course'),
(11, 'Velociraptor Incident Response Tool', 'https://www.velocidex.com/', 'tool'),
(12, 'DFRWS Research Papers', 'https://dfrws.org/presentations/', 'article'),
(12, 'Eric Zimmerman Forensic Tools', 'https://ericzimmerman.github.io/', 'tool');

-- Threat Intelligence levels 13,14,15,16
INSERT INTO resources (level_id, title, url, type) VALUES
(13, 'MISP Threat Sharing Platform', 'https://www.misp-project.org/', 'tool'),
(13, 'CISA Threat Intelligence Resources', 'https://www.cisa.gov/topics/cyber-threats-and-advisories', 'article'),
(14, 'MITRE ATT&CK Framework', 'https://attack.mitre.org/', 'tool'),
(14, 'Recorded Future Threat Intel Blog', 'https://www.recordedfuture.com/blog', 'article'),
(15, 'SANS FOR578 Cyber Threat Intelligence', 'https://www.sans.org/cyber-security-courses/cyber-threat-intelligence/', 'course'),
(15, 'OpenCTI Platform', 'https://www.opencti.io/', 'tool'),
(16, 'Intelligence-Driven Incident Response Book', 'https://www.oreilly.com/library/view/intelligence-driven-incident-response/9781491935187/', 'article'),
(16, 'FIRST.org CTI Resources', 'https://www.first.org/global/sigs/cti/', 'article');

-- OSINT levels 17,18,19,20
INSERT INTO resources (level_id, title, url, type) VALUES
(17, 'OSINT Framework', 'https://osintframework.com/', 'tool'),
(17, 'Bellingcat OSINT Guides', 'https://www.bellingcat.com/category/resources/', 'article'),
(18, 'Maltego Community Edition', 'https://www.maltego.com/downloads/', 'tool'),
(18, 'Shodan Search Engine', 'https://www.shodan.io/', 'tool'),
(19, 'TraceLabs OSINT Challenges', 'https://www.tracelabs.org/', 'course'),
(19, 'IntelTechniques OSINT Tools', 'https://inteltechniques.com/tools/', 'tool'),
(20, 'OSINT Combine Tools Collection', 'https://www.osintcombine.com/tools', 'tool'),
(20, 'Gralhix OSINT Exercises', 'https://gralhix.com/list-of-osint-exercises/', 'course');

-- Malware Analyst levels 21,22,23,24
INSERT INTO resources (level_id, title, url, type) VALUES
(21, 'Any.run Interactive Sandbox', 'https://any.run/', 'tool'),
(21, 'MalwareBazaar Sample Repository', 'https://bazaar.abuse.ch/', 'tool'),
(22, 'x64dbg Debugger', 'https://x64dbg.com/', 'tool'),
(22, 'Practical Malware Analysis Book', 'https://nostarch.com/malware', 'article'),
(23, 'Flare-VM Malware Analysis Environment', 'https://github.com/mandiant/flare-vm', 'tool'),
(23, 'YARA Rules Documentation', 'https://yara.readthedocs.io/', 'article'),
(24, 'SANS FOR610 Malware Analysis Course', 'https://www.sans.org/cyber-security-courses/reverse-engineering-malware-malware-analysis-tools-techniques/', 'course'),
(24, 'Ghidra Reverse Engineering Tool', 'https://ghidra-sre.org/', 'tool');

-- =====================
-- RESOURCES FOR NEW SPECIALISTS
-- =====================

-- Cloud Security levels 25,26,27,28
INSERT INTO resources (level_id, title, url, type) VALUES
(25, 'AWS Free Tier', 'https://aws.amazon.com/free/', 'tool'),
(25, 'flaws.cloud AWS Security Challenge', 'http://flaws.cloud/', 'course'),
(25, 'Cloud Security Alliance Resources', 'https://cloudsecurityalliance.org/research/', 'article'),
(26, 'Pacu AWS Exploitation Framework', 'https://github.com/RhinoSecurityLabs/pacu', 'tool'),
(26, 'ScoutSuite Cloud Auditing Tool', 'https://github.com/nccgroup/ScoutSuite', 'tool'),
(26, 'AWS Security Best Practices', 'https://docs.aws.amazon.com/security/', 'article'),
(27, 'CloudGoat Vulnerable AWS Environment', 'https://github.com/RhinoSecurityLabs/cloudgoat', 'tool'),
(27, 'GCP Goat Vulnerable GCP Environment', 'https://gcpgoat.joshuajebaraj.com/', 'tool'),
(28, 'SANS SEC488 Cloud Security Course', 'https://www.sans.org/cyber-security-courses/cloud-security-essentials/', 'course'),
(28, 'AWS Security Reference Architecture', 'https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/welcome.html', 'article');

-- GRC levels 29,30,31,32
INSERT INTO resources (level_id, title, url, type) VALUES
(29, 'NIST Cybersecurity Framework', 'https://www.nist.gov/cyberframework', 'article'),
(29, 'ISO 27001 Overview', 'https://www.iso.org/isoiec-27001-information-security.html', 'article'),
(30, 'ISACA GRC Resources', 'https://www.isaca.org/resources', 'article'),
(30, 'CISA Cybersecurity Resources', 'https://www.cisa.gov/resources-tools/resources', 'article'),
(31, 'NIST SP 800-53 Controls', 'https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final', 'article'),
(31, 'SANS Security Policy Templates', 'https://www.sans.org/information-security-policy/', 'tool'),
(32, 'COBIT Framework', 'https://www.isaca.org/resources/cobit', 'article'),
(32, 'RSA Archer GRC Platform', 'https://www.archerirm.com/', 'tool');

-- Vulnerability Management levels 33,34,35,36
INSERT INTO resources (level_id, title, url, type) VALUES
(33, 'Nessus Essentials Free Scanner', 'https://www.tenable.com/products/nessus/nessus-essentials', 'tool'),
(33, 'NVD National Vulnerability Database', 'https://nvd.nist.gov/', 'tool'),
(34, 'OpenVAS Vulnerability Scanner', 'https://www.openvas.org/', 'tool'),
(34, 'CVE Details Database', 'https://www.cvedetails.com/', 'tool'),
(35, 'Qualys VM Platform', 'https://www.qualys.com/apps/vulnerability-management/', 'tool'),
(35, 'Rapid7 InsightVM', 'https://www.rapid7.com/products/insightvm/', 'tool'),
(36, 'SANS Vulnerability Management Course', 'https://www.sans.org/cyber-security-courses/enterprise-vulnerability-management/', 'course'),
(36, 'CVSS Calculator', 'https://www.first.org/cvss/calculator/3.1', 'tool');

-- Security Engineer levels 37,38,39,40
INSERT INTO resources (level_id, title, url, type) VALUES
(37, 'pfSense Documentation', 'https://docs.netgate.com/pfsense/en/latest/', 'article'),
(37, 'TryHackMe Security Engineer Path', 'https://tryhackme.com/path/outline/security-engineer-training', 'course'),
(38, 'Elastic SIEM Documentation', 'https://www.elastic.co/security', 'article'),
(38, 'Snort IDS/IPS Tool', 'https://www.snort.org/', 'tool'),
(39, 'SANS SEC501 Advanced Security Essentials', 'https://www.sans.org/cyber-security-courses/advanced-security-essentials-enterprise-defender/', 'course'),
(39, 'Security Onion Network Monitor', 'https://securityonionsolutions.com/', 'tool'),
(40, 'Zero Trust Architecture NIST Guide', 'https://www.nist.gov/publications/zero-trust-architecture', 'article'),
(40, 'SANS SEC530 Defensible Architecture', 'https://www.sans.org/cyber-security-courses/defensible-security-architecture-and-engineering/', 'course');

-- Digital Forensics levels 41,42,43,44
INSERT INTO resources (level_id, title, url, type) VALUES
(41, 'Autopsy Digital Forensics Platform', 'https://www.autopsy.com/', 'tool'),
(41, 'ExifTool Metadata Analyzer', 'https://exiftool.org/', 'tool'),
(41, 'DFIR.training Free Resources', 'https://www.dfir.training/', 'article'),
(42, 'Cellebrite Mobile Forensics Training', 'https://cellebrite.com/en/training/', 'course'),
(42, 'Volatility Foundation', 'https://volatilityfoundation.org/', 'tool'),
(43, 'SANS FOR508 Advanced DFIR', 'https://www.sans.org/cyber-security-courses/advanced-incident-response-threat-hunting-training/', 'course'),
(43, 'FTK Forensic Toolkit', 'https://www.exterro.com/forensic-toolkit', 'tool'),
(44, 'Journal of Digital Forensics', 'https://www.jdfsl.org/', 'article'),
(44, 'Eric Zimmerman Tools Collection', 'https://ericzimmerman.github.io/', 'tool');

-- Web App Hacker levels 45,46,47,48
INSERT INTO resources (level_id, title, url, type) VALUES
(45, 'PortSwigger Web Security Academy', 'https://portswigger.net/web-security', 'course'),
(45, 'OWASP Top 10', 'https://owasp.org/www-project-top-ten/', 'article'),
(45, 'Burp Suite Community Edition', 'https://portswigger.net/burp/communitydownload', 'tool'),
(46, 'DVWA Damn Vulnerable Web App', 'https://dvwa.co.uk/', 'tool'),
(46, 'HackTheBox Web Challenges', 'https://www.hackthebox.com/', 'course'),
(47, 'HackerOne Bug Bounty Platform', 'https://www.hackerone.com/', 'tool'),
(47, 'Bug Bounty Hunter Course', 'https://www.bugbountyhunter.com/', 'course'),
(48, 'SANS SEC542 Web App Pentest', 'https://www.sans.org/cyber-security-courses/web-app-penetration-testing-ethical-hacking/', 'course'),
(48, 'Intigriti Bug Bounty Platform', 'https://www.intigriti.com/', 'tool');

-- Social Engineer levels 49,50,51,52
INSERT INTO resources (level_id, title, url, type) VALUES
(49, 'Social Engineering Toolkit (SET)', 'https://github.com/trustedsec/social-engineer-toolkit', 'tool'),
(49, 'The Art of Intrusion by Kevin Mitnick', 'https://www.wiley.com/en-us/The+Art+of+Intrusion-p-9780764569593', 'article'),
(50, 'GoPhish Phishing Framework', 'https://getgophish.com/', 'tool'),
(50, 'Social-Engineer.com Resources', 'https://www.social-engineer.com/resources/', 'article'),
(51, 'SANS SEC467 Social Engineering Course', 'https://www.sans.org/cyber-security-courses/social-engineering-for-penetration-testers/', 'course'),
(51, 'Evilginx Phishing Framework', 'https://github.com/kgretzky/evilginx2', 'tool'),
(52, 'Influence by Robert Cialdini', 'https://www.cialdini.com/books/', 'article'),
(52, 'Human Hacking by Christopher Hadnagy', 'https://www.wiley.com/en-us/Human+Hacking-p-9781119687405', 'article');

-- Exploit Developer levels 53,54,55,56
INSERT INTO resources (level_id, title, url, type) VALUES
(53, 'x64dbg Debugger', 'https://x64dbg.com/', 'tool'),
(53, 'Exploit.Education Practice VMs', 'https://exploit.education/', 'tool'),
(53, 'LiveOverflow Binary Exploitation', 'https://www.youtube.com/c/LiveOverflow', 'video'),
(54, 'Exploit-DB Database', 'https://www.exploit-db.com/', 'tool'),
(54, 'pwn.college Binary Exploitation', 'https://pwn.college/', 'course'),
(55, 'SANS SEC660 Advanced Exploit Dev', 'https://www.sans.org/cyber-security-courses/advanced-exploit-development-penetration-testers/', 'course'),
(55, 'Nightmare Binary Exploitation Course', 'https://guyinatuxedo.github.io/', 'course'),
(56, 'CVE Mitre Database', 'https://cve.mitre.org/', 'tool'),
(56, 'Project Zero Blog', 'https://googleprojectzero.blogspot.com/', 'article');

-- Red Team Operator levels 57,58,59,60
INSERT INTO resources (level_id, title, url, type) VALUES
(57, 'Red Team Development and Operations', 'https://redteam.guide/', 'article'),
(57, 'TIBER-EU Red Team Framework', 'https://www.ecb.europa.eu/paym/cyber-resilience/tiber-eu/html/index.en.html', 'article'),
(58, 'Cobalt Strike Documentation', 'https://www.cobaltstrike.com/training', 'course'),
(58, 'Havoc C2 Framework', 'https://github.com/HavocFramework/Havoc', 'tool'),
(59, 'SANS SEC565 Red Team Operations', 'https://www.sans.org/cyber-security-courses/red-team-operations-adversary-emulation/', 'course'),
(59, 'Atomic Red Team Tests', 'https://github.com/redcanaryco/atomic-red-team', 'tool'),
(60, 'VECTR Red Team Tracking', 'https://vectr.io/', 'tool'),
(60, 'Adversary Emulation Plans MITRE', 'https://attack.mitre.org/resources/adversary-emulation-plans/', 'article');

-- =====================
-- UPDATE QUESTIONS
-- =====================
DELETE FROM questions;

INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, order_index) VALUES
('When you are curious about something online, what do you do?', 'Search deeply and read multiple sources', 'Try interacting with it to see how it works', 'Observe patterns and details carefully', 'Think about how it could be improved or secured', 1),
('If an app or website behaves strangely, what is your first instinct?', 'Look up what might be happening', 'Try different actions to reproduce the issue', 'Watch closely to understand the pattern', 'Think about how to fix or prevent it', 2),
('What kind of challenges do you enjoy most?', 'Finding hidden or unknown information', 'Testing limits and boundaries', 'Understanding complex systems', 'Preventing or solving problems', 3),
('When using a new piece of technology, you usually:', 'Read about it and explore features', 'Click around and experiment freely', 'Observe how it behaves step by step', 'Use it carefully and correctly', 4),
('How do you approach solving a difficult problem?', 'Research and gather information first', 'Try multiple solutions quickly', 'Break it down and analyze it', 'Focus on the safest and most stable fix', 5),
('What role do you naturally take in a group?', 'Researcher and information finder', 'Tester and experimenter', 'Analyst and thinker', 'Organizer and protector', 6),
('If you notice something unusual in a system, you:', 'Try to find its origin', 'Test how far it can go', 'Study it carefully', 'Stop or secure it immediately', 7),
('What type of thinking do you rely on most?', 'Curiosity-driven', 'Trial-and-error', 'Analytical', 'Risk-aware', 8),
('When learning something new in tech, you prefer:', 'Reading and understanding concepts', 'Hands-on experimentation', 'Watching and analyzing examples', 'Following best practices', 9),
('What would you most likely do with a system you do not fully understand?', 'Research how it works', 'Interact with it to explore', 'Observe inputs and outputs', 'Avoid risks and use it safely', 10),
('If you had access to a system, what would interest you most?', 'Learning information about it', 'Testing what it can and cannot do', 'Understanding how it behaves', 'Making it more secure or stable', 11),
('What gives you the most satisfaction?', 'Discovering hidden details', 'Pushing something to its limits', 'Solving complex problems', 'Keeping things safe and reliable', 12);