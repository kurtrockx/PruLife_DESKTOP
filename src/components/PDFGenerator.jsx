import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import prulifeIcon2 from "../assets/prulifeIcon2.png";
import { PART1, PART2, PART3 } from "../proposalComputations";

export default function PDFGenerator() {
  const { clientId } = useParams();
  const printRef = useRef();
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [clientAge, setClientAge] = useState(50);

  // ✅ Upload PDF to Cloudinary
  const uploadPDFToCloudinary = async (pdfBlob) => {
    const cloudName = "dsoetkfjz"; // Your Cloudinary cloud name
    const uploadPreset = "PDFGenerator"; // Your unsigned preset
    const timestamp = Date.now();

    const formData = new FormData();
    formData.append("file", pdfBlob);
    formData.append("upload_preset", uploadPreset);
    formData.append("public_id", `proposal_${timestamp}`); // unique name

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      { method: "POST", body: formData },
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Upload failed");
    return data.secure_url; // public Cloudinary URL
  };
  // ✅ Force PDF download with correct extension
  const downloadPDF = async (url, filename = "proposal.pdf") => {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename; // force .pdf extension
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  };
  const handleUploadPdf = async () => {
    try {
      setLoading(true);

      const element = printRef.current;
      await new Promise((r) => setTimeout(r, 100)); // wait for layout paint

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg");

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [215.9, 279.4], // US Letter
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

      const pdfBlob = pdf.output("blob");

      // Upload to Cloudinary
      const uploadedUrl = await uploadPDFToCloudinary(pdfBlob);
      setUploadedUrl(uploadedUrl);

      // Download locally with proper .pdf
      await downloadPDF(uploadedUrl, "proposal.pdf");

      alert("✅ PDF uploaded and downloaded successfully!");
    } catch (err) {
      console.error("PDF upload failed:", err);
      alert("❌ PDF upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 overflow-hidden overflow-y-auto bg-[#292524] p-6 text-xs">
      <button
        onClick={handleUploadPdf}
        disabled={loading}
        className="max-h-fit max-w-fit cursor-pointer rounded-lg bg-[#f0b100] px-4 py-2 text-white hover:bg-[#d08700]"
      >
        {loading ? "Generating PDF..." : "Generate and Send PDF"}
      </button>
      <div
        ref={printRef}
        className="force-rgb h-[1056px] w-[816px] border bg-white p-5 shadow-lg"
      >
        <Proposal clientAge={clientAge} />
      </div>
    </div>
  );
}

function Proposal({ clientAge }) {
  return (
    <>
      <Quotation clientAge={clientAge} />
      <Part1Header />
      <Part1Table clientAge={clientAge} />
      <Part2Header />
      <Part2Table clientAge={clientAge} />
      <Part3Header />
      <Part3Table clientAge={clientAge} />
    </>
  );
}

function BoldText({ children }) {
  return <span className="font-bold">{children}</span>;
}

function Quotation({ clientAge }) {
  return (
    <div className="bg-red-800 p-2 text-white">
      QUOTATION FOR CLIENT AGE: {clientAge}
    </div>
  );
}
function Part1Header() {
  return (
    <div className="border-x">
      <div className="bg-black text-white p-2">PART I: LIFE INSURANCE COVERAGE</div>
      <div className="grid max-h-20 grid-cols-8 divide-x text-[0.45rem]">
        <div className="col-span-3 flex max-h-20">
          <img
            src={prulifeIcon2}
            alt="prulife"
            className="max-w-20 object-contain"
          />
          <div className="flex flex-1 flex-col justify-center">
            <h4>Proposal Prepared by:</h4>
            <BoldText>MA. MIKAELLA PRIAS MARIANO</BoldText>
            <BoldText>Agent License: 7013****</BoldText>
            <h5>Premiere Level Financial Advisor</h5>
            <h5>Premiere Level Financial Advisor</h5>
            <h5>Asst. Unit Manager</h5>
          </div>
        </div>

        <div className="col-span-2 flex flex-col bg-red-200">
          <div className="flex h-full flex-1 items-center px-8 text-center">
            <BoldText>
              PRULink Assurance Account Plus (PAA+) Continuous Savings Plan
            </BoldText>
          </div>
          <div className="flex flex-1 items-center border-t">
            <div className="flex h-full flex-1 flex-col items-center justify-center border-r">
              <h4>83 Pesos Per Day or</h4>
              <h4>₱2,500/ month</h4>
            </div>
            <div className="flex h-full flex-1 flex-col items-center justify-center">
              <h4>100 Pesos Per Day or</h4>
              <h4>₱3,000/ month</h4>
            </div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col bg-blue-200">
          <div className="flex h-full flex-1 items-center px-16 text-center">
            <BoldText>
              Elite Savings Plan | Investment-Focused Plans 5, 10 & 15 Year
              Saving Program
            </BoldText>
          </div>
          <div className="flex flex-1 items-center border-t">
            <div className="flex h-full flex-1 flex-col items-center justify-center border-r">
              <h4>242 Pesos Per Day or</h4>
              <h4>₱7,250/ month</h4>
              <h4>PAYABLE FOR 15 YEARS</h4>
            </div>
            <div className="flex h-full flex-1 flex-col items-center justify-center border-r">
              <h4>333 Pesos Per Day</h4>
              <h4>₱10,000/ month</h4>
              <h4>PAYABLE FOR 10 YEARS</h4>
            </div>
            <div className="flex h-full flex-1 flex-col items-center justify-center">
              <h4>567 Pesos Per Day</h4>
              <h4>₱17,000/ month</h4>
              <h4>PAYABLE FOR 5 YEARS</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function TableLayout({ children }) {
  return (
    <>
      <div className="grid grid-cols-16 text-[0.45rem]">{children}</div>
    </>
  );
}

function Part1Table({ clientAge }) {
  const client = PART1.find((p) => p.age === clientAge);
  const { content1 } = client;
  const { content2 } = client;
  const { content3 } = client;

  return (
    <div className="border-b">
      <TableLayout>
        <div className="col-span-1 flex items-center justify-center border tracking-[-0.125rem] [text-orientation:upright] [writing-mode:vertical-rl]">
          CODE BENEFITS
        </div>
        <div className="col-span-15 grid grid-cols-15">
          {content1.map((row) => {
            return (
              <>
                <div className="col-span-5 flex divide-x border-r">
                  <TextRow>{row.title}</TextRow>
                  <TextRow>{row.description}</TextRow>
                </div>
                <div className="col-span-4 flex divide-x border-r">
                  <TextRow>{row.red1}</TextRow>
                  <TextRow>{row.red2}</TextRow>
                </div>
                <div className="col-span-6 flex divide-x border-r">
                  <TextRow>{row.blue1}</TextRow>
                  <TextRow>{row.blue2}</TextRow>
                  <TextRow>{row.blue3}</TextRow>
                </div>
              </>
            );
          })}
        </div>
      </TableLayout>
      <TableLayout>
        <div className="col-span-1 flex flex-col items-center justify-center border tracking-[-0.125rem] [text-orientation:upright] [writing-mode:vertical-rl]">
          <p>RIDERS</p>
          <p>PERSONAL ACCIDENT</p>
        </div>
        <div className="col-span-15 grid grid-cols-15">
          {content2.map((row) => {
            return (
              <>
                <div className="col-span-5 flex divide-x border-r">
                  <TextRow>{row.title}</TextRow>
                  <TextRow>{row.description}</TextRow>
                </div>
                <div className="col-span-4 flex divide-x border-r">
                  <TextRow>{row.red1}</TextRow>
                  <TextRow>{row.red2}</TextRow>
                </div>
                <div className="col-span-6 flex divide-x border-r">
                  <TextRow>{row.blue1}</TextRow>
                  <TextRow>{row.blue2}</TextRow>
                  <TextRow>{row.blue3}</TextRow>
                </div>
              </>
            );
          })}
        </div>
      </TableLayout>
      <TableLayout>
        <div className="col-span-1 flex items-center justify-center border p-1">
          Hospital Income Riders
        </div>
        <div className="col-span-15 grid grid-cols-15">
          {content3.map((row) => {
            return (
              <>
                <div className="col-span-5 flex divide-x border-r">
                  <TextRow>{row.title}</TextRow>
                  <TextRow>{row.description}</TextRow>
                </div>
                <div className="col-span-4 flex divide-x border-r">
                  <TextRow>{row.red1}</TextRow>
                  <TextRow>{row.red2}</TextRow>
                </div>
                <div className="col-span-6 flex divide-x border-r">
                  <TextRow>{row.blue1}</TextRow>
                  <TextRow>{row.blue2}</TextRow>
                  <TextRow>{row.blue3}</TextRow>
                </div>
              </>
            );
          })}
        </div>
      </TableLayout>
    </div>
  );
}
function TextRow({ children }) {
  return (
    <p className="flex flex-1 items-center justify-center border-t p-0.5">
      {children}
    </p>
  );
}

function Part2Header() {
  return (
    <div className="border-x">
      <div className="bg-black p-2 text-white">
        PART II: PROJECTION OF INVESTMENT/ WITHDRAWABLE SAVINGS
      </div>
      <div className="grid max-h-20 grid-cols-8 divide-x text-[0.45rem]">
        <div className="col-span-3 flex">
          <div className="flex flex-1 items-center justify-center border-r">
            POLICY YEAR
          </div>
          <div className="flex flex-1 items-center justify-center">AGE</div>
        </div>
        <div className="col-span-2 flex flex-col bg-red-200">
          <div className="flex h-full flex-1 items-center px-8 text-center">
            <BoldText>
              PRULink Assurance Account Plus (PAA+) Continuous Savings Plan
            </BoldText>
          </div>
          <div className="flex flex-1 items-center border-t">
            <div className="flex h-full flex-1 flex-col items-center justify-center border-r">
              <h4>83 Pesos Per Day or</h4>
              <h4>₱2,500/ month</h4>
            </div>
            <div className="flex h-full flex-1 flex-col items-center justify-center">
              <h4>100 Pesos Per Day or</h4>
              <h4>₱3,000/ month</h4>
            </div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col bg-blue-200">
          <div className="flex h-full flex-1 items-center px-16 text-center">
            <BoldText>
              Elite Savings Plan | Investment-Focused Plans 5, 10 & 15 Year
              Saving Program
            </BoldText>
          </div>
          <div className="flex flex-1 items-center border-t">
            <div className="flex h-full flex-1 flex-col items-center justify-center border-r">
              <h4>242 Pesos Per Day or</h4>
              <h4>₱7,250/ month</h4>
              <h4>PAYABLE FOR 15 YEARS</h4>
            </div>
            <div className="flex h-full flex-1 flex-col items-center justify-center border-r">
              <h4>333 Pesos Per Day</h4>
              <h4>₱10,000/ month</h4>
              <h4>PAYABLE FOR 10 YEARS</h4>
            </div>
            <div className="flex h-full flex-1 flex-col items-center justify-center">
              <h4>567 Pesos Per Day</h4>
              <h4>₱17,000/ month</h4>
              <h4>PAYABLE FOR 5 YEARS</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Part2Table({ clientAge }) {
  const client = PART2.find((p) => p.age === clientAge);
  const { content } = client;
  console.log(content);

  return (
    <>
      {content.map((row) => (
        <TableLayout>
          <div className="col-span-6 flex divide-x border-x">
            <TextRow>{row.policyYear}</TextRow>
            <TextRow>{row.age}</TextRow>
          </div>
          <div className="col-span-4 flex divide-x border-r">
            <TextRow>{row.red1}</TextRow>
            <TextRow>{row.red2}</TextRow>
          </div>
          <div className="col-span-6 flex divide-x border-r">
            <TextRow>{row.blue1}</TextRow>
            <TextRow>{row.blue2}</TextRow>
            <TextRow>{row.blue3}</TextRow>
          </div>
        </TableLayout>
      ))}
    </>
  );
}

function Part3Header() {
  return (
    <div className="border-x">
      <div className="bg-black p-2 text-white">PART III: FUND ALLOCATION </div>
    </div>
  );
}
function Part3Table({ clientAge }) {
  const client = PART3.find((p) => p.age === clientAge);
  const { content } = client;
  console.log(content);

  return (
    <>
      <TableLayout>
        <div className="col-span-6 flex divide-x border-x">
          <TextRow>PLAN</TextRow>
          <TextRow>1ST YEAR</TextRow>
        </div>
        <div className="col-span-4 flex divide-x border-r">
          <TextRow>2ND YEAR</TextRow>
          <TextRow>3RD YEAR</TextRow>
        </div>
        <div className="col-span-2 flex divide-x border-r">
          <TextRow>FOURTH YEAR</TextRow>
        </div>
        <div className="col-span-4 flex divide-x border-r">
          <TextRow>FIFTH YEAR</TextRow>
        </div>
      </TableLayout>
      {content.map((row) => (
        <TableLayout>
          <div className="col-span-6 flex divide-x border-x">
            <TextRow>{row.plan}</TextRow>
            <TextRow>{row.first}</TextRow>
          </div>
          <div className="col-span-4 flex divide-x border-r">
            <TextRow>{row.second}</TextRow>
            <TextRow>{row.third}</TextRow>
          </div>
          <div className="col-span-2 flex divide-x border-r">
            <TextRow>{row.fourth}</TextRow>
          </div>
          <div className="col-span-4 flex divide-x border-r">
            <TextRow>{row.fifth}</TextRow>
          </div>
        </TableLayout>
      ))}
    </>
  );
}
