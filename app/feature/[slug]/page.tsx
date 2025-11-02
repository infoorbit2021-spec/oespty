import { getSheetData } from '../../lib/fetchGoogleSheet'
import { generateNextSeo } from 'next-seo/pages'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export async function generateStaticParams() {
  const rows = await getSheetData('FeatureDetail')
  return rows.map((r) => ({ slug: r.Slug }))
}

export const revalidate = 600

export default async function FeatureDetail({ params }: { params: { slug: string } }) {
  const rows = await getSheetData('FeatureDetail')
  const feature = rows.find((f) => f.Slug === params.slug)

  if (!feature) {
    return (
      <html lang="en">
        <head>{generateNextSeo({ title: 'Feature Not Found' })}</head>
        <body><Header /><main className="container mx-auto py-16">Feature not found.</main><Footer /></body>
      </html>
    )
  }

  const keyPoints = feature.KeyPoints?.split(',').map((s) => s.trim()) ?? []
  const benefits = feature.Benefits?.split(',').map((s) => s.trim()) ?? []

  return (
    <html lang="en">
      <head>
        {generateNextSeo({
          title: feature.SEO_Title || feature.Title,
          description: feature.SEO_Description || feature.Intro,
          openGraph: {
            title: feature.SEO_Title,
            description: feature.SEO_Description,
            url: feature.SEO_Canonical,
            images: feature.SEO_OGImage ? [{ url: `/img/${feature.SEO_OGImage}` }] : [],
          },
        })}
      </head>
      <body>
        <Header />
        <main className="container mx-auto py-16 px-4">
          {feature.HeroImage && (
            <img src={`/img/${feature.HeroImage}`} alt={feature.Title} className="w-full rounded-lg mb-8" />
          )}
          <h1 className="text-4xl font-bold mb-4">{feature.Title}</h1>
          <p className="text-slate-600 mb-6">{feature.Intro}</p>

          <h2 className="text-2xl font-semibold mb-3">Key Points</h2>
          <ul className="list-disc list-inside mb-6 text-slate-700">
            {keyPoints.map((kp, i) => <li key={i}>{kp}</li>)}
          </ul>

          <h2 className="text-2xl font-semibold mb-3">Benefits</h2>
          <ul className="list-disc list-inside text-slate-700">
            {benefits.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </main>
        <Footer />
      </body>
    </html>
  )
}
