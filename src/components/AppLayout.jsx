import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  BellRing,
  Building2,
  Database,
  FileWarning,
  History,
  LayoutDashboard,
  Menu,
  Microscope,
  Presentation,
  ShieldAlert,
  TrendingUp,
  Users2,
  X,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navigation = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard/candidates', label: 'Candidates', icon: Users2 },
  { to: '/dashboard/parties/odm', label: 'Party Profile', icon: Building2 },
  { to: '/dashboard/tracker', label: 'Donation Tracker', icon: TrendingUp },
  { to: '/dashboard/detector', label: 'AI Detector', icon: ShieldAlert },
  { to: '/dashboard/audit-trail', label: 'Audit Trail', icon: History },
  { to: '/dashboard/public-reports', label: 'Public Reports', icon: FileWarning },
  { to: '/dashboard/judge-demo', label: 'Judge Demo', icon: Presentation },
  { to: '/dashboard/methodology', label: 'Methodology', icon: Microscope },
  { to: '/dashboard/alerts', label: 'Alerts', icon: BellRing },
  { to: '/dashboard/open-data', label: 'Open Data', icon: Database },
];

function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-navy">
      <div className="kenya-flag-band" />
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <div>
            <Link to="/" className="text-lg font-semibold tracking-tight text-navy">
              UWAZI-EYE
            </Link>
            <p className="text-[11px] text-slate-500 sm:text-xs">Campaign Finance Transparency Platform | Kenya Integrity Lens</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle compactOnMobile />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 text-slate-700 lg:hidden"
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 md:block">
              Public Oversight Mode
            </div>
          </div>
        </div>
      </header>

      {mobileNavOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
          aria-label="Close navigation overlay"
        />
      )}

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-4 sm:py-6 lg:grid-cols-[260px_1fr] lg:px-6">
        <aside
          className={`kenya-panel kenya-card fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto p-3 shadow-soft transition-transform lg:sticky lg:top-24 lg:h-fit lg:w-auto lg:translate-x-0 ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="pt-20 lg:pt-0">
            <nav className="space-y-1" aria-label="Dashboard navigation">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/dashboard'}
                    onClick={() => setMobileNavOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'bg-kenyaRed text-white shadow'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-kenyaGreen'
                      }`
                    }
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 space-y-6 pb-8 lg:pl-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
