import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 px-4 py-4 sm:px-6 lg:px-8 flex justify-center pointer-events-none">
      <nav className="spatial-glass rounded-full w-full max-w-4xl px-6 py-4 flex items-center justify-between pointer-events-auto">
        <div className="text-xl font-bold tracking-tight text-white">
          <Link href="/">J.R. Olaño</Link>
        </div>
        <ul className="flex items-center space-x-8 text-sm font-medium text-white/80 tracking-wide">
          <li>
            <Link 
              href="#projects" 
              className="transition-opacity duration-300 hover:opacity-60"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link 
              href="#experience" 
              className="transition-opacity duration-300 hover:opacity-60"
            >
              Experience
            </Link>
          </li>
          <li>
            <Link 
              href="#contact" 
              className="transition-opacity duration-300 hover:opacity-60"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
