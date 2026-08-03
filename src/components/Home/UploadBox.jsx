
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { extractText } from "../../utils/extractText";
import { analyzeResume } from "../../utils/analyzeResume";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const UploadBox = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const processFile = async (file) => {
    if (!file || loading) return;

    setError("");

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please upload a PDF file.");
      return;
    }

    if (file.type && file.type !== "application/pdf") {
      setError("The selected file must be a valid PDF.");
      return;
    }

    if (file.size === 0) {
      setError("The selected file is empty.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be under 5 MB.");
      return;
    }

    setLoading(true);

    try {
      const text = await extractText(file);

      if (typeof text !== "string" || !text.trim()) {
        throw new Error(
          "Could not extract text. The PDF may be scanned, empty, or unreadable."
        );
      }

      const parsedData = analyzeResume(text);

      if (!parsedData) {
        throw new Error("Could not analyze this resume. Please try another PDF.");
      }

      navigate("/analyzing", {
  state: {
    parsedData,
    resumeText: text,
  },
});
    } catch (err) {
  console.error("Resume processing error:", err);

  setError(
    err instanceof Error
      ? err.message
      : "Failed to process your resume. Please try again."
  );
}finally {
      setLoading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (event) => {
    processFile(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (loading) return;

    processFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div className="w-full flex justify-center px-3 sm:px-4 mt-8 sm:mt-12">
      <div
        className="w-full max-w-4xl border-2 border-dashed border-gray-300 rounded-xl bg-white py-10 sm:py-16 px-4 sm:px-6 flex flex-col items-center text-center"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5 sm:mb-6"
          aria-hidden="true"
        >
          <svg
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8 7H16M8 11H16M8 15H13"
              stroke="#94A3B8"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <rect
              x="4"
              y="3"
              width="16"
              height="18"
              rx="2"
              stroke="#94A3B8"
              strokeWidth="1.8"
            />
          </svg>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
          Upload your resume
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mb-6">
          Drag and drop your PDF here or browse your files.
        </p>

        <input
          ref={inputRef}
          id="resume-upload"
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          disabled={loading}
          className="sr-only"
        />

        <label
          htmlFor="resume-upload"
          className={`${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          } text-white font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition text-sm sm:text-base`}
        >
          {loading ? "Processing resume..." : "Choose File"}
        </label>

        {loading && (
          <p className="mt-4 text-sm text-blue-600" role="status">
            Please wait while we process your resume.
          </p>
        )}

        {error && (
          <p
            className="mt-4 text-sm text-red-600 max-w-md"
            role="alert"
          >
            {error}
          </p>
        )}

        <div className="mt-5 sm:mt-6 text-xs sm:text-sm text-gray-500 space-y-1">
          <p>PDF format only</p>
          <p>Maximum file size: 5 MB</p>
          <p>Processing time depends on the PDF and analysis steps.</p>
        </div>
      </div>
    </div>
  );
};

export default UploadBox;
