import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PDFGenerator() {
  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;

    // Capture the content as a high-quality canvas
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");

    // Legal paper size in millimeters (8.5 x 14 inches)
    const pdfWidth = 215.9; // mm
    const pdfHeight = 279.4; // mm

    // Create a jsPDF instance with exact legal paper dimensions
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [pdfWidth, pdfHeight],
    });

    // Maintain aspect ratio
    const imgProps = pdf.getImageProperties(data);
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    // Center the image vertically if smaller than the page
    const yOffset = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;

    pdf.addImage(data, "PNG", 0, yOffset, imgWidth, imgHeight);
    pdf.save("custom-legal.pdf");
  };

  return (
    <div
      ref={printRef}
      className="force-rgb flex flex-col items-center gap-6 p-6"
    >
      {/* PDF content */}
      <div
        ref={printRef}
        className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-md"
      >
        <h1 className="text-center text-2xl font-bold text-blue-600">
          Custom PDF Example
        </h1>
        <p className="mt-2 text-center text-gray-600">
          This content is styled with Tailwind and will appear inside the PDF.
        </p>
        <div className="mt-4 space-y-2">
          <p>- You can include any HTML or Tailwind components.</p>
          <p>- Images, logos, tables, etc. all work fine.</p>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadPdf}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
}
