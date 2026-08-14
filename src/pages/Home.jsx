import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import Navbar from '../component/Navbar';
import Hero from '../component/Hero';
import Internships from '../component/Internships';
import Footer from '../component/Footer'; 

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  async function handleLogout() {
    try {
      await axios.post('https://internship-portal-node.onrender.com/logout', {}, { withCredentials: true });
      localStorage.removeItem('token');
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Could not complete logout");
    }
  }

  return (
    <div style={{ overflowX: 'hidden', backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: '1 0 auto' }}>
        <Navbar onLogout={handleLogout} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {!searchQuery && <Hero />}
        <Internships searchQuery={searchQuery} />
      </div>
      
      
      <Footer />
    </div>
  );
}

export default Home;
