// components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3">
           <Image 
            src="/img/logo.png" 
            alt="Orbit Logo" 
            width={190} 
            height={48} 
            priority 
          />
          {/* <span className="font-semibold text-lg text-slate-800">Orbit Engineering</span> */}
        </Link>

        <nav className="hidden md:flex gap-8 text-slate-700">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/feature">Features</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>


        {/* mobile menu placeholder (you can add later) */}
      </div>
    </header>
  );
}
