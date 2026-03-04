import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const AppLayout = lazy(() => import('./components/AppLayout'));
const AlertsPage = lazy(() => import('./pages/AlertsPage'));
const AuditTrailPage = lazy(() => import('./pages/AuditTrailPage'));
const AIPatternDetectorPage = lazy(() => import('./pages/AIPatternDetectorPage'));
const CandidateProfilePage = lazy(() => import('./pages/CandidateProfilePage'));
const CandidatesPage = lazy(() => import('./pages/CandidatesPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const DonationTrackerPage = lazy(() => import('./pages/DonationTrackerPage'));
const JudgeDemoPage = lazy(() => import('./pages/JudgeDemoPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const OpenDataPage = lazy(() => import('./pages/OpenDataPage'));
const PartyProfilePage = lazy(() => import('./pages/PartyProfilePage'));
const PublicReportsPage = lazy(() => import('./pages/PublicReportsPage'));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface text-sm text-slate-500">
      Loading page...
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="candidates" element={<CandidatesPage />} />
          <Route path="candidates/:candidateId" element={<CandidateProfilePage />} />
          <Route path="parties/:partyId" element={<PartyProfilePage />} />
          <Route path="tracker" element={<DonationTrackerPage />} />
          <Route path="detector" element={<AIPatternDetectorPage />} />
          <Route path="audit-trail" element={<AuditTrailPage />} />
          <Route path="public-reports" element={<PublicReportsPage />} />
          <Route path="judge-demo" element={<JudgeDemoPage />} />
          <Route path="methodology" element={<MethodologyPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="open-data" element={<OpenDataPage />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
