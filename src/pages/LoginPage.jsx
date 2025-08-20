import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Box, VStack, FormControl, FormLabel, Input, Button, Heading, Text, useToast, Flex } from '@chakra-ui/react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/auth/login`, formData);
      localStorage.setItem('token', response.data.token);
      toast({ title: 'Login Successful.', status: 'success', duration: 2000, isClosable: true });
      navigate('/dashboard');
    } catch (error) {
      toast({ title: 'Login Failed.', description: 'Please check your email and password.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg" bg="gray.700">
        <VStack spacing={4}>
          <Heading>Login</Heading>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" onChange={handleChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" onChange={handleChange} />
              </FormControl>
              <Button type="submit" colorScheme="teal" width="full">Login</Button>
            </VStack>
          </form>
          <Text>
            Don't have an account?{' '}
            <Button as={Link} to="/register" variant="link" colorScheme="teal">
              Register here
            </Button>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;