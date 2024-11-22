import React, { useState, useEffect } from 'react';
import { Modal } from 'antd'; // Import Modal from antd

const AddEnquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    age: '',
    gender: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if CSRF token is stored in localStorage and if not, get it
    if (!localStorage.getItem('csrftoken')) {
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        localStorage.setItem('csrftoken', csrfToken);  // Store in localStorage
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/enquiries/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': localStorage.getItem('csrftoken'), // Use token from localStorage
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Show success modal on success
        Modal.success({
          title: 'Success',
          content: 'Your Enquiry has been Added Successfully',
          onOk: () => {
            // Reset the form data when modal is closed
            setFormData({
              name: '',
              mobile: '',
              email: '',
              age: '',
              gender: '',
            });
          },
        });
      } else {
        throw new Error('Something went wrong, Try Again');
      }
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

  const getCSRFToken = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'csrftoken') {
        return value;
      }
    }
    return null;
  };

  const styles = {
    container: {
      width: '90%',
      maxWidth: '600px',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      margin: '50px auto',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      borderBottom: '2px solid orange',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      boxSizing: 'border-box',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <h5 style={styles.title}>Add Enquiry</h5>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            style={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Contact Number</label>
          <input
            type="text"
            name="mobile"
            placeholder="Enter Mobile Number"
            style={styles.input}
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email ID</label>
          <input
            type="text"
            name="email"
            placeholder="Enter Email ID"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Enter Age</label>
          <input
            type="text"
            name="age"
            placeholder="Enter Age (In Year)"
            style={styles.input}
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Gender</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
            required
          /> Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
            required
          /> Female
        </div>

        <hr />
        <input type="submit" value="Submit" style={styles.button} />
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddEnquiry;
