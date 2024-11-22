import React, { useState, useEffect } from 'react';

function EditMemberForm({ member, onClose, onSave, plans }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    gender: '',
    plan: '',
    joindate: '',
    initamount: ''
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        contact: member.contact,
        email: member.email,
        gender: member.gender,
        plan: member.plan,  // Assuming 'plan' is the plan ID
        joindate: member.joindate,
        initamount: member.initamount  // Make sure this is passed correctly
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // API call to save the member data
      const response = await fetch(`http://localhost:8000/api/members/${member.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update member');
      }
  
      const updatedMember = await response.json();
  
      onSave(); // Fetch updated member data
      onClose(); // Close the form modal
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };
  

  return (
    <>
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <button style={styles.closeButton} onClick={onClose}>&times;</button>
          <h3 style={styles.title}>Edit Member</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Contact:</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Plan:</label>
              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                required
                style={styles.input}
              >
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - ₹{plan.amount}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Joining Date:</label>
              <input
                type="date"
                name="joindate"
                value={formData.joindate}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Initial Amount:</label>
              <input
                type="number"
                name="initamount"
                value={formData.initamount}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.saveBtn}>Save</button>
              <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    position: 'relative',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    animation: 'fadeIn 0.3s ease',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '18px',
    color: '#333',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    borderBottom: '2px solid orange',
    paddingBottom: '10px',
  },
  formGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  label: {
    width: '80px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    flex: 1,
    padding: '8px',
    marginLeft: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  saveBtn: {
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '16px',
    flex: 1,
    margin: '0 5px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
  },
  cancelBtn: {
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '16px',
    flex: 1,
    margin: '0 5px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
  },
};

export default EditMemberForm;
