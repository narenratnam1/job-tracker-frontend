import React from 'react';
import { Flex, Heading, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="gray.700" color="white">
      <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
        Job Tracker
      </Heading>
      <Button colorScheme="teal" variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
};

export default Navbar;