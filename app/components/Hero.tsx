import { getSheetData } from "../lib/fetchGoogleSheet";
import HeroClient from "./HeroClient";

export const revalidate = 600; // revalidate every 10 mins

export default async function Hero() {
  // ✅ Fetch sheet data server-side
  const slides = await getSheetData("Hero");

  if (!slides || slides.length === 0) {
    return (
      <section className="h-[70vh] flex items-center justify-center bg-slate-900 text-slate-300">
        Loading hero slides...
      </section>
    );
  }

  // ✅ Pass slides down to client for animation
  return <HeroClient slides={slides} />;
}
