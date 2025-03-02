import { FlipWords } from "@/components/ui/flip-words";

export default function Footer() {
  const words = ["Aden...", "Othman."];
  return (
    <footer className="bg-white dark:bg-black text-gray-700 dark:text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <hr />
        <div className="text-sm text-center p-7">
          Brought to you by
          <FlipWords className="font-semibold" words={words} />
        </div>
      </div>
    </footer>
  );
}
