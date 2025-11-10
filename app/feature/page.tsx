import { getSheetData } from '../lib/fetchGoogleSheet'
import { generateNextSeo } from 'next-seo/pages'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FeatureCard from '../components/FeatureCard'


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
      <Header></Header>
      {/* Hero Section */}
<section className="relative bg-blue-600 text-white py-20">
<div className="absolute inset-0 bg-blue-800/60" />
<div className="relative container mx-auto text-center z-10">
<h1 className="text-4xl font-semibold">Our Services</h1>
</div>
</section>


      <main className="container mx-auto py-16 px-4">
       
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((f: any) => (
            <FeatureCard key={f.Slug} feature={f} />
          ))}
        </div>
      </main>

    {/* CTA Section */}
<section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 text-center container mx-auto">
<h2 className="text-2xl font-semibold mb-4">Need a Custom Solution?</h2>
<p className="max-w-2xl mx-auto mb-6">
We offer tailored engineering services to meet your unique project requirements.
</p>
<button className="bg-white text-blue-700 hover:bg-gray-100 font-medium p-5">
Contact Our Team
</button>
</section>
<Footer></Footer>
    </>
  )
}
