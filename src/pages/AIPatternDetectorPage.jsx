import { useMemo } from 'react';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import RiskBadge from '../components/RiskBadge';
import StatCard from '../components/StatCard';
import { aiDetectorFindings, aiDetectorRules, candidatesData } from '../data/mockData';

function AIPatternDetectorPage() {
  const summary = useMemo(() => {
    const highRisk = aiDetectorFindings.filter((finding) => finding.severity === 'high').length;
    const mediumRisk = aiDetectorFindings.filter((finding) => finding.severity === 'medium').length;
    const avgConfidence =
      aiDetectorFindings.reduce((sum, finding) => sum + finding.confidence, 0) / (aiDetectorFindings.length || 1);

    return {
      scanned: candidatesData.length,
      flagged: aiDetectorFindings.length,
      highRisk,
      mediumRisk,
      avgConfidence: `${Math.round(avgConfidence * 100)}%`,
    };
  }, []);

  const findingColumns = [
    { header: 'Candidate', accessor: 'candidate' },
    { header: 'Party', accessor: 'party' },
    {
      header: 'Detected Patterns',
      accessor: 'triggeredRules',
      cell: (row) => row.triggeredRules.join(', '),
    },
    {
      header: 'Confidence',
      accessor: 'confidence',
      cell: (row) => `${Math.round(row.confidence * 100)}%`,
    },
    {
      header: 'Severity',
      accessor: 'severity',
      cell: (row) => <RiskBadge level={row.severity} />,
    },
    { header: 'Recommendation', accessor: 'recommendation' },
  ];

  const ruleColumns = [
    { header: 'Rule', accessor: 'name' },
    {
      header: 'Weight',
      accessor: 'weight',
      cell: (row) => `${Math.round(row.weight * 100)}%`,
    },
    { header: 'Description', accessor: 'description' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Predictive Monitoring"
        title="AI Suspicious Pattern Detector"
        description="Rule-based risk engine to surface unusually large donations, repeated flows, late spikes, and donor clusters."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Profiles Scanned" value={summary.scanned} />
        <StatCard title="Flagged Profiles" value={summary.flagged} />
        <StatCard title="High Risk" value={summary.highRisk} />
        <StatCard title="Medium Risk" value={summary.mediumRisk} />
        <StatCard title="Avg Confidence" value={summary.avgConfidence} />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-navy">Detection Findings</h2>
        <DataTable columns={findingColumns} data={aiDetectorFindings} caption="AI detector findings" />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-navy">Scoring Rules</h2>
        <DataTable columns={ruleColumns} data={aiDetectorRules} caption="AI detector rules" />
      </section>
    </div>
  );
}

export default AIPatternDetectorPage;

