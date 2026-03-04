import PageHeader from '../components/PageHeader';

function MethodologyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Methodology"
        title="Risk Analysis Methodology"
        description="The risk score combines four anomaly indicators to prioritize review by compliance and oversight teams."
      />

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-navy">Scoring Indicators</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>Large donation threshold: flags contributions beyond expected profile limits.</li>
          <li>Repeated donor clustering: detects concentrated high-value transfers from linked donors.</li>
          <li>Late-cycle spikes: identifies rapid fundraising surges near reporting deadlines.</li>
          <li>Below-threshold structuring: captures repeated donations just below disclosure triggers.</li>
        </ul>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-navy">Risk Score Formula</h2>
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-navy">
          Risk Score = (0.30 * LargeDonationIndex) + (0.25 * DonorClusterIndex) + (0.25 * LateCycleSpikeIndex) +
          (0.20 * StructuringIndex)
        </div>
        <p className="mt-3 text-sm text-slate-600">
          Final score is normalized to a 0-100 scale, then grouped into Low (0-34), Medium (35-69), and High (70-100).
        </p>
      </section>
    </div>
  );
}

export default MethodologyPage;

