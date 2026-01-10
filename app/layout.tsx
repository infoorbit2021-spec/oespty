import './globals.css'
import { generateNextSeo } from 'next-seo/pages'



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        
        {generateNextSeo({
          title: 'Orbit Engineering Services',
          description: 'Engineering Excellence Through Innovation',
          openGraph: {
            title: 'Orbit Engineering Services',
            description: 'Engineering Excellence Through Innovation',
            url: 'https://orbitengineering.in',
            siteName: 'Orbit Engineering Services',
            type: 'website',
          },
        })}
        <link rel="apple-touch-icon" sizes="180x180" href= {`/img/icon/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`/img/icon/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`/img/icon/favicon-16x16.png`} />
        <link rel="manifest" href={`/img/icon/site.webmanifest`}></link>
      </head>
      <body className="min-h-screen bg-gradient-to-r from-white-900/80 via-white-900/40 to-transparent">
        {children}
      </body>
    </html>
  )
}
