import { getSheetData } from '../lib/fetchGoogleSheet'
import { generateNextSeo } from 'next-seo/pages'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FeatureCard from '../components/FeatureCard'
import Services from '../components/Services'


export const revalidate = 600

export default async function FeaturesPage() {
  const data = await getSheetData('FeatureList')
  const servicedata = await getSheetData('service')

  // ---- Hero Section ----
  const hero = Object.fromEntries(
    servicedata
      .filter((r: any) => r.Section === 'Hero')
      .map((r: any) => [r.Field, r.Value])
  );

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
<section className="relative h-[200px] flex items-center overflow-hidden">
        <img
          src={`/img/${hero.Image}`}
          alt="Projects Hero"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className=" mx-auto relative z-10 px-6">
          <h1 className="text-white text-4xl font-semibold mb-2">{hero.Title}</h1>
          <p className="text-slate-200 max-w-2xl">{hero.Subtitle}</p>
        </div>
      </section>
<Services ></Services>

      {/* <main className=" mx-auto py-16 px-4">
       
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((f: any) => (
            <FeatureCard key={f.Slug} feature={f} />
          ))}
        </div>
      </main> */}

    {/* CTA Section */}
{/* <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 text-center  mx-auto">
<h2 className="text-2xl font-semibold mb-4">Need a Custom Solution?</h2>
<p className="max-w-2xl mx-auto mb-6">
We offer tailored engineering services to meet your unique project requirements.
</p>
<button className="bg-white text-blue-700 hover:bg-gray-100 font-medium p-5">
Contact Our Team
</button>
</section> */}
<Footer></Footer>
    </>
  )
}
