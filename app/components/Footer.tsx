// components/Footer.tsx
import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className=" mx-auto p-4 grid md:grid-cols-4 gap-6">
        <div>
          <Image 
                      src="/img/Orbit_white_logo.png" 
                      alt="Orbit Logo" 
                      width={190} 
                      height={190} 
                      priority 
                    />
          <p className="text-slate-300 text-sm">Leading provider of engineering & infrastructure consultancy services.</p>
        </div>

         <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-slate-300">
           <li>HVAC BIM Modelling </li>
           <li>Coordination and Clash Detection</li>
           <li>Documentation and Shop Drawings</li>
           <li>Site Survey and As-Built Verification</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-slate-300">
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/careers">Careers</a></li>            
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-slate-300 text-sm">info@oespty.com</p>
          <p className="text-slate-300 text-sm"> 0433-219-447</p>
        </div>

      </div>

      <div className="text-center mt-8 text-slate-500 text-sm">
        © {new Date().getFullYear()} Orbit Engineering Services. All rights reserved.
      </div>
    </footer>
  );
}
