import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import Navbar from '../component/Navbar';
import Internships from '../component/Internships';
import Footer from '../component/Footer';

function InternshipPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios.post(`${process.env.VITE_APP_BACKEND_URL}/logout`, {}, { withCredentials: true });
      localStorage.removeItem('token');
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      console.error("Logout runtime break:", error);
      toast.error("Could not complete logout");
    }
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: '1 0 auto' }}>
        <Navbar onLogout={handleLogout} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="container mt-4">
          <Internships searchQuery={searchQuery} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InternshipPage;
