import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PDFGenerator() {
  const printRef = useRef();

  const handleDownloadPdf = async () => {
    try {
      const element = printRef.current;

      // Temporarily remove zoom before capture
      element.style.zoom = "1";

      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // Restore the on-screen zoom
      element.style.zoom = "0.8";

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [215.9, 279.4],
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("letter-size.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div
        ref={printRef}
        className="force-rgb h-[1056px] w-[816px] border bg-white p-8 shadow-lg [zoom:0.8]"
      >
        <h1 className="text-center text-3xl font-bold text-blue-600">
          Properly Scaled Preview
        </h1>
        <p className="mt-4 text-center text-gray-600">
          Looks smaller on screen, but exports sharp and full-size.
        </p>
        <div className="mt-6 space-y-2 text-center">
          <p>- On-screen zoom: 80%</p>
          <p>- PDF output: Full 8.5 × 11 inch Letter size</p>
        </div>
      </div>

      <button
        onClick={handleDownloadPdf}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
}
