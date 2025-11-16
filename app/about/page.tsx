// app/about/page.tsx
import { getSheetData } from '../lib/fetchGoogleSheet';
import { generateNextSeo } from 'next-seo/pages';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Services from '../components/FeatureSection';
import Projects from '../components/ProjectSection';
import ManagementTeam from '../components/ManagementTeam';

export const revalidate = 600;

export default async function AboutPage() {
  const rows = await getSheetData('About');
  const journeyRows = await getSheetData('Journey');
  const managementRows = await getSheetData('Management');

  // SEO
  const seo = Object.fromEntries(
    rows
      .filter((r: any) => r.Section === 'SEO' && r.Field && r.Value)
      .map((r: any) => [r.Field, r.Value])
  );

  // About Details
  const about = Object.fromEntries(
    rows
      .filter((r: any) => r.Section === 'About' && r.Field && r.Value)
      .map((r: any) => [r.Field, r.Value])
  );

  // Dynamic Description Blocks
  const sections = rows
    .filter((r: any) => r.Section === 'Description')
    .filter((r: any) => r.Title?.trim() || r.Text?.trim())
    .map((r: any) => ({
      title: r.Title?.trim(),
      text: r.Text?.trim(),
      parallax: r.Parallax || r.parallax || '',
    }));

  const journeyData = journeyRows.filter((r: any) => r.Section === 'Journey');
  const managementData = managementRows.filter((r: any) => r.Section === 'Management');

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

  const overlayColors = [
    "bg-rose-100/70 dark:bg-rose-900/60",
    "bg-indigo-100/70 dark:bg-indigo-900/60",
    "bg-emerald-100/70 dark:bg-emerald-900/60",
    "bg-amber-100/70 dark:bg-amber-900/60",
    "bg-sky-100/70 dark:bg-sky-900/60",
    "bg-violet-100/70 dark:bg-violet-900/60",
  ];

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

        {/* FIRST ABOUT SECTION → PARALLAX */}
        <section
          className="relative py-28 px-8 bg-fixed bg-center bg-cover text-slate-900"
          style={{ backgroundImage: `url(/img/${about.Image})` }}
        >
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
          <div className="relative container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold mb-6">{about.Title}</h2>
            <div
              className="text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: about.Description }}
            />
          </div>
        </section>

        {/* DYNAMIC SUBSECTIONS */}
        {sections.map((s, i) => {
          const isParallax = ['true', 'yes', '1'].includes(String(s.parallax).toLowerCase());
          const overlayColor = overlayColors[i % overlayColors.length];

          return (
            <section
              key={i}
              className="relative py-28 px-8 bg-fixed bg-center bg-cover"
              style={{ backgroundImage: `url(/img/${about.Image})` }}
            >
              <div className={`absolute inset-0 backdrop-blur-sm ${overlayColor}`} />

              <div className="relative max-w-4xl mx-auto text-center">
                {s.title && <h3 className="text-4xl font-semibold mb-6">{s.title}</h3>}

                {s.text && (
                  <div
                    className="prose prose-lg mx-auto text-black"
                    dangerouslySetInnerHTML={{ __html: s.text }}
                  />
                )}
              </div>
            </section>
          );
        })}

        {/* UNCHANGED SECTIONS */}
        <ManagementTeam data={managementData} />
        <Projects />
        <Services />
      </main>

      <Footer />
    </>
  );
}
