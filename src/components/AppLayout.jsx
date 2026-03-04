import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  BellRing,
  Building2,
  Database,
  FileWarning,
  History,
  LayoutDashboard,
  Microscope,
  Presentation,
  ShieldAlert,
  TrendingUp,
  Users2,
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
  return (
    <div className="min-h-screen bg-surface text-navy">
      <div className="kenya-flag-band" />
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <Link to="/" className="text-lg font-semibold tracking-tight text-navy">
              UWAZI-EYE
            </Link>
            <p className="text-xs text-slate-500">Campaign Finance Transparency Platform | Kenya Integrity Lens</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 md:block">
              Public Oversight Mode
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[260px_1fr] lg:px-6">
        <aside className="kenya-panel kenya-card h-fit rounded-lg p-3 shadow-soft lg:sticky lg:top-24">
          <nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-1" aria-label="Dashboard navigation">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/dashboard'}
                  className={({ isActive }) =>
                    `inline-flex min-w-fit items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
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
        </aside>

        <main className="space-y-6 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

