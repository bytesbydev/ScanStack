
# 👾 ScanStack — AI Resume Analyzer

ScanStack is an AI-powered resume analyzer built with **React.js and Google Gemini API**. It analyzes resumes and provides ATS scores, skill insights, industry comparisons, and actionable suggestions to help improve resume quality.

🔗 **Live Demo:** [ScanStack](https://ai-resume-analyzer-seven-rouge.vercel.app/)

---

## ✨ Features

- 📄 Upload resumes in PDF format
- 🤖 AI-powered resume analysis using Gemini API
- 📊 ATS compatibility score (0–100)
- 🧠 Technical and soft skill detection
- 📈 Industry comparison and radar chart analysis
- 💡 Prioritized resume improvement suggestions
- ⚡ Animated analysis progress indicator
- 📉 Section-wise resume evaluation
- 🎯 Keyword optimization insights

---

## 🧠 AI Analysis

ScanStack provides insights into:

- Basic resume information
- Key strengths and weaknesses
- Critical issues affecting resume quality
- ATS compatibility and readability scores
- Keyword matching and optimization
- Industry benchmarking
- Recommended skills
- Actionable suggestions with High, Medium, and Low priorities

> Note: ATS scores and AI-generated recommendations are estimates, not guarantees of how an employer's ATS will evaluate a resume.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend framework |
| Tailwind CSS | UI styling |
| Google Gemini API | AI-powered analysis |
| React Router DOM | Navigation |
| Chart.js | Data visualization |
| Lucide Icons | Interface icons |

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Home/
│   ├── loader/
│   ├── results/
│   └── common/
├── pages/
│   ├── Home.jsx
│   ├── Analyzing.jsx
│   └── Results.jsx
├── utils/
│   ├── aiAnalysis.js
│   ├── extractText.js
│   └── analyzeResume.js
└── App.jsx
```

---

## 🔄 How It Works

1. Upload a resume in PDF format.
2. Extract text from the uploaded PDF.
3. Navigate to the analysis page.
4. Process the resume using the Gemini API.
5. Generate AI-powered insights and scores.
6. Display the analysis and improvement recommendations.

---

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- A Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/bytesbydev/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your own API key.

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

---

## 🔑 Gemini API Setup

1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Generate a Gemini API key.
3. Add the key to your `.env` file.
4. Ensure your application uses the appropriate Gemini model and API endpoint.

**Security note:** Variables prefixed with `VITE_` are exposed to client-side code. Do not use a publicly deployed frontend API key as a secret. For production, route Gemini requests through a backend or serverless function and keep the key in server-side environment variables.

---

## 📊 Example Analysis Output

The following is a simplified example of the analysis data:

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

## 🚧 Known Limitations

- Analysis time depends on API response speed.
- Large PDFs may increase text extraction time.
- AI analysis requires a stable internet connection.
- Results depend on the quality of extracted text and AI-generated output.

---

## 🚀 Future Improvements

- [ ] Drag-and-drop resume upload
- [ ] PDF preview before analysis
- [ ] User authentication
- [ ] Resume analysis history
- [ ] Downloadable PDF reports
- [ ] Job description matching

---

## 👨‍💻 Author

**Bytesbydev**

- GitHub: [@bytesbydev](https://github.com/bytesbydev)

---

## ⭐ Support

If you find ScanStack useful, consider giving the repository a star ⭐

Feedback and contributions are welcome!
