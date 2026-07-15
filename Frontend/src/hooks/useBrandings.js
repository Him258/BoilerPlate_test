import { useState, useCallback } from 'react';
import api from '@/lib/api';

export function useBrandings() {
  const [brandings, setBrandings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBrandings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/brandings');
      if (response.data?.success) {
        setBrandings(response.data.data || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch brandings');
    } finally {
      setLoading(false);
    }
  }, []);

  const createBranding = async (data) => {
    try {
      const response = await api.post('/brandings', data);
      if (response.data?.success) {
        await fetchBrandings();
        return response.data;
      }
    } catch (err) {
      throw err;
    }
  };

  const updateBranding = async (id, data) => {
    try {
      const response = await api.put(`/brandings/${id}`, data);
      if (response.data?.success) {
        await fetchBrandings();
        return response.data;
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteBranding = async (id) => {
    try {
      const response = await api.delete(`/brandings/${id}`);
      if (response.data?.success) {
        await fetchBrandings();
        return response.data;
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    brandings,
    loading,
    error,
    fetchBrandings,
    createBranding,
    updateBranding,
    deleteBranding
  };
}
