import { useState, useCallback } from 'react';
import api from '../lib/api';

export function useDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/departments');
      setDepartments(response.data.data || response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  }, []);

  const createDepartment = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/departments', data);
      await fetchDepartments();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to create department');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDepartment = async (id, data) => {
    setLoading(true);
    try {
      const response = await api.put(`/departments/${id}`, data);
      await fetchDepartments();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to update department');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteDepartment = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/departments/${id}`);
      await fetchDepartments();
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to delete department');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    departments,
    loading,
    error,
    fetchDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
}
