import { AlertTriangle, ArrowRight, BarChart3, Coins, Users2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Bar,
  BarChart,
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
import {
  candidatesData,
  dashboardAnomalies,
  dataFreshness,
  donationBreakdownData,
  donationsOverTimeData,
  partyComparisonData,
  platformSummary,
} from '../data/mockData';
import { barChartCursor, lineChartCursor, sharedTooltipProps } from '../utils/chartTheme';
import { formatAxisCurrency, formatCurrency } from '../utils/formatters';

const pieColors = ['#10B981', '#0F172A', '#F59E0B'];

function DashboardPage() {
  const anomalyColumns = [
    { header: 'Candidate', accessor: 'candidate' },
    { header: 'Type', accessor: 'type' },
    {
      header: 'Severity',
      accessor: 'severity',
      cell: (row) => <RiskBadge level={row.severity} />,
    },
    { header: 'Date', accessor: 'date' },
  ];

  const watchlist = [...candidatesData]
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 4)
    .map((candidate) => ({
      ...candidate,
      riskSignal: candidate.riskScore >= 70 ? 'Escalate review' : 'Routine monitoring',
    }));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="National Campaign Finance Dashboard"
        description="Monitor aggregate flows, anomaly signals, and comparative funding behavior across major parties."
        actions={
          <Link
            to="/dashboard/open-data"
            className="ui-button-secondary"
          >
            Export Data
          </Link>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Funds Tracked" value={formatCurrency(platformSummary.totalFunds)} icon={Coins} />
        <StatCard title="Total Candidates" value={platformSummary.totalCandidates} icon={Users2} />
        <StatCard
          title="Flagged Anomalies"
          value={platformSummary.flaggedAnomalies}
          icon={AlertTriangle}
          tone="warning"
        />
        <StatCard
          title="Transparency Index"
          value={`${platformSummary.transparencyIndex}%`}
          icon={BarChart3}
          helper="Composite score"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Donations Over Time" subtitle="KES contributions received per month">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={donationsOverTimeData}>
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

        <ChartCard title="Donation Breakdown" subtitle="Share by source category">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donationBreakdownData} dataKey="value" nameKey="name" innerRadius={65} outerRadius={105}>
                  {donationBreakdownData.map((entry, index) => (
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

      <ChartCard title="Party Comparison" subtitle="Total tracked funds by party">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={partyComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="party" stroke="var(--chart-axis)" tick={{ fill: 'var(--chart-axis)', fontSize: 12 }} />
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

      <section className="grid gap-6 xl:grid-cols-2">
        <div>
          <h2 className="mb-3 text-lg font-semibold text-navy">Recent Flagged Anomalies</h2>
          <DataTable columns={anomalyColumns} data={dashboardAnomalies} caption="Recent anomalies" />
        </div>

        <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-navy">High-Risk Watchlist</h2>
          <ul className="space-y-3">
            {watchlist.map((candidate) => (
              <li key={candidate.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-navy">{candidate.name}</p>
                  <RiskBadge level={candidate.riskLevel} />
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {candidate.party} | Risk Score {candidate.riskScore}/100
                </p>
                <p className="mt-1 text-xs text-slate-500">Signal: {candidate.riskSignal}</p>
              </li>
            ))}
          </ul>

          <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
            <p>Last updated: {dataFreshness.lastUpdated}</p>
            <p>Cycle: {dataFreshness.reportingCycle}</p>
          </div>

          <Link
            to="/dashboard/open-data"
            className="ui-button-secondary inline-flex items-center gap-2"
          >
            Open Data Downloads
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;

