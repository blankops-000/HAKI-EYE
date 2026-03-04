import { Database, Download, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { alertsData, candidatesData, dataFreshness, partiesData } from '../data/mockData';
import { downloadCsv } from '../utils/csv';

const datasets = [
  {
    id: 'candidates',
    title: 'Candidate Risk Register',
    description: 'Candidate-level totals, party affiliation, and risk ratings.',
    icon: FileText,
    rows: candidatesData,
    filename: 'uwazi-eye-candidates.csv',
  },
  {
    id: 'alerts',
    title: 'Anomaly Alerts Log',
    description: 'Detected financing anomalies with severity and case status.',
    icon: Database,
    rows: alertsData,
    filename: 'uwazi-eye-alerts.csv',
  },
  {
    id: 'parties',
    title: 'Party Funding Snapshot',
    description: 'Aggregate party indicators for risk, anonymity, and candidate counts.',
    icon: FileText,
    rows: partiesData.map((party) => ({
      party: party.name,
      totalFunds: party.totalFunds,
      averageRiskScore: party.averageRiskScore,
      anonymousPercent: party.anonymousPercent,
      candidateCount: party.candidateCount,
    })),
    filename: 'uwazi-eye-parties.csv',
  },
];

function OpenDataPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Open Government Data"
        title="Open Data & Public Evidence"
        description="Download structured datasets to support independent analysis by civil society, researchers, and journalists."
      />

      <section className="grid gap-4 md:grid-cols-3">
        {datasets.map((dataset) => {
          const Icon = dataset.icon;
          return (
            <article key={dataset.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <Icon className="text-emerald" size={20} />
                <button
                  type="button"
                  onClick={() => downloadCsv(dataset.filename, dataset.rows)}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:border-emerald hover:text-emerald"
                >
                  <Download size={14} />
                  CSV
                </button>
              </div>
              <h2 className="mt-3 text-base font-semibold text-navy">{dataset.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{dataset.description}</p>
              <p className="mt-3 text-xs text-slate-500">{dataset.rows.length} records</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-base font-semibold text-navy">Data Governance Notes</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>Last updated: {dataFreshness.lastUpdated}</li>
          <li>Reporting cycle: {dataFreshness.reportingCycle}</li>
          <li>Source note: {dataFreshness.sourceNote}</li>
          <li>License: Open for civic oversight, academic review, and non-commercial transparency reporting.</li>
        </ul>
      </section>
    </div>
  );
}

export default OpenDataPage;

