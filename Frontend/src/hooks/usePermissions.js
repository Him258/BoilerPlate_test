import { useState, useCallback } from 'react';
import api from '@/lib/api';

export function usePermissions() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPermissions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/permissions');
      setPermissions(response.data.data || response.data || []);
    } catch (err) {
      console.error('Fetch permissions failed:', err);
      setError(err.response?.data?.message || 'Failed to fetch permissions');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPermission = useCallback(async (permissionData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/permissions', permissionData);
      const newPermission = response.data.data || response.data;
      setPermissions((prev) => [newPermission, ...prev]);
      return newPermission;
    } catch (err) {
      console.error('Create permission failed:', err);
      const errMsg = err.response?.data?.message || 'Failed to create permission';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePermission = useCallback(async (id, permissionData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/permissions/${id}`, permissionData);
      const updatedPermission = response.data.data || response.data;
      setPermissions((prev) => prev.map((p) => p.id === id ? updatedPermission : p));
      return updatedPermission;
    } catch (err) {
      console.error('Update permission failed:', err);
      const errMsg = err.response?.data?.message || 'Failed to update permission';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePermission = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/permissions/${id}`);
      setPermissions((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Delete permission failed:', err);
      const errMsg = err.response?.data?.message || 'Failed to delete permission';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    permissions,
    loading,
    error,
    fetchPermissions,
    createPermission,
    updatePermission,
    deletePermission,
  };
}
