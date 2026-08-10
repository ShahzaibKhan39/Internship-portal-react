import React from 'react';
import { Button, Container, Form, Nav, Navbar as BootstrapNavbar, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; 

function Navbar({ onLogout, searchQuery, setSearchQuery }) {
  const navigate = useNavigate();

  return (
    <div className="navbar-bg-wrapper">
      <BootstrapNavbar expand="lg" variant="light" className="mx-3 mx-lg-5 my-2 px-4 py-2 border border-white-50 custom-glass-navbar">
        <Container fluid className="px-0">
          
          
          <BootstrapNavbar.Brand 
            onClick={() => navigate('/Home')} 
            className="d-flex align-items-center me-3 me-md-5 ps-2 brand-link-container"
          >
            <span className="fw-bolder brand-primary-text">
              intern<span className="brand-secondary-text">.me</span>
            </span>
            <span className="ms-1 brand-arrow-icon">➔</span>
          </BootstrapNavbar.Brand>

          <BootstrapNavbar.Toggle aria-controls="navbarScroll" />

          <BootstrapNavbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 gap-2 fw-semibold vertical-max-constrain">
              <button 
                onClick={() => navigate('/Interns')} 
                className="navbar-action-link-btn internships-nav-btn"
              >
                Internships
              </button>
            </Nav>

            <Form className="d-flex my-2 my-lg-0 me-lg-4 navbar-search-form" onSubmit={(e) => e.preventDefault()}>
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Search by title..."
                  aria-label="Search"
                  className="border-end-0 px-3 py-2 custom-search-input"
                  value={searchQuery || ''}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="secondary" className="border-start-0 px-3 text-muted fw-medium custom-search-append-btn">
                  Search
                </Button>
              </InputGroup>
            </Form>

            <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0 pe-2">
              <Button 
                onClick={onLogout}
                className="px-4 py-2 fw-semibold custom-logout-btn"
              >
                Logout
              </Button>
            </div>

          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </div>
  );
}

export default Navbar;
