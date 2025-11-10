// components/Footer.tsx
import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-6">
        <div>
          <Image 
                      src="/img/logo.png" 
                      alt="Orbit Logo" 
                      width={190} 
                      height={190} 
                      priority 
                    />
          <p className="text-slate-400 text-sm">Leading provider of engineering & infrastructure consultancy services.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="/about">About Us</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/projects">Projects</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-slate-400 text-sm">info@orbit-eng.com</p>
          <p className="text-slate-400 text-sm">+1 (555) 123-4567</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow</h4>
          <p className="text-slate-400 text-sm">Twitter · LinkedIn</p>
        </div>
      </div>

      <div className="text-center mt-8 text-slate-500 text-sm">
        © {new Date().getFullYear()} Orbit Engineering Services. All rights reserved.
      </div>
    </footer>
  );
}
