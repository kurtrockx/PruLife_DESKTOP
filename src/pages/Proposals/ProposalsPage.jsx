import PDFGenerator from "../../components/PDFGenerator";

export default function ProposalsPage() {
  return (
    
    <div className="from-white-50 @container flex flex-1 items-center justify-center bg-gradient-to-br via-neutral-300 to-white dark:from-neutral-700 dark:via-neutral-950 dark:to-black">
      <h1 className="flex flex-1 items-center text-2xl font-bold [text-orientation:upright] [writing-mode:vertical-rl] max-xl:hidden dark:text-white">
        PROPOSAL PAGE
      </h1>
      <div className="mx-auto flex max-h-[80dvh] @max-4xl:scale-85 @max-3xl:scale-80 @max-2xl:scale-75">
        <PDFGenerator testingMode={true} />
      </div>
      <h1 className="flex flex-1 items-center text-2xl font-bold [text-orientation:upright] [writing-mode:vertical-rl] max-xl:hidden dark:text-white">
        PROPOSAL PAGE
      </h1>
    </div>
  );
}
