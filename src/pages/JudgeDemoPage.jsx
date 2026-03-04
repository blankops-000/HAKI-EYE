import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import RiskBadge from '../components/RiskBadge';
import StatCard from '../components/StatCard';
import { aiDetectorFindings, alertsData, auditTrailBlocks, candidateProfileData } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

const steps = [
  {
    id: 1,
    title: 'Detection Trigger',
    objective: 'AI detector flags unusually risky donation behavior for review.',
  },
  {
    id: 2,
    title: 'Evidence Corroboration',
    objective: 'Cross-check candidate profile indicators and top donor concentration.',
  },
  {
    id: 3,
    title: 'Case Escalation',
    objective: 'Move case to investigation with explicit recommendation and status.',
  },
  {
    id: 4,
    title: 'Public Disclosure',
    objective: 'Publish audit-trail entry to keep all changes transparent.',
  },
];

function JudgeDemoPage() {
  const [stepIndex, setStepIndex] = useState(0);

  const finding = aiDetectorFindings.find((entry) => entry.candidate === 'David Mwangi');
  const alert = alertsData.find((entry) => entry.candidate === 'David Mwangi');
  const profile = candidateProfileData['david-mwangi'];

  const auditRows = useMemo(() => auditTrailBlocks.slice(-3), []);

  const auditColumns = [
    { header: 'Block', accessor: 'block' },
    { header: 'Timestamp', accessor: 'timestamp' },
    { header: 'Actor', accessor: 'actor' },
    { header: 'Action', accessor: 'action' },
    { header: 'Entity', accessor: 'entity' },
  ];

  const currentStep = steps[stepIndex];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Presentation Mode"
        title="Judge Demo: High-Risk Case Walkthrough"
        description="End-to-end demonstration for panel review using one sample case from detection to public disclosure."
      />

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard title="Case ID" value="ALR-2026-014" />
        <StatCard title="Candidate" value={finding?.candidate || 'N/A'} />
        <StatCard title="AI Confidence" value={`${Math.round((finding?.confidence || 0) * 100)}%`} />
        <StatCard title="Current Status" value={alert?.status || 'Pending'} />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Step {currentStep.id} of {steps.length}</p>
            <h2 className="text-lg font-semibold text-navy">{currentStep.title}</h2>
            <p className="text-sm text-slate-600">{currentStep.objective}</p>
          </div>
          <RiskBadge level={finding?.severity || 'medium'} />
        </div>

        <div className="mt-4 h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-emerald"
            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setStepIndex((index) => Math.max(index - 1, 0))}
            className="ui-button-secondary"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setStepIndex((index) => Math.min(index + 1, steps.length - 1))}
            className="ui-button-primary"
          >
            Next
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="text-base font-semibold text-navy">Case Evidence Summary</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Detected patterns: {finding?.triggeredRules?.join(', ') || 'N/A'}</li>
            <li>Recommendation: {finding?.recommendation || 'N/A'}</li>
            <li>Total raised: {profile ? formatCurrency(profile.stats.totalRaised) : 'N/A'}</li>
            <li>Largest donation: {profile ? formatCurrency(profile.stats.largestDonation) : 'N/A'}</li>
            <li>Anonymous share: {profile?.stats?.anonymousPercent ?? 'N/A'}%</li>
          </ul>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="text-base font-semibold text-navy">Decision Rubric</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>1. Confirm pattern reproducibility in source data.</li>
            <li>2. Verify legal disclosure thresholds and donor identity controls.</li>
            <li>3. Record enforcement decision and timeline milestones.</li>
            <li>4. Publish final public status for accountability.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-navy">Audit Trail Excerpt for This Case</h2>
        <DataTable columns={auditColumns} data={auditRows} caption="Judge demo audit trail excerpt" />
      </section>
    </div>
  );
}

export default JudgeDemoPage;

