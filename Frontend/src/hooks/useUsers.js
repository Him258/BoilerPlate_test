import { useState, useCallback } from 'react';
import api from '@/lib/api';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/users');
      setUsers(response.data.data || response.data || []);
    } catch (err) {
      console.error('Fetch users failed:', err);
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/users', userData);
      const newUser = response.data.data || response.data;
      setUsers((prev) => [newUser, ...prev]);
      return newUser;
    } catch (err) {
      console.error('Create user failed:', err);
      const errMsg = err.response?.data?.message || 'Failed to create user';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (id, userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/users/${id}`, userData);
      const updatedUser = response.data.data || response.data;
      setUsers((prev) => prev.map((u) => u.id === id ? updatedUser : u));
      return updatedUser;
    } catch (err) {
      console.error('Update user failed:', err);
      const errMsg = err.response?.data?.message || 'Failed to update user';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error('Delete user failed:', err);
      const errMsg = err.response?.data?.message || 'Failed to delete user';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}
