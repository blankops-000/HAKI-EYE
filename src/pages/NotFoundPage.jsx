import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
        <p className="text-xs uppercase tracking-wide text-emerald">Navigation Error</p>
        <h1 className="mt-2 text-3xl font-semibold text-navy">Page Not Found</h1>
        <p className="mt-2 text-sm text-slate-500">The requested route is not available in this prototype.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Link className="ui-button-primary" to="/">
            Return Home
          </Link>
          <Link className="ui-button-secondary" to="/dashboard">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;

