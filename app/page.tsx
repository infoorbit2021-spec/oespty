import { generateNextSeo } from 'next-seo/pages'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Stats, { StatItem } from './components/Stats'
import Services from './components/FeatureSection'
import Projects from './components/ProjectSection'
import GetInTouch from './components/GetInTouch'
import About from './components/About'
import Clients from './components/Clients'
import { getSheetData } from './lib/fetchGoogleSheet'
import Reveal from './components/Reveal'
import { Rows } from 'lucide-react'

export const revalidate = 600

export default async function HomePage() {
  const rows = await getSheetData('Home')
  const statsData = await getSheetData('Stats')
  
  const seo = rows.find((r: any) => r.Section === 'SEO') || {}
  const projectLimitRow = rows.find((r: any) => r.Section === "Projects")
const projectLimit = parseInt(projectLimitRow?.Value || "0", 10)
  const serviceRow = rows.find((r: any) => r.Section === 'services')



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
            <div className='relative'>
            <Reveal>
            
                <Hero />
              
            </Reveal>

           
              <div className='absolute w-full bg-transparent' style={{bottom:"-50px"}}>
              <Stats data={statsData} pathname="/" />
</div>
           
</div>
            <Reveal>
              <section className="ps-4 grid lg:grid-cols-[2fr_1fr] gap-12 items-stretch me-0">
                <div>
                  <Services  limit={4}/>
                </div>
                <div className='pt-10'>
                  <GetInTouch />
                </div>
              </section>
            </Reveal>

            <Reveal>
              <Projects limit={3}/>
            </Reveal>

            <Reveal>
              <About />
            </Reveal>

            <Reveal>
              <Clients />
            </Reveal>
          </main>

        <Footer />
      </body>
    </html>
  )
}
