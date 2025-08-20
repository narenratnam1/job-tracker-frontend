import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Box, VStack, FormControl, FormLabel, Input, Button, Heading, Text, useToast, Flex } from '@chakra-ui/react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${apiUrl}/api/auth/register`, formData);
      toast({ title: 'Account created.', description: "Redirecting you to login.", status: 'success', duration: 3000, isClosable: true });
      navigate('/login');
    } catch (error) {
      toast({ title: 'Registration failed.', description: 'An account with this email may already exist.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg" bg="gray.700">
        <VStack spacing={4}>
          <Heading>Create an Account</Heading>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" name="username" onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" onChange={handleChange} />
              </FormControl>
              <Button type="submit" colorScheme="teal" width="full">Register</Button>
            </VStack>
          </form>
          <Text>
            Already have an account?{' '}
            <Button as={Link} to="/login" variant="link" colorScheme="teal">
              Login here
            </Button>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default RegisterPage;