import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';

function Internships({ searchQuery = '' }) {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInternships() {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/internships`);
        setInternships(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error('Error fetching internships:', error);
        toast.error('Failed to connect to backend server');
      } finally {
        setLoading(false);
      }
    }
    fetchInternships();
  }, []);

  const filteredInternships = internships.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.titleName?.toLowerCase().includes(query) ||
      item.jobDescription?.toLowerCase().includes(query) ||
      item.requireMent?.toLowerCase().includes(query)
    );
  });

  return (
    <Container className="my-5" id="internships-section">
      <h2 className="fw-bold mb-4">Available Positions</h2>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredInternships.length === 0 ? (
        <p className="text-muted fs-5">
          No active internship matching your search terms.
        </p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredInternships.map((item) => (
            <Col key={item._id || Math.random()}>
              <Card className="h-100 shadow-sm border-0 rounded-3 p-3">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold fs-5 text-dark mb-1">
                    {item.titleName || 'Untitled Position'}
                  </Card.Title>
                  <Card.Subtitle className="mb-3 text-success fw-bold small">
                    💰 {item.salery || 'Unpaid / Not specified'}
                  </Card.Subtitle>
                  <Card.Text className="text-secondary small mb-3 flex-grow-1">
                    {item.jobDescription}
                  </Card.Text>
                  <div className="mb-3 small text-muted">
                    <strong>Requirements:</strong> {item.requireMent}
                  </div>
                  <Button
                    variant="primary"
                    className="w-100 fw-bold mt-auto"
                    onClick={() =>
                      navigate('/apply', {
                        state: { jobTitle: item.titleName }
                      })
                    }
                  >
                    Apply Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Internships;