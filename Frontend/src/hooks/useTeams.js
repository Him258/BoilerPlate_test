import { useState, useCallback } from 'react';
import api from '../lib/api';

export function useTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/teams');
      setTeams(response.data.data || response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTeam = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/teams', data);
      await fetchTeams();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to create team');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTeam = async (id, data) => {
    setLoading(true);
    try {
      const response = await api.put(`/teams/${id}`, data);
      await fetchTeams();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to update team');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/teams/${id}`);
      await fetchTeams();
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message || 'Failed to delete team');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    teams,
    loading,
    error,
    fetchTeams,
    createTeam,
    updateTeam,
    deleteTeam,
  };
}
