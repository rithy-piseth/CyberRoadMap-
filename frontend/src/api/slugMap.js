const slugMap = {
  'SOC Analyst': 'soc-analyst',
  'DFIR Analyst': 'dfir-analyst',
  'Threat Intelligence Analyst': 'threat-intel',
  'Penetration Tester': 'pentest',
  'OSINT Analyst': 'osint',
  'Malware Analyst': 'malware-analyst',
  'Cloud Security Engineer': 'cloud-security',
  'GRC Analyst': 'grc-analyst',
  'Vulnerability Management Analyst': 'vuln-management',
  'Security Engineer': 'security-engineer',
  'Digital Forensics Analyst': 'digital-forensics',
  'Web Application Hacker': 'web-app-hacker',
  'Social Engineer': 'social-engineer',
  'Exploit Developer': 'exploit-developer',
  'Red Team Operator': 'red-team-operator',
}

export const getSlug = (careerName) => {
  return slugMap[careerName] || careerName.toLowerCase().replace(/\s+/g, '-')
}