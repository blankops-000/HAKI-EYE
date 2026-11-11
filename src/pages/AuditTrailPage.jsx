import { useMemo } from 'react';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { getAuditTrail } from '../utils/api';
import { useApi } from '../utils/useApi';

function AuditTrailPage() {
  const { data: auditTrailBlocks } = useApi(getAuditTrail);

  const { chainIntact, latestBlock } = useMemo(() => {
    if (!auditTrailBlocks || auditTrailBlocks.length === 0) {
      return { chainIntact: true, latestBlock: null };
    }
    const intact = auditTrailBlocks.every((block, index) => {
      if (index === 0) return block.previousHash === '0000000000000000';
      return block.previousHash === auditTrailBlocks[index - 1].hash;
    });
    return { chainIntact: intact, latestBlock: auditTrailBlocks[auditTrailBlocks.length - 1] };
  }, [auditTrailBlocks]);

  const columns = [
    { header: 'Block', accessor: 'block' },
    { header: 'Timestamp', accessor: 'timestamp' },
    { header: 'Actor', accessor: 'actor' },
    { header: 'Action', accessor: 'action' },
    { header: 'Entity', accessor: 'entity' },
    {
      header: 'Prev Hash',
      accessor: 'previousHash',
      cell: (row) => <span className="font-mono text-xs">{row.previousHash}</span>,
    },
    {
      header: 'Hash',
      accessor: 'hash',
      cell: (row) => <span className="font-mono text-xs text-navy">{row.hash}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Integrity Ledger"
        title="Blockchain-Style Audit Trail"
        description="Simulated immutable ledger for disclosures, review actions, and publication events."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard title="Blocks Recorded" value={auditTrailBlocks?.length ?? '—'} />
        <StatCard
          title="Chain Integrity"
          value={chainIntact ? 'Valid' : 'Compromised'}
          helper="Hash-link verification"
          tone={chainIntact ? 'positive' : 'danger'}
        />
        <StatCard title="Latest Block" value={latestBlock ? `#${latestBlock.block}` : '—'} />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
        <p className="text-sm text-slate-600">
          Integrity check: each block references the prior block hash. Any unauthorized historical edit breaks the chain.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-navy">Audit Ledger</h2>
        <DataTable columns={columns} data={auditTrailBlocks ?? []} caption="Audit trail ledger" />
      </section>
    </div>
  );
}

export default AuditTrailPage;
