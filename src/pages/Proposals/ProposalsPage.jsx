import PDFGenerator from "../../components/PDFGenerator";

export default function ProposalsPage() {
  return (
    <div className="@container flex flex-1 items-center justify-center">
      <h1 className="flex flex-1 items-center text-2xl font-bold [text-orientation:upright] [writing-mode:vertical-rl] max-xl:hidden">
        PROPOSAL PAGE
      </h1>
      <div className="mx-auto flex max-h-[80dvh] @max-4xl:scale-85 @max-3xl:scale-80 @max-2xl:scale-75">
        <PDFGenerator testingMode={true} />
      </div>
      <h1 className="flex flex-1 items-center text-2xl font-bold [text-orientation:upright] [writing-mode:vertical-rl] max-xl:hidden">
        PROPOSAL PAGE
      </h1>
    </div>
  );
}
