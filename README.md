# 👾 ScanStack

An intelligent **AI-powered Resume Analyzer** built with **React + Gemini API** that analyzes resumes and provides ATS scores, skill insights, improvement suggestions, and actionable recommendations.

> 🔗 **Live Demo:** [https://ai-resume-analyzer-seven-rouge.vercel.app/](https://ai-resume-analyzer-seven-rouge.vercel.app/)

---

## ✨ Features

- 📄 Upload Resume (PDF support)
- 🤖 AI-powered resume analysis using **Gemini API**
- 📊 ATS Score generation (0–100)
- 🧠 Skill detection (Technical + Soft skills)
- 📈 Industry comparison & radar analysis
- 💡 Improvement suggestions with priority levels
- ⚡ Real-time analysis loading animation
- 📉 Section-wise breakdown
- 🎯 Keyword optimization insights
- 📉 Section-wise resume evaluation
- ⚡ Real-time analysis with interactive loading animations
- 📱 Fully responsive and modern UI

---

## 🧠 AI Analysis

ScanStack provides insights into:

- Basic information extraction
- Strengths identification
- Weakness & improvement detection
- Critical issues detection
- ATS compatibility score
- Keyword matching analysis
- Industry benchmarking
- Recommended skills list
- Actionable suggestions (High / Medium / Low priority)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ⚛️ React.js | Frontend Framework |
| 🎨 Tailwind CSS | UI Styling |
| 🤖 Google Gemini API | AI Engine |
| 📦 React Router DOM | Navigation |
| 📊 Chart.js | Radar & Bar Charts |
| 🧩 Lucide Icons | Icon Library |

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Home/
│   ├── loader/
│   ├── results/
│   └── common/
│
├── pages/
│   ├── Home.jsx
│   ├── Analyzing.jsx
│   └── Results.jsx
│
├── utils/
│   ├── aiAnalysis.js
│   ├── extractText.js
│   └── analyzeResume.js
│
└── App.jsx
```

---

## 🔄 App Flow

```
Home Page
    ↓
Upload Resume
    ↓
Extract Text (PDF Parser)
    ↓
Navigate → Analyzing Page
    ↓
Progress Animation Starts
    ↓
Gemini API Processing
    ↓
AI Response Generated
    ↓
Navigate → Results Page
    ↓
Display Full Resume Analysis
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the Project

```bash
npm run dev
```

Visit:

```text
http://localhost:5173
```

Open the local URL displayed in your terminal.

---

## 🔑 Gemini API Setup

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Generate your API Key
3. Add it to your `.env` file
4. The app uses the following endpoint:

```
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
```

---

## 📊 Example Output

```json
{
  "statsData": {
    "atsScore": 78,
    "readabilityScore": 85,
    "wordCount": 420,
    "keywordMatch": 72
  },
  "strengths": [],
  "improvements": [],
  "criticalIssues": [],
  "suggestions": []
}
```

The values are illustrative and may vary depending on the resume and analysis.

---

## 🚧 Known Issues

- Gemini API response may take 2–5 seconds
- Large PDFs may slow down text extraction
- Requires a stable internet connection for AI calls

---

## 🎯 Future Improvements

- [ ] Drag & drop upload UI
- [ ] PDF preview before analysis
- [ ] User authentication
- [ ] Save analysis history
- [ ] Download report as PDF
- [ ] Job matching system

---

## 👨‍💻 Author

bytesbydev 

---

## 📄 License

This project is licensed under the **MIT License**.

If you found this project helpful, give it a star ⭐ and share it with others!

⭐ **If ScanStack helped you improve your resume, consider giving the repository a star—it supports the project and encourages future development!**