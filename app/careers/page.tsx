// app/careers/page.tsx
import { getSheetData } from '../lib/fetchGoogleSheet';
import { generateNextSeo } from 'next-seo/pages';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const revalidate = 600;

export default async function CareersPage() {
  // Fetch data from Google Sheet
  const rows = await getSheetData('Careers');

  // ---- SEO Section ----
  const seo = Object.fromEntries(
    rows
      .filter((r: any) => r.Section === 'SEO')
      .map((r: any) => [r.Field, r.Value])
  );

  // ---- Hero Section ----
  const hero = Object.fromEntries(
    rows
      .filter((r: any) => r.Section === 'Hero')
      .map((r: any) => [r.Field, r.Value])
  );

  // ---- Openings ----
  // Group rows by "Title" to combine description and highlights together
  const openings: {
    title: string;
    description: string;
    highlight1?: string;
    highlight2?: string;
  }[] = [];

  let current: any = {};

  rows.forEach((r: any) => {
    if (r.Section === 'Openings') {
      if (r.Field === 'Title') {
        // Push previous role if exists
        if (current.title) openings.push(current);
        current = { title: r.Value };
      } else if (r.Field === 'Description') {
        current.description = r.Value;
      } else if (r.Field === 'Highlight1') {
        current.highlight1 = r.Value;
      } else if (r.Field === 'Highlight2') {
        current.highlight2 = r.Value;
      }
    }
  });

  // Push the last one
  if (current.title) openings.push(current);

  // ---- Generate SEO ----
  generateNextSeo({
    title: seo.Title || 'Careers at Orbit Engineering Services',
    description: seo.Description || 'Join our growing engineering team.',
    openGraph: {
      title: seo.Title,
      description: seo.Description,
      url: seo.Canonical,
      images: seo.OGImage ? [{ url: `/img/${seo.OGImage}` }] : [],
    },
  });

  return (
    <>
      <Header />
      <main className="container mx-auto py-16 px-4">
        {/* ===== Hero Section ===== */}
        <section className="relative h-[360px] flex items-center overflow-hidden rounded-2xl mb-16">
          {hero.Image && (
            <img
              src={`/img/${hero.Image}`}
              alt={hero.Title || 'Careers Banner'}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
          <div className="relative z-10 px-6">
            <h1 className="text-white text-4xl font-semibold mb-2">
              {hero.Title}
            </h1>
            <p className="text-slate-200 max-w-xl">{hero.Subtitle}</p>
          </div>
        </section>

        {/* ===== Careers Section ===== */}
        <section id="careers" className="bg-gray-50 rounded-[3rem] py-12 px-8 shadow-md">
          <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            {hero.Subtitle || 'Join Our Team'}
          </h2>

          <p className="text-center text-slate-600 mb-8">
            We are always looking for talented professionals.
            For HR queries, write to:{' '}
            <a
              href={`mailto:${hero.Email}`}
              className="text-blue-600 font-medium hover:underline"
            >
              {hero.Email}
            </a>
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {openings.length > 0 ? (
              openings.map((job, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all"
                >
                  <h3 className="text-lg font-semibold mb-2 text-slate-800">
                    {job.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.highlight1 && (
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm border border-emerald-300">
                        {job.highlight1}
                      </span>
                    )}
                    {job.highlight2 && (
                      <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm border border-cyan-300">
                        {job.highlight2}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 col-span-2">
                No openings available currently.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
