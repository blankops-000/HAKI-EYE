import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import RiskBadge from '../components/RiskBadge';
import StatCard from '../components/StatCard';
import { candidateProfileData, candidatesData } from '../data/mockData';
import { lineChartCursor, sharedTooltipProps } from '../utils/chartTheme';
import { formatAxisCurrency, formatCurrency } from '../utils/formatters';

const pieColors = ['#10B981', '#da139b', '#F59E0B'];

function CandidateProfilePage() {
  const { candidateId } = useParams();

  const fallbackCandidate = useMemo(() => {
    return candidatesData.find((candidate) => candidate.id === candidateId);
  }, [candidateId]);

  const profile = candidateProfileData[candidateId];

  if (!profile) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-soft">
        Candidate profile not found.{' '}
        <Link to="/dashboard/candidates" className="font-medium text-emerald">
          Return to listing.
        </Link>
        {fallbackCandidate && <div className="mt-2">Try selecting {fallbackCandidate.name} from the list again.</div>}
      </div>
    );
  }

  const donorColumns = [
    { header: 'Donor', accessor: 'donor' },
    { header: 'Type', accessor: 'type' },
    { header: 'Amount', accessor: 'amount', cell: (row) => formatCurrency(row.amount) },
  ];

  const anomalyColumns = [
    { header: 'Type', accessor: 'type' },
    { header: 'Date', accessor: 'date' },
    { header: 'Severity', accessor: 'severity', cell: (row) => <RiskBadge level={row.severity} /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <PageHeader
          eyebrow="Candidate Profile"
          title={profile.name}
          description={`Party: ${profile.party}`}
          actions={<RiskBadge level={profile.riskLevel} />}
        />
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Raised" value={formatCurrency(profile.stats.totalRaised)} />
        <StatCard title="Number of Donors" value={profile.stats.donorCount} />
        <StatCard title="Largest Donation" value={formatCurrency(profile.stats.largestDonation)} />
        <StatCard title="% Anonymous" value={`${profile.stats.anonymousPercent}%`} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Donation Timeline">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profile.timeline}>
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
                  type="monotone"
                  dataKey="amount"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, fill: '#BB1E10', stroke: 'var(--tooltip-border)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Donation Source Breakdown">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={profile.sourceBreakdown} dataKey="value" nameKey="name" innerRadius={58} outerRadius={95}>
                  {profile.sourceBreakdown.map((entry, index) => (
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

      <section className="grid gap-6 xl:grid-cols-2">
        <div>
          <h2 className="mb-3 text-lg font-semibold text-navy">Top 5 Donors</h2>
          <DataTable columns={donorColumns} data={profile.topDonors} />
        </div>
        <div>
          <h2 className="mb-3 text-lg font-semibold text-navy">Flagged Anomalies</h2>
          <DataTable columns={anomalyColumns} data={profile.anomalies} />
        </div>
      </section>
    </div>
  );
}

export default CandidateProfilePage;

