import React, { useState } from 'react';

const AddPlan = () => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    duration: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/plan/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(), // CSRF token for security
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Your Plan Added Successfully');
        setFormData({
          name: '',
          amount: '',
          duration: '',
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
      <h5 style={styles.title}>Add Plan</h5>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Plan Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Plan Name"
            style={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Amount</label>
          <input
            type="text"
            name="amount"
            placeholder="Enter Amount (In RS.)"
            style={styles.input}
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Duration</label>
          <input
            type="text"
            name="duration"
            placeholder="Enter Duration (In Month)"
            style={styles.input}
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <hr />
        <input type="submit" value="Submit" style={styles.button} />
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddPlan;
