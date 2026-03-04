function PageHeader({ eyebrow, title, description, actions, children }) {
  return (
    <header className="kenya-panel kenya-card surface-animate rounded-lg p-5 shadow-soft">
      <div className="kenya-flag-band mb-4" />
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-emerald">{eyebrow}</p>}
      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-semibold text-navy">{title}</h1>
          {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </header>
  );
}

export default PageHeader;


