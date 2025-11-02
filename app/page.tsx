import { getSheetData } from './lib/fetchGoogleSheet';
import Hero from './components/Hero';
import Stats from './components/Stats';
import { generateNextSeo } from 'next-seo/pages';
import Header from './components/Header';
import Footer from './components/Footer';

export const revalidate = 600;

export default async function HomePage() {
  const homeRows = await getSheetData('Home');

  const homeObj: Record<string, Record<string, string>> = {};
  for (const r of homeRows) {
    const section = r.Section || r.section || '';
    const field = r.Field || r.field || '';
    const value = r.Value || r.value || '';
    if (!section) continue;
    homeObj[section] = homeObj[section] || {};
    homeObj[section][field] = value;
  }

  const seo = homeObj['SEO'] || {};
  const stats = homeRows
    .filter((r) => (r.Section || r.section) === 'Stat')
    .map((r) => ({
      Label: r.Label || r.Field || '',
      Count: r.Count || r.Value || '',
    }));

  return (
    <html lang="en">
      <head>
        {generateNextSeo({
          title: seo.Title || 'Orbit Engineering Services',
          description: seo.Description || 'Engineering Excellence Through Innovation',
          openGraph: {
            title: seo.Title,
            description: seo.Description,
            url: seo.Canonical,
            images: seo.OGImage ? [{ url: `/img/${seo.OGImage}` }] : [],
          },
        })}
      </head>
      <body>
        <Header />
        <main>
          <Hero
            title={homeObj['Hero']?.Title}
            subtitle={homeObj['Hero']?.Subtitle}
            ctaText={homeObj['Hero']?.CTA}
            image={homeObj['Hero']?.Image}
          />
          <Stats data={stats} />
        </main>
        <Footer />
      </body>
    </html>
  );
}
