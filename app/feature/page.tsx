import { getSheetData } from '../lib/fetchGoogleSheet'
import { generateNextSeo } from 'next-seo/pages'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FeatureCard from '../components/FeatureCard'

export const revalidate = 600

export default async function FeaturesPage() {
  const data = await getSheetData('FeatureList')

  return (
    <html lang="en">
      <head>
        {generateNextSeo({
          title: 'Features - Orbit Engineering Services',
          description: 'Explore our specialized engineering and BIM services.',
          openGraph: {
            title: 'Features',
            description: 'Explore our specialized engineering and BIM services.',
            url: 'https://orbitengineering.in/features',
          },
        })}
      </head>
      <body>
        <Header />
        <main className="container mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-8">Our Features</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((f) => (
              <FeatureCard key={f.Slug} feature={f} />
            ))}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
