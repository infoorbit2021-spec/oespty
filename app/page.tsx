import { generateNextSeo } from 'next-seo/pages'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/FeatureSection'
import Projects from './components/ProjectSection'
import GetInTouch from './components/GetInTouch'
import About from './components/About'
import Clients from './components/Clients'
import { getSheetData } from './lib/fetchGoogleSheet'

export const revalidate = 600

export default async function HomePage() {
  const rows = await getSheetData('Home')
  
  const seo = rows.find((r: any) => r.Section === 'SEO') || {}

  return (
    <html lang="en">
      <head>
        {generateNextSeo({
          title: seo.Title || 'Orbit Engineering Services',
          description: seo.Description || 'Engineering Excellence Through Innovation',
          openGraph: {
            title: seo.Title || 'Orbit Engineering Services',
            description: seo.Description || 'Engineering Excellence Through Innovation',
            url: seo.Canonical || 'https://orbitengineering.in',
            images: seo.OGImage ? [{ url: `/img/${seo.OGImage}` }] : [],
          },
        })}
      </head>
      <body className="min-h-screen bg-white text-slate-800">
        <Header />
        <main>
          <Hero />
          <Stats />
           <section className="container ps-4 grid lg:grid-cols-[2fr_1fr] gap-12 items-stretch me-0">
              <div>
                
                <Services />
              </div>

              <div >
              
                <GetInTouch />
              </div>
            </section>
          <Projects />
          <About />
          <Clients />
        </main>
        <Footer />
      </body>
    </html>
  )
}
