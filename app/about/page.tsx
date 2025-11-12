// app/about/page.tsx
import { getSheetData } from '../lib/fetchGoogleSheet';
import { generateNextSeo } from 'next-seo/pages';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Services from '../components/FeatureSection'
import Projects from '../components/ProjectSection'
import OurJourney from '../components/OurJourney';
import ManagementTeam from '../components/ManagementTeam';

export const revalidate = 600;

export default async function AboutPage() {
  const rows = await getSheetData('About');
  const journeyRows = await getSheetData('Journey');
  const managementRows = await getSheetData('Management');

  const journeyData = journeyRows.filter((r: any) => r.Section === 'Journey');

  const managementData = managementRows.filter((r: any) => r.Section === 'Management');
  const seo = Object.fromEntries(
    rows
      .filter((r: any) => r.Section === 'SEO')
      .map((r: any) => [r.Field, r.Value])
  );

  const about = Object.fromEntries(
    rows
      .filter((r: any) => r.Section === 'About')
      .map((r: any) => [r.Field, r.Value])
  );

  // ✅ Correctly generate SEO metadata
  generateNextSeo({
    title: seo.Title || 'About Us - Orbit Engineering Services',
    description: seo.Description || about.Description,
    openGraph: {
      title: seo.Title || about.Title,
      description: seo.Description || about.Description,
      url: seo.Canonical,
      images: seo.OGImage ? [{ url: `/img/${seo.OGImage}` }] : [],
    },
  });

  return (
    <>
      <Header />
      <main className="container mx-auto py-16 px-4">
        <section className="relative h-[360px] flex items-center overflow-hidden">
        <img
          src={`/img/${about.Image}`}
          alt="Projects Hero"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="container mx-auto relative z-10 px-6">
          <h1 className="text-white text-4xl font-semibold mb-2">About Us</h1>
          <p className="text-slate-200 max-w-2xl">{about.Subtitle}</p>
        </div>
      </section>
       <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">{about.Title}</h2>
          <p className="text-slate-600 mb-4">
            {about.Description}
          </p>
        
        </div>
        <div>
          {about.Image && (
          <img
              src={`/img/${about.Image}`}
              alt={about.Title || 'About Image'}
            className="rounded-lg shadow-lg mx-auto"
          />
        )}
        </div>
      </div>
    </section>
    <ManagementTeam data={managementData}/>
    <Projects />
    <Services />
     <OurJourney data={journeyData} />
      </main>
      <Footer />
    </>
  );
}
