import { useState, useCallback } from 'react';
import api from '../lib/api';

export function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/reports/analytics');
      setData(response.data.data || response.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchAnalytics };
}
