
export const analyzeResume = (text = "") => {
  if (typeof text !== "string" || !text.trim()) {
    return {};
  }

  const resume = text.replace(/\r\n?/g, "\n");
  const normalized = resume.toLowerCase();

  const notFound = "Not Found";

  const getFirstMatch = (regex) =>
    resume.match(regex)?.[0]?.trim() || notFound;

  const getMatches = (regex) => [...resume.matchAll(regex)]
    .map((match) => match[0].trim())
    .filter(Boolean);

  // -----------------------------
  // BASIC INFORMATION
  // -----------------------------

  const email = getFirstMatch(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
  );

  const phone = getFirstMatch(
    /(?<!\d)(?:\+91[\s-]?|91[\s-]?|0)?[6-9]\d{9}(?!\d)/g
  );

  const linkedin = getFirstMatch(
    /https?:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?/i
  );

  const github = getFirstMatch(
    /https?:\/\/(?:www\.)?github\.com\/[a-zA-Z0-9_-]+\/?/i
  );

  const portfolio = getFirstMatch(
    /https?:\/\/(?:www\.)?(?!linkedin\.com|github\.com)[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?::\d+)?(?:\/[^\s]*)?/i
  );

  // -----------------------------
  // NAME EXTRACTION
  // -----------------------------

  const ignoredHeadings =
    /^(resume|curriculum vitae|cv|profile|contact|about me|personal details)$/i;

  const lines = resume
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const nameLine = lines.find((line) => {
    if (line.length > 60 || ignoredHeadings.test(line)) {
      return false;
    }

    if (/@|https?:\/\/|\d/.test(line)) {
      return false;
    }

    if (/^(summary|objective|education|experience|skills|projects)\b/i.test(line)) {
      return false;
    }

    return /^[A-Za-z][A-Za-z .'-]*$/.test(line);
  });

  const name = nameLine || notFound;

  // -----------------------------
  // SKILLS
  // -----------------------------

  const skillsList = [
    "React",
    "React Native",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Python",
    "Java",
    "C++",
    "C#",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "SQL",
    "PostgreSQL",
    "MySQL",
    "Git",
    "GitHub",
    "AWS",
    "Docker",
    "Firebase",
    "Next.js",
    "Vue.js",
    "Angular",
    "REST API",
    "GraphQL",
    "Redis",
    "Linux",
    "Figma",
    "Machine Learning",
    "Data Analysis",
  ];

  const escapeRegex = (value) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const foundSkills = skillsList.filter((skill) => {
    const pattern = new RegExp(
      `(^|[^a-zA-Z0-9+#.])${escapeRegex(skill)}(?![a-zA-Z0-9])`,
      "i"
    );

    return pattern.test(resume);
  });

  // -----------------------------
  // EDUCATION
  // -----------------------------

  const degreeKeywords = [
    "B.Tech",
    "M.Tech",
    "BCA",
    "MCA",
    "B.Sc",
    "M.Sc",
    "B.Com",
    "M.Com",
    "BBA",
    "MBA",
    "Bachelor of Engineering",
    "Bachelor of Science",
    "Bachelor of Arts",
    "Master of Science",
    "Master of Arts",
    "Bachelor",
    "Master",
    "Ph.D.",
    "Diploma",
  ];

  const educationDegree =
    degreeKeywords.find((degree) =>
      new RegExp(
        escapeRegex(degree).replace(/\\\./g, "\\.?"),
        "i"
      ).test(resume)
    ) || notFound;

  const universityRegex =
    /\b(?:[A-Z][A-Za-z&.'-]*\s+){0,6}(?:University|College|Institute)\b(?:\s+of\s+[A-Za-z&.'-]+){0,4}/g;

  const university = getFirstMatch(universityRegex);

  const graduationYear = getFirstMatch(
    /\b(?:19|20)\d{2}\b/g
  );

  // -----------------------------
  // EXPERIENCE AND JOB TITLES
  // -----------------------------

  const experienceMatch = resume.match(
    /\b\d{1,2}\+?\s*(?:years?|yrs?)(?:\s+of)?\s+(?:experience|professional experience)\b/i
  );

  const totalExperience = experienceMatch?.[0] || notFound;

  const jobTitleKeywords = [
    "Frontend Developer",
    "Front-End Developer",
    "Backend Developer",
    "Back-End Developer",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Web Developer",
    "UI Developer",
    "UX Designer",
    "Data Analyst",
    "Data Scientist",
    "DevOps Engineer",
    "Mobile App Developer",
    "Machine Learning Engineer",
  ];

  const jobTitles = jobTitleKeywords.filter((job) =>
    new RegExp(`\\b${escapeRegex(job)}\\b`, "i").test(resume)
  );

  const currentJobTitle = jobTitles[0] || notFound;

  const companyNames = [
    "Infosys",
    "TCS",
    "Google",
    "Microsoft",
    "Amazon",
    "Wipro",
    "Accenture",
    "IBM",
    "Deloitte",
    "Adobe",
    "Oracle",
    "Meta",
  ];

  const companies = companyNames.filter((company) =>
    new RegExp(`\\b${escapeRegex(company)}\\b`, "i").test(resume)
  );

  const currentCompany = companies[0] || notFound;

  const employmentDates = getMatches(
    /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}\b/gi
  );

  // -----------------------------
  // LOCATION AND PERSONAL DETAILS
  // -----------------------------

  const cities = [
    "Dehradun",
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Noida",
    "Gurugram",
    "Gurgaon",
    "Jaipur",
    "Lucknow",
    "Chandigarh",
    "Ahmedabad",
    "Indore",
  ];

  const location =
    cities.find((city) =>
      new RegExp(`\\b${escapeRegex(city)}\\b`, "i").test(resume)
    ) || notFound;

  const pinCode = getFirstMatch(
    /\b[1-9]\d{5}\b/g
  );

  const dateOfBirth = getFirstMatch(
    /\b(?:0?[1-9]|[12]\d|3[01])[/-](?:0?[1-9]|1[0-2])[/-](?:\d{2}|\d{4})\b/g
  );

  // -----------------------------
  // SUMMARY / OBJECTIVE
  // -----------------------------

  const summaryHeading = /\b(?:professional\s+)?(?:summary|objective|about me|profile)\b/i;
  const nextSectionHeading =
    /\b(?:education|experience|work experience|employment|skills|technical skills|projects|certifications|achievements)\b/i;

  let summary = notFound;

  const summaryMatch = summaryHeading.exec(resume);

  if (summaryMatch) {
    const start = summaryMatch.index + summaryMatch[0].length;
    const remainingText = resume.slice(start);
    const nextSection = nextSectionHeading.exec(remainingText);

    const extractedSummary = (
      nextSection
        ? remainingText.slice(0, nextSection.index)
        : remainingText
    ).trim();

    if (extractedSummary) {
      summary = extractedSummary.slice(0, 1200);
    }
  }

  // -----------------------------
  // CERTIFICATIONS
  // -----------------------------

  const certificationKeywords = [
    "AWS Certified",
    "Google Cloud",
    "Google Certification",
    "Meta Front-End Developer",
    "Meta Frontend",
    "Microsoft Certified",
    "Cisco Certified",
    "Coursera",
    "Udemy",
    "IBM SkillsBuild",
  ];

  const certifications = certificationKeywords.filter((cert) =>
    normalized.includes(cert.toLowerCase())
  );

  // -----------------------------
  // PROJECTS
  // -----------------------------

  const projectHeading =
    /^\s*(?:projects|personal projects|academic projects|key projects)\s*:?\s*$/im;

  let projects = [];

  const projectMatch = projectHeading.exec(resume);

  if (projectMatch) {
    const afterHeading = resume.slice(
      projectMatch.index + projectMatch[0].length
    );

    const nextHeading =
      /^\s*(?:education|experience|work experience|skills|technical skills|certifications|achievements)\s*:?\s*$/im;

    const nextMatch = nextHeading.exec(afterHeading);

    const projectSection = (
      nextMatch
        ? afterHeading.slice(0, nextMatch.index)
        : afterHeading
    ).trim();

    projects = projectSection
      .split(/\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 2)
      .slice(0, 15);
  }

  // -----------------------------
  // FINAL RESULT
  // -----------------------------

  return {
    name,
    email,
    phone,
    linkedin,
    github,
    portfolio,
    currentJobTitle,
    currentCompany,
    totalExperience,
    educationDegree,
    university,
    graduationYear,
    skills: foundSkills,
    jobTitles,
    companies,
    employmentDates,
    location,
    pinCode,
    dateOfBirth,
    summary,
    certifications,
    projects,
  };
};
