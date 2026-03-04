import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import RiskBadge from '../components/RiskBadge';
import { candidateProfileData, candidatesData, partiesData } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

function CandidatesPage() {
  const [query, setQuery] = useState('');
  const [partyFilter, setPartyFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [leftCandidateId, setLeftCandidateId] = useState(candidatesData[0]?.id || '');
  const [rightCandidateId, setRightCandidateId] = useState(candidatesData[1]?.id || '');

  const filteredCandidates = useMemo(() => {
    return candidatesData.filter((candidate) => {
      const matchesQuery = candidate.name.toLowerCase().includes(query.toLowerCase());
      const matchesParty = partyFilter === 'all' || candidate.party === partyFilter;
      const matchesRisk = riskFilter === 'all' || candidate.riskLevel === riskFilter;
      return matchesQuery && matchesParty && matchesRisk;
    });
  }, [query, partyFilter, riskFilter]);

  const leftCandidate = useMemo(
    () => candidatesData.find((candidate) => candidate.id === leftCandidateId),
    [leftCandidateId],
  );
  const rightCandidate = useMemo(
    () => candidatesData.find((candidate) => candidate.id === rightCandidateId),
    [rightCandidateId],
  );

  const columns = [
    {
      header: 'Candidate Name',
      accessor: 'name',
      cell: (row) => (
        <Link className="font-medium text-navy hover:text-emerald" to={`/dashboard/candidates/${row.id}`}>
          {row.name}
        </Link>
      ),
    },
    { header: 'Party', accessor: 'party' },
    {
      header: 'Total Funds',
      accessor: 'totalFunds',
      cell: (row) => formatCurrency(row.totalFunds),
    },
    {
      header: 'Risk Score',
      accessor: 'riskScore',
      cell: (row) => `${row.riskScore}/100`,
    },
    {
      header: 'Risk Badge',
      accessor: 'riskLevel',
      cell: (row) => <RiskBadge level={row.riskLevel} />,
    },
  ];

  return (
    <section className="space-y-4">
      <PageHeader
        eyebrow="Profiles"
        title="Candidate Listing"
        description="Search, filter, and compare campaign finance risk profiles for individual candidates."
        actions={
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setPartyFilter('all');
              setRiskFilter('all');
            }}
            className="ui-button-secondary"
          >
            Clear Filters
          </button>
        }
      />

      <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-soft md:grid-cols-3">
        <div>
          <label htmlFor="candidate-search" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
            Search
          </label>
          <input
            id="candidate-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search candidate name"
            className="ui-input"
          />
        </div>

        <div>
          <label htmlFor="party-filter" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
            Party
          </label>
          <select
            id="party-filter"
            value={partyFilter}
            onChange={(event) => setPartyFilter(event.target.value)}
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
          <label htmlFor="risk-filter" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
            Risk Level
          </label>
          <select
            id="risk-filter"
            value={riskFilter}
            onChange={(event) => setRiskFilter(event.target.value)}
            className="ui-input"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredCandidates}
        emptyText="No candidates match selected filters."
        caption="Candidate finance risk listing"
      />

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-navy">Candidate Comparison Tool</h2>
        <p className="mt-1 text-sm text-slate-500">
          Compare two candidates to help judges and the public spot funding and risk differences quickly.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="compare-left" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Candidate A
            </label>
            <select
              id="compare-left"
              value={leftCandidateId}
              onChange={(event) => setLeftCandidateId(event.target.value)}
              className="ui-input"
            >
              {candidatesData.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="compare-right" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Candidate B
            </label>
            <select
              id="compare-right"
              value={rightCandidateId}
              onChange={(event) => setRightCandidateId(event.target.value)}
              className="ui-input"
            >
              {candidatesData.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {leftCandidate && rightCandidate && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[leftCandidate, rightCandidate].map((candidate) => {
              const profile = candidateProfileData[candidate.id];
              return (
                <div key={candidate.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-navy">{candidate.name}</p>
                    <RiskBadge level={candidate.riskLevel} />
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{candidate.party}</p>
                  <div className="mt-3 space-y-1 text-sm text-slate-700">
                    <p>Total Funds: {formatCurrency(candidate.totalFunds)}</p>
                    <p>Risk Score: {candidate.riskScore}/100</p>
                    <p>Donors: {profile?.stats?.donorCount || 'N/A'}</p>
                    <p>Anonymous Share: {profile?.stats?.anonymousPercent ?? 'N/A'}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {leftCandidate && rightCandidate && leftCandidate.id !== rightCandidate.id && (
          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
            Higher risk profile:{' '}
            <span className="font-semibold text-navy">
              {leftCandidate.riskScore >= rightCandidate.riskScore ? leftCandidate.name : rightCandidate.name}
            </span>{' '}
            based on current composite score.
          </div>
        )}
      </section>
    </section>
  );
}

export default CandidatesPage;

