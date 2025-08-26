import { mockTemplate } from "@/lib/mock-contract";
import { ContractSheet } from "@/components/ContractSheet";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <ContractSheet template={mockTemplate} />
    </main>
  );
}