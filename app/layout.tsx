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
      </head>
      <body className="min-h-screen bg-white text-slate-800">
        {children}
      </body>
    </html>
  )
}
