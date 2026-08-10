import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import './Internships.css';

function Internships({ searchQuery }) {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchInternships() {
    try {
      const res = await axios.get("http://localhost:5000/internships");
      setInternships(res.data);
    } catch (error) {
      console.error("Error fetching internships:", error);
      toast.error("Failed to load positions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInternships();
  }, []);

  const filteredInternships = internships.filter((job) => {
    if (!job || !job.titleName) return false;
    return job.titleName.toLowerCase().includes((searchQuery || '').toLowerCase());
  });

  return (
    <Container id="internship-grid-section" className="pt-5 my-5">
      <h2 className="section-title">
        Available Positions
      </h2>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredInternships.length === 0 ? (
        <p className="text-muted fs-5">No active internship matching your search terms.</p>
      ) : (
        
        <div className="cards-grid-row">
          {filteredInternships.map((job) => {
            if (!job) return null;
            
            return (
              <Card 
                key={job._id || Math.random()} 
                className="custom-job-card"
              >
                <Card.Body className="card-body-layout">
                  <Card.Title className="job-title">
                    {job.titleName || "Untitled Position"}
                  </Card.Title>

                  <Card.Subtitle className="job-salary">
                    💰 {job.salery || "Salary Unspecified"}
                  </Card.Subtitle>

                  <Card.Text className="job-description">
                    <strong className="field-label">Description:</strong>
                    {job.jobDescription || "No overview details listed."}
                  </Card.Text>

                  <Card.Text className="job-requirements">
                    <strong className="field-label">Requirements:</strong>
                    {job.requireMent || "None specified."}
                  </Card.Text>

                  <button 
                    className="btn btn-apply"
                    onClick={() => navigate('/apply', { state: { jobTitle: job.titleName } })}
                  >
                    Apply for Role
                  </button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
}

export default Internships;
