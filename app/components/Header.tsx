// components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3">
          <img src="/img/logo.png" alt="Orbit Logo" className="h-12 w-auto" />
          <span className="font-semibold text-lg text-slate-800">Orbit Engineering</span>
        </Link>

        <nav className="hidden md:flex gap-8 text-slate-700">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/features">Features</Link>
          <Link href="/projects">Projects</Link>
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="px-4 py-2 rounded bg-gradient-to-r from-blue-600 to-teal-400 text-white">
            Get Quote
          </Link>
        </div>

        {/* mobile menu placeholder (you can add later) */}
      </div>
    </header>
  );
}
