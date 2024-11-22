import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMembers = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    gender: '',
    plan: '',
    joindate: '',
    initamount: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [plansData, setPlansData] = useState([]);

  // Fetch plans from the API when the component mounts
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/plan/');
      setPlansData(response.data);
      setLoading(false);
    } catch (error) {
      setError('There was an error fetching the plans.');
      console.error('Error fetching plans:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      setFormData({ ...formData, [name]: value });
    } else if (name === 'plan') {
      // Set only the plan ID, not the full plan object
      setFormData({ ...formData, plan: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Form submission को रोकें

    // Payload तैयार करें, plan को ID के रूप में भेजें
    const payload = {
      ...formData,
      plan: parseInt(formData.plan), // Ensure only plan ID is sent
    };

    try {
      // API कॉल करें
      const response = await fetch('http://127.0.0.1:8000/api/members/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(), // CSRF Token भेजें
        },
        body: JSON.stringify(payload), // JSON डेटा भेजें
      });

      if (response.ok) {
        alert('New Member has been added successfully!');

        // Form को रीसेट करें
        setFormData({
          name: '',
          contact: '',
          email: '',
          gender: '',
          plan: '', // Default to empty
          joindate: '',
          initamount: '',
        });
      } else {
        // यदि Response OK नहीं है, तो Error Handle करें
        const errorData = await response.json();
        console.error('Error Response:', errorData);
        throw new Error(errorData.detail || 'Something went wrong, please try again.');
      }
    } catch (err) {
      // Catch Error और उसे दिखाएं
      alert(err.message);
      setError(err.message);
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
      backgroundColor: '#fff',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      borderBottom: '2px solid orange',
      paddingBottom: '10px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      fontSize: '16px',
    },
    input: {
      width: '100%',
      padding: '10px',
      boxSizing: 'border-box',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '20px',
    },
    radioGroup: {
      display: 'flex',
      gap: '10px',
    },
    errorMessage: {
      color: 'red',
      fontSize: '14px',
      marginTop: '10px',
    },
    loading: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#007BFF',
    },
  };

  return (
    <div style={styles.container}>
      <h5 style={styles.title}>Add Member</h5>
      {loading ? (
        <p style={styles.loading}>Loading plans...</p>
      ) : error ? (
        <p style={styles.errorMessage}>{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Name input */}
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

          {/* Contact */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Contact</label>
            <input
              type="text"
              name="contact"
              placeholder="Enter Contact Number"
              style={styles.input}
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              style={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Gender</label>
            <div style={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                /> Female
              </label>
            </div>
          </div>

          {/* Plan dropdown */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Plan</label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Select a Plan</option>
              {plansData.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - ₹{plan.amount}
                </option>
              ))}
            </select>
          </div>

          {/* Join Date */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Joining Date</label>
            <input
              type="date"
              name="joindate"
              value={formData.joindate}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Initial Amount */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Initial Amount</label>
            <input
              type="number"
              name="initamount"
              placeholder="Enter Initial Amount"
              style={styles.input}
              value={formData.initamount}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={styles.button}>Add Member</button>
        </form>
      )}
    </div>
  );
};

export default AddMembers;
