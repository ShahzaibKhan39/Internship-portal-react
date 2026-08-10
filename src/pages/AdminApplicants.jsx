import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchApplicants() {
    try {
      const res = await axios.get("http://localhost:5000/applications");
      setApplicants(res.data);
    } catch (error) {
      console.error("Error querying candidate profiles:", error);
      toast.error("Failed to load candidate applications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold text-dark" style={{ letterSpacing: '-0.5px' }}>Received Applications</h1>
        <Button variant="secondary" onClick={() => navigate('/AdminDashboard')}>
          Back to Dashboard
        </Button>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : applicants.length === 0 ? (
        <p className="text-muted fs-5">No application logs recorded in the database yet.</p>
      ) : (
        <Table responsive bordered hover className="shadow-sm bg-white align-middle">
          <thead className="table-dark">
            <tr>
              <th>Job Position</th>
              <th>Qualifications / Experience</th>
              <th>Links</th>
              <th>CV Document</th>
              <th>Submitted Date</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((candidate) => (
              <tr key={candidate._id || Math.random()}>
                <td className="fw-bold text-primary">{candidate.jobRole}</td>
                <td style={{ maxWidth: '300px', fontSize: '0.9rem' }} className="text-secondary">
                  {candidate.qualification}
                </td>
                <td>
                  <div className="d-flex flex-column gap-1">
                    <a href={candidate.linkedin} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary text-start py-1">
                      🌐 LinkedIn Profile
                    </a>
                    <a href={candidate.github} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-dark text-start py-1">
                      💻 GitHub Workspace
                    </a>
                  </div>
                </td>
                <td>
                  <a href={candidate.cvLink} target="_blank" rel="noreferrer" className="btn btn-sm btn-success px-3 fw-medium">
                    📄 View Resume PDF
                  </a>
                </td>
                <td className="small text-muted">
                  {candidate.appliedAt ? new Date(candidate.appliedAt).toLocaleDateString() : 'Recent'}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminApplicants;
