import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';
import './EditIntern.css';

function EditIntern() {
  const [intern, setintern] = useState({
    titleName: '',
    jobDescription: '',
    requireMent: '',
    salery: ''
  });

  const navigate = useNavigate();
  const params = useParams();

  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setintern({ ...intern, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.patch(`${API_BASE_URL}/internships/${params.id}`, intern);
      console.log(res);
      toast.success('Updated');
      setintern({
        titleName: '',
        jobDescription: '',
        requireMent: '',
        salery: ''
      });
      navigate('/AdminDashboard');
    } catch (error) {
      console.error('Update endpoint failure:', error);
      toast.error(error.response?.data?.message || 'Failed to update internship details.');
    }
  }

  async function getUserById() {
    try {
      const res = await axios.get(`${API_BASE_URL}/internships/${params.id}`);
      console.log(res.data);
      setintern(res.data);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load internship data.');
    }
  }

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div className="edit-intern-container">
      <div className="edit-intern-card">
        <button
          type="button"
          onClick={() => navigate('/Interns')}
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
            <label htmlFor="titleName" className="form-label">
              TITLE NAME
            </label>
            <input
              id="titleName"
              type="text"
              name="titleName"
              value={intern.titleName}
              onChange={changeHandler}
              required
              placeholder="Enter job title"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobDescription" className="form-label">
              JOB DESCRIPTION
            </label>
            <textarea
              id="jobDescription"
              rows="3"
              name="jobDescription"
              placeholder="Enter job description"
              value={intern.jobDescription}
              onChange={changeHandler}
              required
              className="form-input form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="requireMent" className="form-label">
              REQUIREMENT
            </label>
            <textarea
              id="requireMent"
              rows="2"
              name="requireMent"
              placeholder="Enter requirements"
              value={intern.requireMent}
              onChange={changeHandler}
              required
              className="form-input form-textarea"
            />
          </div>

          <div className="form-group salary-group">
            <label htmlFor="salery" className="form-label">
              SALARY
            </label>
            <input
              id="salery"
              type="text"
              name="salery"
              placeholder="Enter salary range or amount"
              value={intern.salery}
              onChange={changeHandler}
              required
              className="form-input"
            />
          </div>

          <div className="button-wrapper">
            <button type="submit" className="submit-btn">
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditIntern;