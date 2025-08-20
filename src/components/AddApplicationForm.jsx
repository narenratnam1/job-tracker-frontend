import React, { useState } from 'react';
import axios from 'axios';
import { Box, VStack, FormControl, FormLabel, Input, Button, Heading, useToast } from '@chakra-ui/react';

const AddApplicationForm = ({ onApplicationAdded }) => {
  const [formData, setFormData] = useState({ companyName: '', jobTitle: '', location: '', jobLink: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const toast = useToast();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setResumeFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (resumeFile) data.append('resume', resumeFile);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const config = { headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' } };
      await axios.post(`${apiUrl}/api/applications`, data, config);
      setFormData({ companyName: '', jobTitle: '', location: '', jobLink: '' });
      setResumeFile(null);
      document.querySelector('input[type="file"]').value = '';
      toast({ title: 'Application Added.', status: 'success', duration: 3000, isClosable: true });
      onApplicationAdded();
    } catch (error) {
      toast({ title: 'Error.', description: 'Could not add application.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="gray.700">
      <Heading size="lg" mb={4}>Add New Application</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input name="companyName" value={formData.companyName} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Job Title</FormLabel>
            <Input name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input name="location" value={formData.location} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Job Link</FormLabel>
            <Input type="url" name="jobLink" value={formData.jobLink} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Resume (PDF)</FormLabel>
            <Input type="file" name="resume" onChange={handleFileChange} p={1} sx={{'::file-selector-button': { mr: 4 }}} />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">Add Application</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddApplicationForm;