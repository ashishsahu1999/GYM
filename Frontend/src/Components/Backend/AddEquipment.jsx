import React, { useState } from 'react';

const AddEquipment = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: '',
    purchasedate: '', // Make sure the field name is consistent
    description: '',
  });

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting normally

    // Optional: Validate fields before submitting
    if (!formData.name || !formData.price || !formData.unit || !formData.purchasedate) {
      alert("All fields are required");
      return;
    }

    // Create an object with formatted data to send to the backend
    const dataToSend = {
      ...formData,
      purchasedate: formData.purchasedate ? formData.purchasedate : '', // ensure it's not undefined or empty
    };

    try {
      const response = await fetch('http://localhost:8000/api/equipment/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': localStorage.getItem('csrftoken'), // Use token from localStorage
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Your new equipment has been added successfully');
        setFormData({ name: '', price: '', unit: '', purchasedate: '', description: '' }); // Optionally clear the form after success
      } else {
        alert(data?.message || 'Failed to add equipment. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding equipment. Please try again.');
    }
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
    },
  };

  return (
    <div style={styles.container}>
      <h5 style={styles.title}>Add Equipment</h5>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Equipment Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Equipment Name"
            required
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Price</label>
          <input
            type="text"
            name="price"
            className="form-control"
            placeholder="Enter Price (In RS.)"
            required
            value={formData.price}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Unit</label>
          <input
            type="text"
            name="unit"
            className="form-control"
            placeholder="Enter Unit"
            required
            value={formData.unit}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Purchase Date</label>
          <input
            type="date"
            name="purchasedate" // Ensure this matches the state property
            className="form-control"
            required
            value={formData.purchasedate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Describe about Equipment"
            value={formData.description}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <hr />
        <input type="submit" value="Submit" className="btn btn-primary" style={styles.button} />
      </form>
    </div>
  );
};

export default AddEquipment;
