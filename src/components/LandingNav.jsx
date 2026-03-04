import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="kenya-flag-band" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight text-navy">
          UWAZI-EYE
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 text-slate-700 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle landing navigation"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

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

      {mobileOpen && (
        <nav className="border-t border-slate-200 px-4 py-3 text-sm font-medium md:hidden" aria-label="Main navigation mobile">
          <div className="grid gap-2">
            <a href="#about" className="rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-kenyaRed" onClick={() => setMobileOpen(false)}>
              About
            </a>
            <NavLink
              to="/dashboard"
              className="rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-kenyaRed"
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/methodology"
              className="rounded-lg px-2 py-2 text-slate-600 hover:bg-slate-100 hover:text-kenyaGreen"
              onClick={() => setMobileOpen(false)}
            >
              Methodology
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}

export default LandingNav;
