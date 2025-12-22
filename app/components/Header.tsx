'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react'; // hamburger icons

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Sample Projects', href: '/sample-projects' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className=" mx-auto px-4 flex items-center justify-between h-20">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/img/logo.PNG"
            alt="Orbit Logo"
            width={190}
            height={190}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-slate-700 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative transition ${
                pathname === item.href
                  ? 'text-[#8cccd4] font-semibold'
                  : 'hover:text-[#8cccd4]'
              }`}
            >
              {item.name}

              {/* underline visible only when active */}
              {pathname === item.href && (
                <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#8cccd4] rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-700"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <nav className="md:hidden flex flex-col gap-5 px-6 pb-6 text-slate-700 bg-white border-t shadow-lg animate-slideDown">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block py-2 border-b last:border-none ${
                pathname === item.href
                  ? 'text-[#8cccd4] font-semibold'
                  : 'hover:text-[#8cccd4]'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
