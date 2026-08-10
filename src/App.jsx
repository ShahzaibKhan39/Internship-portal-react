import React from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { Toaster } from 'react-hot-toast';
import CreateIntern from './pages/CreateIntern'; 
import EditIntern from './pages/EditIntern';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home'; 
import InternshipPage from './pages/InternshipPage'; 
import ApplyForm from './pages/ApplyForm';
import AdminDashboard from './pages/AdminDashboard';
import AdminApplicants from './pages/AdminApplicants'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/register' element={<Register />} />
        <Route path='/Home' element={<Home />} /> 
        <Route path='/Interns' element={<InternshipPage />} /> 
        <Route path='/apply' element={<ApplyForm />} /> 
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/admin/applicants' element={<AdminApplicants />} /> 
        <Route path='/CreateUser' element={<CreateIntern />} />
        <Route path="/internships/:id" element={<EditIntern />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;