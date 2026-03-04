function StatCard({ title, value, icon: Icon, helper, tone = 'default' }) {
  const toneStyles = {
    default: 'text-navy',
    positive: 'text-emerald',
    warning: 'text-amber-600',
    danger: 'text-red-600',
  };

  return (
    <div className="kenya-panel kenya-card surface-animate rounded-lg p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className={`mt-2 text-2xl font-semibold ${toneStyles[tone] || toneStyles.default}`}>{value}</p>
          {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
        </div>
        {Icon && <Icon className="text-emerald" size={22} />}
      </div>
    </div>
  );
}

export default StatCard;


