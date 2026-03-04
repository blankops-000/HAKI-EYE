import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import { candidatesData, donationRecords, partiesData } from '../data/mockData';
import { lineChartCursor, sharedTooltipProps } from '../utils/chartTheme';
import { downloadCsv } from '../utils/csv';
import { formatAxisCurrency, formatCurrency } from '../utils/formatters';

const pieColors = ['#10B981', '#0F172A', '#F59E0B'];

function DonationTrackerPage() {
  const [partyFilter, setPartyFilter] = useState('all');
  const [candidateFilter, setCandidateFilter] = useState('all');

  const filteredCandidates = useMemo(() => {
    if (partyFilter === 'all') {
      return candidatesData;
    }
    return candidatesData.filter((candidate) => candidate.party === partyFilter);
  }, [partyFilter]);

  const filteredRecords = useMemo(() => {
    return donationRecords.filter((record) => {
      const matchesParty = partyFilter === 'all' || record.party === partyFilter;
      const matchesCandidate = candidateFilter === 'all' || record.candidateId === candidateFilter;
      return matchesParty && matchesCandidate;
    });
  }, [partyFilter, candidateFilter]);

  const timelineData = useMemo(() => {
    const monthlyTotals = filteredRecords.reduce((acc, record) => {
      acc[record.month] = (acc[record.month] || 0) + record.amount;
      return acc;
    }, {});

    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    return monthOrder
      .filter((month) => monthlyTotals[month])
      .map((month) => ({ month, amount: monthlyTotals[month] }));
  }, [filteredRecords]);

  const sourceBreakdown = useMemo(() => {
    const totals = filteredRecords.reduce((acc, record) => {
      acc[record.source] = (acc[record.source] || 0) + record.amount;
      return acc;
    }, {});

    const grandTotal = Object.values(totals).reduce((sum, value) => sum + value, 0) || 1;
    return Object.entries(totals).map(([name, amount]) => ({
      name,
      value: Math.round((amount / grandTotal) * 100),
    }));
  }, [filteredRecords]);

  const tableColumns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Candidate', accessor: 'candidate' },
    { header: 'Party', accessor: 'party' },
    { header: 'Donor', accessor: 'donor' },
    { header: 'Source', accessor: 'source' },
    { header: 'Amount', accessor: 'amount', cell: (row) => formatCurrency(row.amount) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Live Tracking"
        title="Smart Donation Tracker"
        description="Public monitoring of donation flows with candidate-level breakdown and downloadable evidence."
      />

      <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-soft md:grid-cols-3">
        <div>
          <label htmlFor="tracker-party" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
            Party
          </label>
          <select
            id="tracker-party"
            value={partyFilter}
            onChange={(event) => {
              setPartyFilter(event.target.value);
              setCandidateFilter('all');
            }}
            className="ui-input"
          >
            <option value="all">All Parties</option>
            {partiesData.map((party) => (
              <option key={party.id} value={party.name}>
                {party.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tracker-candidate" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
            Candidate
          </label>
          <select
            id="tracker-candidate"
            value={candidateFilter}
            onChange={(event) => setCandidateFilter(event.target.value)}
            className="ui-input"
          >
            <option value="all">All Candidates</option>
            {filteredCandidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={() => downloadCsv('uwazi-eye-donation-tracker.csv', filteredRecords)}
            className="ui-button-secondary w-full"
          >
            Download Filtered Report
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Donation Timeline" subtitle="Filtered monthly inflow (KES)">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="month" stroke="var(--chart-axis)" tick={{ fill: 'var(--chart-axis)', fontSize: 12 }} />
                <YAxis
                  stroke="var(--chart-axis)"
                  width={64}
                  tick={{ fill: 'var(--chart-axis)', fontSize: 12 }}
                  tickFormatter={formatAxisCurrency}
                />
                <Tooltip {...sharedTooltipProps} cursor={lineChartCursor} formatter={(value) => formatCurrency(value)} />
                <Line
                  dataKey="amount"
                  type="monotone"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, fill: '#BB1E10', stroke: 'var(--tooltip-border)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Funding Source Split" subtitle="Percentage share by donor class">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceBreakdown} dataKey="value" nameKey="name" innerRadius={58} outerRadius={95}>
                  {sourceBreakdown.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip {...sharedTooltipProps} formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-navy">Donation Register</h2>
        <DataTable columns={tableColumns} data={filteredRecords} caption="Filtered donation records" />
      </section>
    </div>
  );
}

export default DonationTrackerPage;

