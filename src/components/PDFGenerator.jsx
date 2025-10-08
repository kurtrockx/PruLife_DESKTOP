import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PDFGenerator() {
  const tableEntryDesign =
    "flex flex-1 flex-col items-center justify-center border p-1";

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
    <div className="flex flex-col items-center gap-6 bg-stone-800 p-6 text-xs">
      <div
        ref={printRef}
        className="force-rgb flex h-[1056px] w-[816px] flex-col border bg-white p-8 shadow-lg [zoom:0.8]"
      >
        {/* Header sample proposal */}
        <div className="text-right">
          <p>
            Simple Summary Proposal by
            <BoldText> CHE VIANNEY PAREDES</BoldText> | Unit Operations Manager
            | Prulife UK
          </p>
        </div>

        {/* Profile */}
        <div className="flex flex-col">
          <BoldText>I. PROFILE</BoldText>
          <div className="flex">
            <p className="flex-1">Proposed Policy Owner:</p>
            <p className="flex-1">Menzie Junsay</p>
            <p className="flex-1">Age: 29yo</p>
          </div>
          <div className="flex">
            <p className="flex-1">Proposed Life Insured:</p>
            <p className="flex-1">Menzie Junsay</p>
            <p className="flex-1">Age: 29yo</p>
          </div>
        </div>

        {/* Insurance Plan HEADER*/}
        <div>
          <BoldText>
            INSURANCE PLAN: PRULINK ASSURANCE ACOUNT PLUS (PROTECTION HEAVY)
          </BoldText>
          <div className="flex">
            <div className={`${tableEntryDesign}`}>BENEFITS</div>
            <div
              className={`${tableEntryDesign} border-black bg-red-800 text-white`}
            >
              <BoldText>BEST</BoldText>
              <p>61,228</p>
              <p>(Flexible)</p>
            </div>
            <div
              className={`${tableEntryDesign} border-black bg-red-800 text-white`}
            >
              <BoldText>BETTER</BoldText>
              <p>36,000</p>
              <p>(Flexible)</p>
            </div>
            <div
              className={`${tableEntryDesign} border-black bg-red-800 text-white`}
            >
              <BoldText>GOOD</BoldText>
              <p>25,200</p>
              <p>(Flexible)</p>
            </div>
          </div>
        </div>
        {/* Insurance Plan MONTHLY*/}
        <div className="flex">
          <div className={`${tableEntryDesign}`}>
            <BoldText>Monthly Savings</BoldText>
          </div>
          <div className={tableEntryDesign}>
            <BoldText>PhP 5,102.33</BoldText>
          </div>
          <div className={tableEntryDesign}>
            <BoldText>PhP 3000</BoldText>
          </div>
          <div className={tableEntryDesign}>
            <BoldText>PhP 2,100</BoldText>
          </div>
        </div>
        {/* Insurance Plan END*/}
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

function BoldText({ children }) {
  return <span className="font-bold">{children}</span>;
}
