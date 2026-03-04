const variants = {
  low: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  high: 'bg-red-100 text-red-700 border-red-200',
};

function RiskBadge({ level }) {
  const normalized = String(level || '').toLowerCase();
  const style = variants[normalized] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${style}`}>
      {normalized ? `${normalized[0].toUpperCase()}${normalized.slice(1)} Risk` : 'N/A'}
    </span>
  );
}

export default RiskBadge;

