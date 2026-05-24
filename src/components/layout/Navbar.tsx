import Link from "next/link";

export default function Navbar() {
  return (
    <header id="main-header" className="fixed top-0 left-0 right-0 w-full z-50 pt-5 md:pt-8 px-4 md:px-8 flex justify-center pointer-events-none">
      <nav id="main-navbar" className="spatial-glass rounded-full w-full max-w-4xl px-5 py-2.5 md:px-8 md:py-3 flex items-center justify-between pointer-events-auto shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_35px_rgba(242,125,38,0.15)] border border-white/10 hover:border-white/20 transition-all duration-500 backdrop-saturate-150">
        <div className="text-base md:text-xl font-black tracking-tight text-white uppercase select-none">
          <Link id="navbar-logo" href="/" className="hover:text-brand-orange transition-colors duration-300">
            J.R. Olaño
          </Link>
        </div>
        <ul className="flex items-center space-x-4 md:space-x-8 text-[11px] font-semibold text-white/80 tracking-wider uppercase">
          <li>
            <Link 
              id="navbar-link-about"
              href="/#about" 
              className="transition-all duration-300 hover:text-brand-orange block"
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              id="navbar-link-projects"
              href="/#projects" 
              className="transition-all duration-300 hover:text-brand-orange block"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link 
              id="navbar-link-experience"
              href="/#experience" 
              className="transition-all duration-300 hover:text-brand-orange block"
            >
              Experience
            </Link>
          </li>
          <li>
            <Link 
              id="navbar-link-contact"
              href="/#contact" 
              className="transition-all duration-300 hover:text-brand-orange block"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
