import Link from 'next/link';
import Logo from './Logo';
import MetaLabel from './ui/MetaLabel';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800/60 bg-[#030509] mt-20 relative">
      {/* Top gradient shadow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-neutral-900/40 to-transparent"></div>
      
      {/* Status bar */}
      <div className="border-b border-neutral-800/40">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-2">
          <MetaLabel className="text-center">
            SYSTEM STATUS: ONLINE / VERSION 3.0
          </MetaLabel>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
        <div className="flex items-center gap-4">
          <div className="h-8 w-auto">
            <Logo width={80} />
          </div>
          <div className="flex flex-col">
            <span className="hidden sm:inline">Tactical Home Solutions</span>
            <span className="text-[10px] text-neutral-600 hidden sm:inline">Operational HQ: Tactical Home Solutions</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Link href="/" className="hover:text-text-primary transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-accent-red hover:after:w-full after:transition-all after:duration-200">
            Home
          </Link>
          <Link href="/about" className="hover:text-text-primary transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-accent-red hover:after:w-full after:transition-all after:duration-200">
            About Us
          </Link>
          <Link href="/services" className="hover:text-text-primary transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-accent-red hover:after:w-full after:transition-all after:duration-200">
            Services
          </Link>
          <Link href="/surveillance" className="hover:text-text-primary transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-accent-red hover:after:w-full after:transition-all after:duration-200">
            Surveillance
          </Link>
          <Link href="/contact" className="hover:text-text-primary transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-accent-red hover:after:w-full after:transition-all after:duration-200">
            Contact
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center md:text-right">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <a href="mailto:info@ths247.com" className="hover:text-text-primary transition-colors">
              info@ths247.com
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="tel:8188253104" className="hover:text-text-primary transition-colors duration-150">
              818-825-3104
            </a>
          </div>
          <p className="text-center md:text-right max-w-xs mt-2 sm:mt-0">
            All training is for educational and hypothetical scenarios only. For real emergencies, dial 911.
          </p>
        </div>
      </div>
    </footer>
  );
}

