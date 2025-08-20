import React, { useState } from 'react';
import axios from 'axios';
import { Box, Input, Select, Button, SimpleGrid, Text, VStack, HStack, Heading, Link, Spinner, useToast } from '@chakra-ui/react';

const ApplicationList = ({ applications, onUpdate, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const statuses = ['Applied', 'Interviewing', 'Offer', 'Rejected'];
  const toast = useToast();

  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const config = { headers: { 'x-auth-token': token } };
      await axios.put(`${apiUrl}/api/applications/${id}`, { status: newStatus }, config);
      onUpdate();
      toast({ title: 'Status Updated.', status: 'success', duration: 2000, isClosable: true });
    } catch (error) {
      toast({ title: 'Error.', description: 'Could not update status.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      const token = localStorage.getItem('token');
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const config = { headers: { 'x-auth-token': token } };
        await axios.delete(`${apiUrl}/api/applications/${id}`, config);
        onUpdate();
        toast({ title: 'Application Deleted.', status: 'info', duration: 2000, isClosable: true });
      } catch (error) {
        toast({ title: 'Error.', description: 'Could not delete application.', status: 'error', duration: 3000, isClosable: true });
      }
    }
  };

  const handleEditClick = (app) => {
    setEditingId(app._id);
    setEditFormData(app);
  };
  const handleCancelEdit = () => setEditingId(null);
  const handleEditFormChange = (e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value });

  const handleUpdate = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const config = { headers: { 'x-auth-token': token } };
      await axios.put(`${apiUrl}/api/applications/${id}`, editFormData, config);
      setEditingId(null);
      onUpdate();
      toast({ title: 'Application Updated.', status: 'success', duration: 2000, isClosable: true });
    } catch (error) {
      toast({ title: 'Error.', description: 'Could not update application.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const filteredApplications = (applications || []).filter(app =>
    app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.location && app.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg">Your Applications</Heading>
      <Input
        placeholder="Search by company, title, or location..."
        onChange={(e) => setSearchTerm(e.target.value)}
        size="lg"
        bg="gray.700"
      />
      {filteredApplications.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredApplications.map((app) => (
            <Box key={app._id} p={5} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="gray.700">
              {editingId === app._id ? (
                <VStack as="form" spacing={4} onSubmit={(e) => { e.preventDefault(); handleUpdate(app._id); }}>
                  <Input name="jobTitle" value={editFormData.jobTitle} onChange={handleEditFormChange} />
                  <Input name="companyName" value={editFormData.companyName} onChange={handleEditFormChange} />
                  <Input name="location" value={editFormData.location} onChange={handleEditFormChange} />
                  <Input type="url" name="jobLink" value={editFormData.jobLink} onChange={handleEditFormChange} />
                  <HStack>
                    <Button type="submit" colorScheme="teal">Save</Button>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                  </HStack>
                </VStack>
              ) : (
                <VStack align="stretch" spacing={3}>
                  <Heading size="md">{app.jobTitle}</Heading>
                  <Text>at {app.companyName}</Text>
                  {app.location && <Text fontSize="sm" color="gray.400">{app.location}</Text>}
                  {app.jobLink && <Link href={app.jobLink} isExternal color="teal.300">View Job Posting</Link>}
                  {app.resumePath && <Link href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/${app.resumePath}`} isExternal color="teal.300">View Resume</Link>}
                  <Select value={app.status} onChange={(e) => handleStatusChange(app._id, e.target.value)} bg="gray.600">
                    {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                  </Select>
                  <HStack>
                    <Button size="sm" onClick={() => handleEditClick(app)}>Edit</Button>
                    <Button size="sm" colorScheme="red" onClick={() => handleDelete(app._id)}>Delete</Button>
                  </HStack>
                </VStack>
              )}
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text>No applications found. Add one above to get started!</Text>
      )}
    </VStack>
  );
};

export default ApplicationList;