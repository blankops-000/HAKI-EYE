import { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import RiskBadge from '../components/RiskBadge';
import { getCandidates } from '../utils/api';
import { useApi } from '../utils/useApi';

const STORAGE_KEY = 'uwazi_eye_public_reports';
const SEEDED_REPORTS = [
  {
    id: 'RPT-1001',
    submittedAt: '2026-03-02',
    candidate: 'David Mwangi',
    anomalyType: 'Repeated donor pattern',
    description: 'Same entity donated 4 times in one week via related records.',
    evidenceLink: 'https://example.org/evidence-1001',
    reporterType: 'NGO Observer',
    status: 'Under Review',
    severity: 'high',
  },
];

const statusStyles = {
  Pending: 'bg-amber-100 text-amber-700',
  'Under Review': 'bg-blue-100 text-blue-700',
  Confirmed: 'bg-red-100 text-red-700',
  Cleared: 'bg-green-100 text-green-700',
};

function PublicReportsPage() {
  const { data: candidatesData } = useApi(getCandidates);

  const defaultForm = useMemo(() => ({
    candidate: candidatesData?.[0]?.name || '',
    anomalyType: 'Unusual large donation',
    description: '',
    evidenceLink: '',
    reporterType: 'Citizen',
  }), [candidatesData]);

  const [form, setForm] = useState(defaultForm);
  const [reports, setReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const persisted = localStorage.getItem(STORAGE_KEY);
    if (persisted) {
      setReports(JSON.parse(persisted));
      return;
    }
    setReports(SEEDED_REPORTS);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  }, [reports]);

  // Sync default candidate once data loads
  useEffect(() => {
    if (candidatesData?.[0] && !form.candidate) {
      setForm((current) => ({ ...current, candidate: candidatesData[0].name }));
    }
  }, [candidatesData, form.candidate]);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => statusFilter === 'all' || report.status === statusFilter);
  }, [reports, statusFilter]);

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.description.trim().length < 20) return;

    const newReport = {
      id: `RPT-${Date.now().toString().slice(-6)}`,
      submittedAt: new Date().toISOString().slice(0, 10),
      candidate: form.candidate,
      anomalyType: form.anomalyType,
      description: form.description.trim(),
      evidenceLink: form.evidenceLink.trim() || 'N/A',
      reporterType: form.reporterType,
      status: 'Pending',
      severity: 'medium',
    };

    setReports((current) => [newReport, ...current]);
    setForm(defaultForm);
  };

  const updateStatus = (id, status) => {
    setReports((current) => current.map((report) => (report.id === id ? { ...report, status } : report)));
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setReports(SEEDED_REPORTS);
    setStatusFilter('all');
    setForm(defaultForm);
  };

  const columns = [
    { header: 'Report ID', accessor: 'id' },
    { header: 'Date', accessor: 'submittedAt' },
    { header: 'Candidate', accessor: 'candidate' },
    { header: 'Type', accessor: 'anomalyType' },
    { header: 'Reporter', accessor: 'reporterType' },
    {
      header: 'Severity',
      accessor: 'severity',
      cell: (row) => <RiskBadge level={row.severity} />,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[row.status] || 'bg-slate-100 text-slate-700'}`}>
          {row.status}
        </span>
      ),
    },
    {
      header: 'Moderate',
      accessor: 'moderation',
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => updateStatus(row.id, 'Under Review')}
            className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:border-navy"
          >
            Review
          </button>
          <button
            type="button"
            onClick={() => updateStatus(row.id, 'Confirmed')}
            className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:border-red-500"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => updateStatus(row.id, 'Cleared')}
            className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:border-green-600"
          >
            Clear
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Citizen Oversight"
        title="Public Reporting &amp; Moderation Queue"
        description="Citizens and watchdog groups can submit suspicious donation reports for triage and case review."
      />

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-navy">Submit Suspicious Transaction Report</h2>
        <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="report-candidate" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Candidate
            </label>
            <select
              id="report-candidate"
              value={form.candidate}
              onChange={(event) => handleChange('candidate', event.target.value)}
              className="ui-input"
            >
              {(candidatesData ?? []).map((candidate) => (
                <option key={candidate.id} value={candidate.name}>
                  {candidate.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="report-type" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Anomaly Type
            </label>
            <select
              id="report-type"
              value={form.anomalyType}
              onChange={(event) => handleChange('anomalyType', event.target.value)}
              className="ui-input"
            >
              <option>Unusual large donation</option>
              <option>Repeated donor pattern</option>
              <option>Last-minute spike</option>
              <option>Donor clustering</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="report-description" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Description (minimum 20 characters)
            </label>
            <textarea
              id="report-description"
              rows={4}
              value={form.description}
              onChange={(event) => handleChange('description', event.target.value)}
              className="ui-input"
              placeholder="Describe the suspicious pattern and where it appears in disclosures..."
            />
          </div>

          <div>
            <label htmlFor="report-evidence" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Evidence Link
            </label>
            <input
              id="report-evidence"
              value={form.evidenceLink}
              onChange={(event) => handleChange('evidenceLink', event.target.value)}
              className="ui-input"
              placeholder="https://..."
            />
          </div>

          <div>
            <label htmlFor="reporter-type" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Reporter Type
            </label>
            <select
              id="reporter-type"
              value={form.reporterType}
              onChange={(event) => handleChange('reporterType', event.target.value)}
              className="ui-input"
            >
              <option>Citizen</option>
              <option>Journalist</option>
              <option>NGO Observer</option>
              <option>Party Agent</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="ui-button-primary">
              Submit Report
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-navy">Moderation Queue</h2>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="ui-input"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cleared">Cleared</option>
            </select>
            <button
              type="button"
              onClick={resetDemoData}
              className="ui-button-secondary"
            >
              Reset Demo Data
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={filteredReports} caption="Public report moderation queue" />
      </section>
    </div>
  );
}

export default PublicReportsPage;
