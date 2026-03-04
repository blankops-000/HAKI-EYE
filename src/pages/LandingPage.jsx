import { Link } from 'react-router-dom';
import { Activity, ShieldAlert, Users } from 'lucide-react';
import LandingNav from '../components/LandingNav';

const features = [
  {
    title: 'Real-Time Monitoring',
    description: 'Track donation flows across candidates and parties to strengthen oversight and policy review.',
    icon: Activity,
  },
  {
    title: 'Risk Scoring Engine',
    description: 'Detect unusual funding behavior using standardized thresholds and anomaly indicators.',
    icon: ShieldAlert,
  },
  {
    title: 'Public Accountability',
    description: 'Present understandable records for watchdog groups, citizens, and electoral institutions.',
    icon: Users,
  },
];

const trustMetrics = [
  { label: 'Funds Tracked', value: 'KES 126.5M' },
  { label: 'Candidates Monitored', value: '48' },
  { label: 'Flagged Anomalies', value: '17' },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      <LandingNav />

      <main>
        <section className="mx-auto max-w-7xl px-6 pb-12 pt-16" id="about">
          <div className="kenya-panel kenya-card max-w-4xl rounded-lg p-8 shadow-soft">
            <div className="kenya-flag-band mb-5" />
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald">Civic-Tech Intelligence</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-navy md:text-5xl">
              Bringing Transparency to Campaign Finance
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              UWAZI-EYE helps identify suspicious donation patterns, compare party-level funding behavior, and make
              campaign finance records easier to audit in Kenya.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/dashboard"
                className="inline-flex rounded-lg bg-kenyaRed px-5 py-3 text-sm font-medium text-white hover:bg-red-700"
              >
                Explore Dashboard
              </Link>
              <Link
                to="/dashboard/methodology"
                className="inline-flex rounded-lg border border-kenyaGreen px-5 py-3 text-sm font-medium text-kenyaGreen hover:bg-emerald-50"
              >
                View Methodology
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-10 md:grid-cols-3">
          {trustMetrics.map((metric) => (
            <article key={metric.label} className="kenya-panel kenya-card rounded-lg p-4 shadow-soft">
              <p className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</p>
              <p className="mt-2 text-xl font-semibold text-navy">{metric.value}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-14 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="kenya-panel kenya-card rounded-lg p-6 shadow-soft">
                <Icon className="text-emerald" size={24} />
                <h3 className="mt-4 text-lg font-semibold text-navy">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </article>
            );
          })}
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-kenyaBlack px-6 py-5 text-center text-xs text-white">
        Disclaimer: Mock demonstration data for hackathon prototyping. Not an official election commission publication.
      </footer>
    </div>
  );
}

export default LandingPage;

