import { useEffect, useRef, useState } from "react";
import { uploadPdfAndSaveToFirestore } from "../backend/firebase_firestore"; // your firebase helper
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import prulifeIcon2 from "../assets/prulifeIcon2.png";
import { PART1, PART2, PART3 } from "../proposalComputations";
import { fetchAllUsers } from "../backend/firebase_firestore";

const AGE_OPTIONS = Array.from({ length: 59 }, (_, i) => i); // 0–60

export default function PDFGenerator({ testingMode = false }) {
  const { clientId } = useParams();
  const printRef = useRef();
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [clientAge, setClientAge] = useState(0);
  const [client, setClient] = useState(null);

  // Custom alert state
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    const getClients = async () => {
      const users = await fetchAllUsers();
      setClient(users.find((c) => c.id === clientId));
    };
    getClients();
  }, [clientId]);

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleUploadPdf = async () => {
    try {
      setLoading(true);

      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg");

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [215.9, 279.4],
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

      const pdfBlob = pdf.output("blob");
      const pdfFile = new File([pdfBlob], "proposal.pdf", {
        type: "application/pdf",
      });

      const cloudUrl = await uploadPdfAndSaveToFirestore(clientId, pdfFile);
      if (!cloudUrl) throw new Error("Upload failed");

      setUploadedUrl(cloudUrl);

      // Optional: Download PDF locally
      const res = await fetch(cloudUrl);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "proposal.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);

      showAlert(
        <h1 className="dark:text-white">✅ PDF sent to ${client.fullname}!</h1>,
      );
    } catch (err) {
      console.error("PDF upload failed:", err);
      showAlert(
        <h1 className="dark:text-white">
          ❌ Could not send the PDF to the client. Please try again.
        </h1>,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 overflow-hidden overflow-y-auto bg-[#313131] p-6 text-xs dark:bg-[#161616]">
      {/* Dropdown for Age */}
      <div className="flex items-center justify-center gap-4 text-white">
        <div className="flex flex-col">
          <label htmlFor="age" className="mb-2 text-sm font-medium text-white">
            Select Client Age
          </label>
          <select
            id="age"
            value={clientAge}
            onChange={(e) => setClientAge(Number(e.target.value))}
            className="w-40 cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 shadow-md ring-[#f0b100] transition duration-100 ease-in-out hover:ring-2 focus:border-[#f0b100] focus:ring-2 focus:outline-none"
          >
            {AGE_OPTIONS.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>
        {!testingMode && (
          <button
            onClick={handleUploadPdf}
            disabled={loading}
            className="h-full max-w-fit cursor-pointer self-end rounded-lg bg-[#f0b100] px-4 py-2 text-[black] hover:bg-[#d08700]"
          >
            {loading ? "Generating PDF..." : "Generate & Send PROPOSAL"}
          </button>
        )}
      </div>

      {uploadedUrl && (
        <div className="mt-2 text-center text-white">
          <p>Click here if PDF doesn't download within 10 seconds:</p>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline"
          >
            {uploadedUrl}
          </a>
        </div>
      )}

      <div
        ref={printRef}
        className="force-rgb h-[1056px] w-[816px] border bg-[white] p-5 shadow-lg"
      >
        <Proposal clientAge={clientAge} client={client} />
      </div>

      {/* Custom alert modal */}
      {alertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex w-full max-w-sm flex-col justify-center rounded bg-white p-6 shadow-lg dark:bg-neutral-900">
            <p className="mb-4">{alertMessage}</p>
            <button
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              onClick={() => setAlertOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Proposal({ clientAge, client }) {
  return (
    <>
      <Quotation clientAge={clientAge} />
      <Part1Header />
      <Part1Table clientAge={clientAge} />
      <Part2Header />
      <Part2Table clientAge={clientAge} />
      <Part3Header />
      <Part3Table clientAge={clientAge} />
      <ClientDetails client={client} />
    </>
  );
}

function BoldText({ children }) {
  return <span className="font-bold">{children}</span>;
}

function Quotation({ clientAge }) {
  return (
    <div className="bg-[#9f0712] p-2 text-[white]">
      QUOTATION FOR CLIENT AGE: {clientAge}
    </div>
  );
}
function Part1Header() {
  return (
    <div className="border-x">
      <div className="bg-[black] p-2 text-[white]">
        PART I: LIFE INSURANCE COVERAGE
      </div>
      <div className="grid max-h-20 grid-cols-8 divide-x text-[0.45rem]">
        <div className="col-span-3 flex max-h-20">
          <img
            src={prulifeIcon2}
            alt="prulife"
            className="max-w-20 object-contain"
          />
          <div className="flex flex-1 flex-col justify-center text-[.6rem]">
            <h4>Proposal Prepared by:</h4>
            <BoldText>Prulife Protectors</BoldText>
          </div>
        </div>

        <div className="col-span-2 flex flex-col bg-[#ffc9c9]">
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
        <div className="col-span-3 flex flex-col bg-[#bedbff]">
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
      <div className="bg-[black] p-2 text-[white]">
        PART II: PROJECTION OF INVESTMENT/ WITHDRAWABLE SAVINGS
      </div>
      <div className="grid max-h-20 grid-cols-8 divide-x text-[0.45rem]">
        <div className="col-span-3 flex h-20">
          <div className="flex flex-1 items-center justify-center border-r">
            POLICY YEAR
          </div>
          <div className="flex flex-1 items-center justify-center">AGE</div>
        </div>

        <div className="col-span-2 flex flex-col bg-[#ffc9c9]">
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
        <div className="col-span-3 flex flex-col bg-[#bedbff]">
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
      <div className="bg-[black] p-2 text-[white]">
        PART III: FUND ALLOCATION{" "}
      </div>
    </div>
  );
}
function Part3Table({ clientAge }) {
  const client = PART3.find((p) => p.age === clientAge);
  const { content } = client;

  return (
    <div className="border-b">
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
    </div>
  );
}

function ClientDetails({ client }) {
  console.log(client);
  return (
    <div className="mt-10 flex items-center justify-between gap-20">
      <h1 className="max-w-md">
        Sample Proposal only. Still subject for approval. Best to talk with a
        licensed Financial Consultant for a Personalized Plan.
      </h1>
      <div className="space-y-px text-right">
        {client && (
          <>
            <BoldText>Client Details</BoldText>
            <p className="capitalize">{client.fullname}</p>
            <p className="text-[#155dfc]">{client.email}</p>
          </>
        )}
      </div>
    </div>
  );
}
