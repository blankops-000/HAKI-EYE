/**
 * useApi.js — Generic data-fetching hook for HAKI-EYE
 *
 * Usage:
 *   const { data, loading, error } = useApi(getDashboardSummary);
 *   const { data, loading, error } = useApi(getCandidateProfile, [candidateId]);
 */

import { useCallback, useEffect, useState } from 'react';

/**
 * @param {Function} apiFn       - An API function from src/utils/api.js
 * @param {Array}    args        - Arguments to pass to apiFn (optional)
 * @param {Object}   options
 * @param {boolean}  options.skip - Set true to delay the fetch (e.g. wait for a param)
 */
export function useApi(apiFn, args = [], options = {}) {
  const { skip = false } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    if (skip) return;
    setLoading(true);
    setError(null);
    try {
      const result = await apiFn(...args);
      setData(result);
    } catch (err) {
      setError(err.message ?? 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFn, skip, ...args]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

