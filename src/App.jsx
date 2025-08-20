import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <>
      {showNavbar && <Navbar />}
      <Container maxW="container.xl" pt={showNavbar ? 4 : 0}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<LoginPage />} /> {/* Default route */}
        </Routes>
      </Container>
    </>
  );
}

export default App;