import { getSheetData } from '../lib/fetchGoogleSheet'
import { generateNextSeo } from 'next-seo/pages'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PdfViewer from '../components/PdfViewer'


export const revalidate = 600

export default async function SamplePage() {
  const data = await getSheetData('SampleProjects')

  console.log("data ==================================== ",data);
  

  // // ---- Hero Section ----
  // const hero = Object.fromEntries(
  //   servicedata
  //     .filter((r: any) => r.Section === 'Hero')
  //     .map((r: any) => [r.Field, r.Value])
  // );

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
{/* <section className="relative h-[200px] flex items-center overflow-hidden">
        <img
          src={`/img/${hero.Image}`}
          alt="Projects Hero"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className=" mx-auto relative z-10 px-6">
          <h1 className="text-white text-4xl font-semibold mb-2">{hero.Title}</h1>
          <p className="text-slate-200 max-w-2xl">{hero.Subtitle}</p>
        </div>
      </section> */}

<PdfViewer data={data}></PdfViewer>


<Footer></Footer>
    </>
  )
}
