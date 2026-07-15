import { useState, useCallback } from 'react';
import api from '@/lib/api';

export function useOrganizations() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrganizations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/organizations');
      if (response.data?.success) {
        setOrganizations(response.data.data || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch organizations');
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrganization = async (data) => {
    try {
      const response = await api.post('/organizations', data);
      if (response.data?.success) {
        await fetchOrganizations();
        return response.data;
      }
    } catch (err) {
      throw err;
    }
  };

  const updateOrganization = async (id, data) => {
    try {
      const response = await api.put(`/organizations/${id}`, data);
      if (response.data?.success) {
        await fetchOrganizations();
        return response.data;
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteOrganization = async (id) => {
    try {
      const response = await api.delete(`/organizations/${id}`);
      if (response.data?.success) {
        await fetchOrganizations();
        return response.data;
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    organizations,
    loading,
    error,
    fetchOrganizations,
    createOrganization,
    updateOrganization,
    deleteOrganization
  };
}
