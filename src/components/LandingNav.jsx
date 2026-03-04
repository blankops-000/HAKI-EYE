import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function LandingNav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="kenya-flag-band" />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight text-navy">
          UWAZI-EYE
        </Link>
        <ThemeToggle />
        <nav className="hidden gap-6 text-sm font-medium md:flex" aria-label="Main navigation">
          <a href="#about" className="text-slate-600 hover:text-kenyaRed">
            About
          </a>
          <NavLink to="/dashboard" className="text-slate-600 hover:text-kenyaRed">
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/methodology" className="text-slate-600 hover:text-kenyaGreen">
            Methodology
          </NavLink>
        </nav>
      </div>
      <nav
        className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-6 pb-3 text-sm font-medium md:hidden"
        aria-label="Main navigation mobile"
      >
        <a href="#about" className="min-w-fit text-slate-600 hover:text-kenyaRed">
          About
        </a>
        <NavLink to="/dashboard" className="min-w-fit text-slate-600 hover:text-kenyaRed">
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/methodology" className="min-w-fit text-slate-600 hover:text-kenyaGreen">
          Methodology
        </NavLink>
      </nav>
    </header>
  );
}

export default LandingNav;

