import axios from "axios"; 
import React, { useEffect, useState } from "react"; 
import { Button } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom"; 
import Card from 'react-bootstrap/Card'; 
import { Pencil, XLg } from 'react-bootstrap-icons';
import toast from "react-hot-toast";

function AdminDashboard() { 
  const [interns, setInterns] = useState([]); 
  const navigate = useNavigate(); 

  async function fetchUsers() { 
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/internships`); 
      setInterns(res.data);
    } catch (error) {
      console.error("Error fetching internships:", error);
      toast.error("Failed to load internships");
    }
  } 

  useEffect(() => { 
    fetchUsers(); 
  }, []); 

  async function deleteIntern(id) { 
    try {
      await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/internships/` + id); 
      const singleintern = interns.filter((mereinterns) => mereinterns._id !== id); 
      setInterns(singleintern); 
      toast.success("Internship deleted");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Could not delete internship");
    }
  } 

  async function handleLogout() {
    try {
      await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/logout`, {}, { withCredentials: true });
      localStorage.removeItem('token');
      toast.success("Admin logged out");
      navigate('/');
    } catch (error) {
      console.error("Admin logout failed:", error);
      toast.error("Logout failed");
    }
  }

  return ( 
    <div className="container py-3"> 
      <div className="d-flex flex-row justify-content-between align-items-center border-bottom pb-3 my-4"> 
        <h1 className="m-0 fw-bold">Admin Dashboard</h1> 
        <div className="d-flex align-items-center gap-2">
          <Button 
            variant="warning" 
            className="fw-bold text-dark px-3 py-2 shadow-sm" 
            onClick={() => navigate("/admin/applicants")}
          > 
            Applicants 
          </Button> 

          <Button 
            variant="primary" 
            className="fw-bold px-3 py-2 shadow-sm" 
            onClick={() => navigate("/CreateUser")}
          > 
            Create 
          </Button> 

          <Button 
            variant="danger" 
            className="fw-bold px-3 py-2 shadow-sm" 
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </div>
      </div> 

      <div className="interns d-flex flex-wrap gap-4 mt-2"> 
        {interns.length === 0 ? (
          <p className="text-muted fs-5 w-100 text-center my-5">No internships found. Click create to add one!</p>
        ) : (
          interns.map((mereinterns) => { 
            if (!mereinterns) return null;

            return ( 
              <Card 
                key={mereinterns._id || Math.random()} 
                style={{ width: '18rem', borderRadius: '12px' }} 
                className="bg-white text-dark shadow-sm border position-relative p-2" 
              > 
                <div className="d-flex justify-content-between align-items-center mb-1 px-1"> 
                  <span style={{ fontSize: '0.75rem', cursor: 'pointer' }} className="ms-auto me-2 text-muted"> 
                    <button 
                      type="button" 
                      onClick={() => navigate("/internships/" + mereinterns._id)} 
                      className="btn btn-link p-0 border-0 ms-auto me-2 text-muted lh-1" 
                      style={{ textDecoration: 'none' }} 
                      aria-label="Edit item"
                    > 
                      <Pencil size={13} /> 
                    </button> 
                  </span> 
                  <button 
                    type="button" 
                    onClick={() => deleteIntern(mereinterns._id)} 
                    className="btn p-0 border-0 text-muted link-dark lh-1" 
                    style={{ background: 'none' }} 
                    aria-label="Remove item" 
                  > 
                    <XLg size={14} /> 
                  </button> 
                </div> 
                <Card.Body className="pt-0"> 
                  <Card.Title className="fw-bold mb-1 fs-5 text-dark"> 
                    {mereinterns.titleName || "Untitled Position"} 
                  </Card.Title> 
                  <Card.Subtitle className="mb-3 text-success small fw-bold"> 
                    💰 {mereinterns.salery || "Salary Not Specified"} 
                  </Card.Subtitle> 
                  <Card.Text style={{ fontSize: '0.9rem', lineHeight: '1.4' }} className="mb-4 text-secondary"> 
                    {mereinterns.jobDescription || "No description provided."} 
                    <br /> 
                    <span className="small text-muted mt-2 d-block">{mereinterns.requireMent || ""}</span>
                  </Card.Text> 
                  <div className="d-flex gap-3"> 
                    <Card.Link href="#" className="text-primary text-decoration-underline p-0 m-0"> 
                      Apply 
                    </Card.Link> 
                  </div> 
                </Card.Body> 
              </Card> 
            ); 
          })
        )}
      </div> 
    </div> 
  ); 
} 

export default AdminDashboard;