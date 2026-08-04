
const aiAnalysis = async ({ resumeText, parsedData }) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!API_KEY) {
    return { error: "Gemini API key is missing. Check your .env file." };
  }

  if (!resumeText) {
    return { error: "Resume data is missing." };
  }

  const prompt = `
Act as a professional ATS resume analyst. Analyze the resume data below.

Return one valid JSON object matching this structure exactly.
Use concise, specific, evidence-based insights. Avoid repetition.
Never invent personal details, experience, skills, or achievements.
Use "" for unknown text and 0 for unknown numeric values.
Scores and proficiency values: integers from 0 to 100.
Use severity/priority values such as High, Medium, Low.
Use only resume evidence for personal information and skills.
Industry comparisons are estimates, not verified statistics.
Recommend skills relevant to the resume's target role; if unknown,
infer a reasonable role from the resume and avoid unsupported assumptions.
Do not treat missing information as proof that the candidate lacks a skill.

Output fields:
{
  "basicInfo": {
    "name": "", "email": "", "phone": "", "linkedin": "",
    "github": "", "portfolio": "", "location": "", "summary": ""
  },
  "strengths": [{"label": "", "severity": ""}],
  "improvements": [{"label": "", "severity": ""}],
  "criticalIssues": [{"label": "", "severity": ""}],
  "statsData": {
    "atsScore": 0, "readabilityScore": 0,
    "wordCount": 0, "keywordMatch": 0
  },
  "sectionScores": [{"section": "", "score": 0}],
  "industryComparison": [
    {"aspect": "", "yourScore": 0, "industry": 0}
  ],
  "trendingKeywords": [
    {"keyword": "", "frequency": 0, "inResume": true}
  ],
  "atsAnalysis": [{"title": "", "description": "", "type": ""}],
  "performanceStats": [{"label": "", "value": ""}],
  "skillCategories": [{"section": "", "score": 0}],
  "technicalSkills": [{"label": "", "level": "", "proficiency": 0}],
  "softSkills": [{"label": "", "level": "", "proficiency": 0}],
  "recommendedSkills": [{"label": "", "severity": ""}],
  "suggestions": [{
    "id": "", "title": "", "priority": "", "category": "",
    "impact": "", "before": "", "after": "", "timeToFix": ""
  }]
}

Content guidelines:
- basicInfo: extract only details present in the resume.
- strengths: 3-5 distinct strengths.
- improvements: 3-5 actionable improvements.
- criticalIssues: report genuine high-impact problems only; use [] if none.
- statsData: calculate wordCount from the provided resume; use realistic,
  conservative scores and never give a perfect score without evidence.
- sectionScores: assess relevant sections such as Summary, Skills,
  Experience, Education and Projects when present.
- industryComparison: compare relevant resume aspects using estimates.
- trendingKeywords: include 5-8 role-relevant keywords. frequency is
  the number of occurrences in the resume; inResume must reflect actual text.
- atsAnalysis: 3-5 concise findings with type values like success, warning,
  or error.
- performanceStats: 3-5 useful metrics with string values.
- skillCategories: score relevant skill groups based on resume evidence.
- technicalSkills and softSkills: include only supported skills, with
  proficiency reflecting evidence rather than assumed expertise.
- recommendedSkills: 3-5 relevant skills to consider learning or adding.
- suggestions: 3-5 prioritized edits with concrete before/after examples.
  Never fabricate a "before" quote; use "" if no exact text exists.
  Keep each suggestion specific and useful.

Keep arrays short and informative. Avoid duplicating the same finding
across multiple arrays unless each field serves a distinct purpose.

Full extracted resume text:
${resumeText}

Additional structured data extracted from the resume:
${JSON.stringify(parsedData)}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
            maxOutputTokens: 7000,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data.error);

      throw new Error(
        data.error?.message || `Gemini API request failed (${response.status})`
      );
    }

    const candidate = data.candidates?.[0];
    const rawText = candidate?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!rawText) {
      throw new Error(
        candidate?.finishReason === "MAX_TOKENS"
          ? "The AI response reached its token limit. Try a shorter resume."
          : "Gemini returned an empty response."
      );
    }

    if (candidate.finishReason === "MAX_TOKENS") {
      throw new Error(
        "The AI response was truncated. Please try again."
      );
    }

    const result = JSON.parse(rawText);

    if (
      !result ||
      typeof result !== "object" ||
      Array.isArray(result) ||
      !result.statsData ||
      !result.basicInfo
    ) {
      throw new Error("Gemini returned an incomplete analysis.");
    }

    return result;
  } catch (error) {
    console.error("AI Analysis Error:", error);

    return {
      error: error.message || "Failed to analyze resume.",
    };
  }
};

export default aiAnalysis;
