import { getSheetData } from '../lib/fetchGoogleSheet'
import { generateNextSeo } from 'next-seo/pages'
import FeatureCard from './FeatureCard'

export const revalidate = 600

export default async function FeaturesPage() {
  const data = await getSheetData('FeatureList')

  return (
    <>
      {generateNextSeo({
        title: 'Features - Orbit Engineering Services',
        description: 'Explore our specialized engineering and BIM services.',
        openGraph: {
          title: 'Features',
          description: 'Explore our specialized engineering and BIM services.',
          url: 'https://orbitengineering.in/features',
        },
      })}
      <main className="  mx-auto max-w-5xl py-16 px-4">
        <h1 className="text-4xl font-bold mb-8 px-6">Our Services</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-10 px-6">
          {data.map((f: any) => (
            <FeatureCard key={f.Slug} feature={f} />
          ))}
        </div>
      </main>

    
    </>
  )
}
