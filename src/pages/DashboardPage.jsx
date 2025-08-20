import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddApplicationForm from '../components/AddApplicationForm';
import ApplicationList from '../components/ApplicationList';
import { VStack, Heading } from '@chakra-ui/react';

const DashboardPage = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApplications = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const config = { headers: { 'x-auth-token': token } };
      const res = await axios.get(`${apiUrl}/api/applications`, config);
      setApplications(res.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <VStack spacing={8} align="stretch">
      <AddApplicationForm onApplicationAdded={fetchApplications} />
      <ApplicationList
        applications={applications}
        onUpdate={fetchApplications}
        isLoading={isLoading}
      />
    </VStack>
  );
};

export default DashboardPage;