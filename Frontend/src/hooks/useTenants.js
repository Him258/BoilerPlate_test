import { useState, useCallback } from 'react';
import api from '@/lib/api';

export function useTenants() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTenants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/tenants');
      setTenants(response.data.data || response.data || []);
    } catch (err) {
      console.error('Fetch tenants failed:', err);
      setError(err.response?.data?.message || 'Failed to fetch tenants');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTenant = useCallback(async (tenantData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/tenants', tenantData);
      const newTenant = response.data.data || response.data;
      setTenants((prev) => [newTenant, ...prev]);
      return newTenant;
    } catch (err) {
      console.error('Create tenant failed:', err);
      const errMsg = err.response?.data?.message || 'Failed to create tenant';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTenant = useCallback(async (id, tenantData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/tenants/${id}`, tenantData);
      const updatedTenant = response.data.data || response.data;
      setTenants((prev) => prev.map((t) => t.id === id ? updatedTenant : t));
      return updatedTenant;
    } catch (err) {
      console.error('Update tenant failed:', err);
      const errMsg = err.response?.data?.message || 'Failed to update tenant';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTenant = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/tenants/${id}`);
      setTenants((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Delete tenant failed:', err);
      const errMsg = err.response?.data?.message || 'Failed to delete tenant';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tenants,
    loading,
    error,
    fetchTenants,
    createTenant,
    updateTenant,
    deleteTenant,
  };
}
