import { useState, useCallback } from 'react';
import api from '@/lib/api';

export function useRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/roles');
      setRoles(response.data.data || response.data || []);
    } catch (err) {
      console.error('Fetch roles failed:', err);
      setError(err.response?.data?.message || 'Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  }, []);

  const createRole = useCallback(async (roleData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/roles', roleData);
      const newRole = response.data.data || response.data;
      setRoles((prev) => [newRole, ...prev]);
      return newRole;
    } catch (err) {
      console.error('Create role failed:', err);
      const errMsg = err.response?.data?.message || 'Failed to create role';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRole = useCallback(async (id, roleData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/roles/${id}`, roleData);
      const updatedRole = response.data.data || response.data;
      setRoles((prev) => prev.map((r) => r.id === id ? updatedRole : r));
      return updatedRole;
    } catch (err) {
      console.error('Update role failed:', err);
      const errMsg = err.response?.data?.message || 'Failed to update role';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRole = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/roles/${id}`);
      setRoles((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Delete role failed:', err);
      const errMsg = err.response?.data?.message || 'Failed to delete role';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    roles,
    loading,
    error,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
  };
}
