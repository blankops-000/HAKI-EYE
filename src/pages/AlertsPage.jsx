import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import RiskBadge from '../components/RiskBadge';
import StatCard from '../components/StatCard';
import { alertsData } from '../data/mockData';
import { downloadCsv } from '../utils/csv';

const statusStyles = {
  'Under Review': 'bg-amber-100 text-amber-700',
  Confirmed: 'bg-red-100 text-red-700',
  Cleared: 'bg-green-100 text-green-700',
};

function AlertsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredAlerts = useMemo(() => {
    return alertsData.filter((alert) => {
      const matchesSearch = alert.candidate.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
      const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
      return matchesSearch && matchesStatus && matchesSeverity;
    });
  }, [search, statusFilter, severityFilter]);

  const summary = useMemo(() => {
    return {
      openCases: filteredAlerts.filter((alert) => alert.status === 'Under Review').length,
      confirmedCases: filteredAlerts.filter((alert) => alert.status === 'Confirmed').length,
      highRisk: filteredAlerts.filter((alert) => alert.severity === 'high').length,
    };
  }, [filteredAlerts]);

  const columns = [
    { header: 'Candidate', accessor: 'candidate' },
    { header: 'Anomaly Type', accessor: 'type' },
    { header: 'Severity', accessor: 'severity', cell: (row) => <RiskBadge level={row.severity} /> },
    { header: 'Date Detected', accessor: 'dateDetected' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[row.status] || 'bg-slate-100 text-slate-700'}`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <section className="space-y-4">
      <PageHeader
        eyebrow="Enforcement"
        title="Alerts & Case Status"
        description="Active anomaly alerts with review state for investigators."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard title="Open Reviews" value={summary.openCases} />
        <StatCard title="Confirmed Cases" value={summary.confirmedCases} />
        <StatCard title="High Severity Alerts" value={summary.highRisk} />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label htmlFor="alert-search" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Candidate
            </label>
            <input
              id="alert-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search candidate"
              className="ui-input"
            />
          </div>

          <div>
            <label htmlFor="status-filter" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="ui-input"
            >
              <option value="all">All Statuses</option>
              <option value="Under Review">Under Review</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cleared">Cleared</option>
            </select>
          </div>

          <div>
            <label htmlFor="severity-filter" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Severity
            </label>
            <select
              id="severity-filter"
              value={severityFilter}
              onChange={(event) => setSeverityFilter(event.target.value)}
              className="ui-input"
            >
              <option value="all">All Severities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => downloadCsv('uwazi-eye-filtered-alerts.csv', filteredAlerts)}
              className="ui-button-secondary w-full"
            >
              Export Filtered CSV
            </button>
          </div>
        </div>
      </section>

      <DataTable columns={columns} data={filteredAlerts} caption="Campaign finance anomaly alerts" />
    </section>
  );
}

export default AlertsPage;

