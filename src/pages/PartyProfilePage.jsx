import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { partiesData, partyComparisonByCandidate } from '../data/mockData';
import { barChartCursor, sharedTooltipProps } from '../utils/chartTheme';
import { formatAxisCurrency, formatCurrency } from '../utils/formatters';

function PartyProfilePage() {
  const { partyId } = useParams();

  const party = useMemo(() => partiesData.find((item) => item.id === partyId), [partyId]);

  if (!party) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-soft">
        Party profile not found.{' '}
        <Link to="/dashboard" className="font-medium text-emerald">
          Return to dashboard.
        </Link>
      </div>
    );
  }

  const topCandidateColumns = [
    { header: 'Candidate', accessor: 'name' },
    { header: 'Total Funds', accessor: 'funds', cell: (row) => formatCurrency(row.funds) },
    { header: 'Risk Score', accessor: 'riskScore', cell: (row) => `${row.riskScore}/100` },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Party Oversight"
        title={`${party.name} Party Profile`}
        description="Aggregate campaign finance indicators across candidate filings."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Funds" value={formatCurrency(party.totalFunds)} />
        <StatCard title="Average Risk Score" value={`${party.averageRiskScore}/100`} />
        <StatCard title="Anonymous Donations" value={`${party.anonymousPercent}%`} />
        <StatCard title="Candidates Tracked" value={party.candidateCount} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div>
          <h2 className="mb-3 text-lg font-semibold text-navy">Top Funded Candidates</h2>
          <DataTable columns={topCandidateColumns} data={party.topCandidates} />
        </div>

        <ChartCard title="Candidate Funding Comparison">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={partyComparisonByCandidate[party.id] || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="name" stroke="var(--chart-axis)" tick={{ fill: 'var(--chart-axis)', fontSize: 12 }} />
                <YAxis
                  stroke="var(--chart-axis)"
                  width={64}
                  tick={{ fill: 'var(--chart-axis)', fontSize: 12 }}
                  tickFormatter={formatAxisCurrency}
                />
                <Tooltip {...sharedTooltipProps} cursor={barChartCursor} formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="funds" fill="#0F172A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>
    </div>
  );
}

export default PartyProfilePage;

