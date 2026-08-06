
import * as pdfjsLib from "pdfjs-dist";

// PDF.js worker setup for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const extractText = async (file) => {
  let pdf;

  try {
    if (!file) {
      throw new Error("No file provided.");
    }

    if (
      file.type !== "application/pdf" &&
      !file.name?.toLowerCase().endsWith(".pdf")
    ) {
      throw new Error("Please provide a PDF file.");
    }

    if (!file.size) {
      throw new Error("The selected PDF is empty.");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("PDF size must be under 5 MB.");
    }

    const arrayBuffer = await file.arrayBuffer();

    // Check the PDF signature before parsing
    const signature = new TextDecoder().decode(
      new Uint8Array(arrayBuffer, 0, Math.min(5, arrayBuffer.byteLength))
    );

    if (!signature.startsWith("%PDF-")) {
      throw new Error("The selected file is not a valid PDF.");
    }

    pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
    }).promise;

    if (pdf.numPages === 0) {
      throw new Error("The PDF contains no pages.");
    }

    const pages = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      let pageText = "";
      let previousY = null;

      for (const item of content.items) {
        if (!("str" in item)) continue;

        const currentY = item.transform?.[5];

        // Preserve likely line breaks based on text positioning
        if (
          previousY !== null &&
          currentY !== undefined &&
          Math.abs(previousY - currentY) > 3
        ) {
          pageText += "\n";
        } else if (pageText && !pageText.endsWith("\n")) {
          pageText += " ";
        }

        pageText += item.str;
        previousY = currentY ?? previousY;
      }

      pages.push(pageText.trim());

      page.cleanup();
    }

    const cleanText = pages
      .filter(Boolean)
      .join("\n\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (!cleanText) {
      throw new Error(
        "No selectable text found. This PDF may be scanned or image-based."
      );
    }

    return cleanText;
  } catch (error) {
    console.error("PDF extraction error:", error);
    throw error;
  } finally {
    if (pdf) {
      await pdf.destroy();
    }
  }
};
