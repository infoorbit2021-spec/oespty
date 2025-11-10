// app/about/page.tsx
import { getSheetData } from '../lib/fetchGoogleSheet';
import { generateNextSeo } from 'next-seo/pages';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const revalidate = 600;

export default async function AboutPage() {
  const rows = await getSheetData('About');

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
        <h1 className="text-4xl font-bold mb-4">{about.Title}</h1>
        <p className="text-slate-600 mb-8">{about.Description}</p>

        {about.Image && (
          <img
            src={`/img/${about.Image}`}
            alt={about.Title}
            className="rounded-lg shadow-lg mx-auto"
          />
        )}
      </main>
      <Footer />
    </>
  );
}
