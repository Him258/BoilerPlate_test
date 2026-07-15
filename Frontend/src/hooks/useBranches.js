import { useState, useCallback } from 'react';
import api from '../lib/api';

export function useBranches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBranches = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/branches');
      setBranches(response.data.data || response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to fetch branches');
    } finally {
      setLoading(false);
    }
  }, []);

  const createBranch = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/branches', data);
      await fetchBranches();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to create branch');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBranch = async (id, data) => {
    setLoading(true);
    try {
      const response = await api.put(`/branches/${id}`, data);
      await fetchBranches();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to update branch');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBranch = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/branches/${id}`);
      await fetchBranches();
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to delete branch');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    branches,
    loading,
    error,
    fetchBranches,
    createBranch,
    updateBranch,
    deleteBranch,
  };
}
