import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import './ApplyForm.css';

function ApplyForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialJobTitle = location.state?.jobTitle || '';

  const [formData, setFormData] = useState({
    qualification: '',
    jobRole: initialJobTitle,
    linkedin: '',
    github: '',
    cvLink: ''
  });

  function changeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post('https://internship-portal-node.onrender.com/applications', formData);

      if (response.data.success) {
        toast.success('Application Submitted successfully');
        navigate('/Home');
      }
    } catch (error) {
      console.error('Submission layout failure:', error);
      toast.error(error.response?.data?.message || 'Failed to save submission data.');
    }
  }

  return (
    <div className="apply-container">
      <div className="apply-card">
        
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Close"
          className="close-btn"
        >
          ✕
        </button>

        
        <div className="illustration-wrapper">
          <svg
            width="100%"
            height="110"
            viewBox="0 0 300 80"
            fill="none"
            stroke="#2c3e50"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            
            <circle cx="150" cy="20" r="8" />
            <path d="M150 8v4 M150 28v4 M138 20h-4 M166 20h-4 M141.5 11.5l-2.8-2.8 M161.3 31.3l-2.8-2.8 M141.5 28.5l-2.8 2.8 M161.3 8.7l-2.8 2.8" />
            
            
            <path d="M10 70h280" />
            <path d="M40 70V45h30v25 M80 70V30h30v40 M125 70V10h10v60 M150 70V40h20v30 M180 70V25h35v45 M225 70V35h30v35" />
            <path d="M175 40l15-10 15 10" />
            <path d="M250 50l10-7 10 7v20h-20z" />
          </svg>
        </div>

        
        <form onSubmit={submitHandler}>
          
          <div className="form-group">
            <label htmlFor="jobRole" className="form-label">
              SELECTED JOB ROLE
            </label>
            <input
              id="jobRole"
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={changeHandler}
              required
              placeholder="e.g., Frontend Web Developer"
              className="form-input"
            />
          </div>

          
          <div className="form-group">
            <label htmlFor="qualification" className="form-label">
              HIGHEST QUALIFICATION
            </label>
            <textarea
              id="qualification"
              rows="3"
              name="qualification"
              placeholder="Degree, major, or certifications..."
              value={formData.qualification}
              onChange={changeHandler}
              required
              className="form-input form-textarea"
            />
          </div>

          
          <div className="form-group">
            <label htmlFor="linkedin" className="form-label">
              LINKEDIN PROFILE URL
            </label>
            <input
              id="linkedin"
              type="url"
              name="linkedin"
              placeholder="https://linkedin.com"
              value={formData.linkedin}
              onChange={changeHandler}
              required
              className="form-input"
            />
          </div>

          
          <div className="form-group">
            <label htmlFor="github" className="form-label">
              GITHUB PROFILE URL
            </label>
            <input
              id="github"
              type="url"
              name="github"
              placeholder="https://github.com"
              value={formData.github}
              onChange={changeHandler}
              required
              className="form-input"
            />
          </div>

          
          <div className="form-group cv-group">
            <label htmlFor="cvLink" className="form-label">
              CV / RESUME PDF LINK
            </label>
            <input
              id="cvLink"
              type="url"
              name="cvLink"
              placeholder="Drive or Dropbox PDF link"
              value={formData.cvLink}
              onChange={changeHandler}
              required
              className="form-input"
            />
          </div>

          
          <div className="button-wrapper">
            <button type="submit" className="submit-btn">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyForm;