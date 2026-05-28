import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuoteForm } from "./QuoteForm";

export default function GetQuotePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f5f5f7]">
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}
