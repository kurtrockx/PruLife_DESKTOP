import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PROPOSAL_CONTANTS = [
  ["Life Insurance", "3,000,000", "2,400,000", "1,500,000"],
  ["Total and Permanent Disability", "1,500,000", "1,000,000", "1,000,000"],
  ["Accidental Death and Disablement", "1,500,000", "1,000,000", "1,000,000"],
  ["Early Stage Critical Illness", "N/A", "N/A", "N/A"],
  ["Late Stage Critical Illness", "1,000,000", "1,000,000", "N/A"],
  ["Daily Hospital Income", "2,000", "1,500", "1,500"],
  ["Surgical Expense Reimbursement", "30,000", "N/A", "N/A"],
  ["ICU Benefit", "N/A", "N/A", "N/A"],
  ["Long Term Hospitalization", "N/A", "N/A", "N/A"],
  [
    "Disability Waiver",
    "Future Premiums",
    "Future Premiums",
    "Future Premiums",
  ],
  ["Critical Illness Waiver", "Future Premiums", "N/A", "N/A"],
];

const PROPOSAL_CONTANTS2 = [
  ["At 5 years (Age 34)", "1,0417,481", "72,045.38", "56,693.70"],
  ["Total and Permanent Disability", "423,573.05", "281.115.91", "218,304.73"],
  [
    "Accidental Death and Disablement",
    "924,637.33",
    "614,156.14",
    "485,034.70",
  ],
  [
    "Accidental Death and Disablement",
    "1,652,082.59",
    "1,104,178.11",
    "894,563.79",
  ],
];

export default function PDFGenerator() {
  const tableEntryDesign =
    "flex flex-1 flex-col items-center justify-center border px-1 py-2";

  const printRef = useRef();

  const handleDownloadPdf = async () => {
    try {
      const element = printRef.current;

      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // Restore the on-screen zoom

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
    <div className="flex flex-col items-center gap-6 overflow-hidden overflow-y-auto bg-[#292524] p-6 text-xs">
      <div
        ref={printRef}
        className="force-rgb flex h-[1056px] w-[816px] flex-col border bg-[white] p-8 shadow-lg max-lg:[zoom:0.8] max-sm:[zoom:0.5]"
      >
        {/* Header sample proposal */}
        <div className="text-right">
          <p>
            Simple Summary Proposal by
            <BoldText> CHE VIANNEY PAREDES</BoldText> | Unit Operations Manager
            | Prulife UK
          </p>
        </div>

        <Profile />

        {/* Insurance Plan HEADER*/}
        <div>
          <BoldText>
            INSURANCE PLAN: PRULINK ASSURANCE ACOUNT PLUS (PROTECTION HEAVY)
          </BoldText>
          <div className="flex text-[white]">
            <div
              className={`${tableEntryDesign} flex-2/12 border-black bg-[#525252]`}
            >
              BENEFITS
            </div>
            <div className={`${tableEntryDesign} border-[black] bg-[#9f0712]`}>
              <BoldText>BEST</BoldText>
              <p>61,228</p>
              <p>(Flexible)</p>
            </div>
            <div className={`${tableEntryDesign} border-[black] bg-[#9f0712]`}>
              <BoldText>BETTER</BoldText>
              <p>36,000</p>
              <p>(Flexible)</p>
            </div>
            <div className={`${tableEntryDesign} border-[black] bg-[#9f0712]`}>
              <BoldText>GOOD</BoldText>
              <p>25,200</p>
              <p>(Flexible)</p>
            </div>
          </div>
        </div>

        {/* Insurance Plan MONTHLY*/}
        <div className="flex">
          <div className={`${tableEntryDesign} flex-2/12`}>
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

        {PROPOSAL_CONTANTS.map((pLine) => (
          <div className="flex">
            {pLine.map((p, i) => (
              <div
                className={`${tableEntryDesign} ${i === 0 && "flex-2/12 items-start"}`}
              >
                {p}
              </div>
            ))}
          </div>
        ))}

        {/* Insurance Plan HEADER*/}
        <div className="flex text-[white]">
          <div className={`${tableEntryDesign} border-black bg-[#525252]`}>
            INVESTMENT PROJECTION
          </div>
          <div
            className={`${tableEntryDesign} flex-[1.77] border-black bg-[#9f0712]`}
          >
            <BoldText>PROJECTED FUND VALUE</BoldText>
          </div>
        </div>

        {PROPOSAL_CONTANTS2.map((pLine) => (
          <div className="flex">
            {pLine.map((p, i) => (
              <div
                className={`${tableEntryDesign} ${i === 0 && "flex-2/12 items-start"}`}
              >
                {p}
              </div>
            ))}
          </div>
        ))}
        <BottomNotes />
        {/* Insurance Plan END*/}
      </div>

      <button
        onClick={handleDownloadPdf}
        className="max-h-fit max-w-fit rounded-lg bg-[#155dfc] px-4 py-2 text-white hover:bg-[#1447e6]"
      >
        Download PDF
      </button>
    </div>
  );
}

function BoldText({ children }) {
  return <span className="font-bold">{children}</span>;
}

function Profile() {
  return (
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
  );
}

function BottomNotes() {
  return (
    <div className="space-y-2 py-4">
      {/* Insurance Notes */}
      <div>
        <BoldText>Insurance Notes:</BoldText>
        <p>*All insurance coverage are GUARANTEED once approved.</p>
        <p>
          *Critical Illness Benefits take effect 90 DAYS after Olic a roval.
        </p>
        <p>
          *Hospital Income Benefits take effect 30 DAYS after policy approval.
          Daily benefit as long as client is confined for at least 12 hours.
        </p>
      </div>
      {/* Investment Notes */}
      <div>
        <BoldText>Investment Notes:</BoldText>
        <p>*Fund value is NOT GUARANTEED</p>
        <p>
          *Fund value is projected at 10% as mandated by Insurance Commission.
        </p>
        <p>
          *Chosen fund: 80% Equity Index Tracker Fund and 20% Global Tech Fund
        </p>
      </div>
    </div>
  );
}
