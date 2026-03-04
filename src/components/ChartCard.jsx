function ChartCard({ title, subtitle, children, action }) {
  return (
    <section className="kenya-panel kenya-card surface-animate rounded-lg p-5 shadow-soft">
      <div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-semibold text-navy">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export default ChartCard;


