// app/about/page.tsx
import { getSheetData } from '../lib/fetchGoogleSheet';
import { generateNextSeo } from 'next-seo/pages';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Services from '../components/FeatureSection';
import Projects from '../components/ProjectSection';
import OurJourney from '../components/OurJourney';
import ManagementTeam from '../components/ManagementTeam';

export const revalidate = 600;

export default async function AboutPage() {
  const rows = await getSheetData('About');
  const journeyRows = await getSheetData('Journey');
  const managementRows = await getSheetData('Management');

  // 🔹 Extract SEO data
  const seo = Object.fromEntries(
    rows
      .filter((r: any) => r.Section === 'SEO' && r.Field && r.Value)
      .map((r: any) => [r.Field, r.Value])
  );

  // 🔹 Extract About data
  const about = Object.fromEntries(
    rows
      .filter((r: any) => r.Section === 'About' && r.Field && r.Value)
      .map((r: any) => [r.Field, r.Value])
  );

  // 🔹 Extract Description subsections dynamically (Our Vision, Our Commitment, etc.)
  const sections = rows
    .filter((r: any) => r.Section === 'Description' && (r.Title || r.Text))
    .map((r: any) => ({
      title: r.Title || '',
      text: r.Text || '',
    }));

  // 🔹 Extract Journey and Management
  const journeyData = journeyRows.filter((r: any) => r.Section === 'Journey');
  const managementData = managementRows.filter((r: any) => r.Section === 'Management');

  // 🔹 SEO metadata
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

      {/* HERO SECTION */}
      <section className="relative h-[200px] flex items-center overflow-hidden">
        {about.Image && (
          <img
            src={`/img/${about.hero}`}
            alt="About Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="container mx-auto relative z-10 px-6">
          <h1 className="text-white text-4xl font-semibold mb-2">About Us</h1>
          <p className="text-slate-200 max-w-2xl">{about.Subtitle}</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="container mx-auto">
        {/* ABOUT SECTION */}
        <section id="about" className="py-20 bg-gradient-to-br from-sky-50 to-teal-50 px-6">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-4">{about.Title}</h2>
              <div
  className="text-slate-700 leading-relaxed"
  dangerouslySetInnerHTML={{ __html: about.Description }}
/>

              {/* Render dynamic subsections */}
              {sections.length > 0 && (
                <div className="space-y-8">
                  {sections.map((s, i) => (
                    <div key={i}>
                      {s.title && (
                        <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
                      )}
                      {s.text && (
                        <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                          {s.text}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {about.Image && (
              <div>
                <img
                  src={`/img/${about.Image}`}
                  alt={about.Title || 'About Image'}
                  className="rounded-lg shadow-lg mx-auto"
                />
              </div>
            )}
          </div>
        </section>

        {/* OTHER SECTIONS */}
        <ManagementTeam data={managementData} />
        <Projects />
        <Services />
        {/* <OurJourney data={journeyData} /> */}
      </main>

      <Footer />
    </>
  );
}
