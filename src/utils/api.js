/**
 * api.js — HAKI-EYE API Service Layer
 *
 * All data fetching goes through this file.
 * - Reads VITE_API_BASE_URL from the environment.
 * - Falls back to mock data when the API is not configured or unreachable.
 * - Every function returns a Promise so pages can use async/await or useEffect.
 */

import {
  aiDetectorFindings,
  aiDetectorRules,
  alertsData,
  auditTrailBlocks,
  candidateProfileData,
  candidatesData,
  dashboardAnomalies,
  dataFreshness,
  donationBreakdownData,
  donationRecords,
  donationsOverTimeData,
  partyComparisonByCandidate,
  partyComparisonData,
  partiesData,
  platformSummary,
} from '../data/mockData';

// ─── Base URL ──────────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IS_MOCK = !BASE_URL || BASE_URL.includes('localhost') === false && !BASE_URL.startsWith('http');

// ─── Shared fetch helper ───────────────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText} (${path})`);
  }

  return response.json();
}

// ─── Generic wrapper: try real API, fall back to mock ─────────────────────────
async function withFallback(apiCall, mockData) {
  if (!BASE_URL) {
    // No API configured — use mock data silently
    return mockData;
  }
  try {
    return await apiCall();
  } catch (error) {
    console.warn('[HAKI-EYE] API unavailable, using mock data:', error.message);
    return mockData;
  }
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────
export const getDashboardSummary = () =>
  withFallback(() => apiFetch('/dashboard/summary'), platformSummary);

export const getDonationsOverTime = () =>
  withFallback(() => apiFetch('/dashboard/donations-over-time'), donationsOverTimeData);

export const getDonationBreakdown = () =>
  withFallback(() => apiFetch('/dashboard/donation-breakdown'), donationBreakdownData);

export const getPartyComparison = () =>
  withFallback(() => apiFetch('/dashboard/party-comparison'), partyComparisonData);

export const getDashboardAnomalies = () =>
  withFallback(() => apiFetch('/dashboard/anomalies'), dashboardAnomalies);

export const getDataFreshness = () =>
  withFallback(() => apiFetch('/dashboard/freshness'), dataFreshness);

// ─── Candidates ────────────────────────────────────────────────────────────────
export const getCandidates = () =>
  withFallback(() => apiFetch('/candidates'), candidatesData);

export const getCandidateProfile = (candidateId) =>
  withFallback(
    () => apiFetch(`/candidates/${candidateId}`),
    candidateProfileData[candidateId] ?? null,
  );

// ─── Parties ───────────────────────────────────────────────────────────────────
export const getParties = () =>
  withFallback(() => apiFetch('/parties'), partiesData);

export const getPartyProfile = (partyId) =>
  withFallback(
    () => apiFetch(`/parties/${partyId}`),
    partiesData.find((p) => p.id === partyId) ?? null,
  );

export const getPartyComparisonByCandidate = (partyId) =>
  withFallback(
    () => apiFetch(`/parties/${partyId}/candidates`),
    partyComparisonByCandidate[partyId] ?? [],
  );

// ─── Donations ─────────────────────────────────────────────────────────────────
export const getDonationRecords = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return withFallback(
    () => apiFetch(`/donations${params ? `?${params}` : ''}`),
    donationRecords,
  );
};

// ─── Alerts ────────────────────────────────────────────────────────────────────
export const getAlerts = () =>
  withFallback(() => apiFetch('/alerts'), alertsData);

// ─── AI Pattern Detector ───────────────────────────────────────────────────────
export const getAIDetectorRules = () =>
  withFallback(() => apiFetch('/detector/rules'), aiDetectorRules);

export const getAIDetectorFindings = () =>
  withFallback(() => apiFetch('/detector/findings'), aiDetectorFindings);

// ─── Audit Trail ───────────────────────────────────────────────────────────────
export const getAuditTrail = () =>
  withFallback(() => apiFetch('/audit-trail'), auditTrailBlocks);

