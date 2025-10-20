import PDFGenerator from "../../components/PDFGenerator";

export default function ProposalsPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <h1 className="flex flex-1 items-center text-2xl font-bold [text-orientation:upright] [writing-mode:vertical-rl]">
        PROPOSAL PAGE
      </h1>
      <div className="mx-auto flex max-h-[80dvh]">
        <PDFGenerator testingMode={true} />
      </div>
      <h1 className="flex flex-1 items-center text-2xl font-bold [text-orientation:upright] [writing-mode:vertical-rl]">
        PROPOSAL PAGE
      </h1>
    </div>
  );
}
