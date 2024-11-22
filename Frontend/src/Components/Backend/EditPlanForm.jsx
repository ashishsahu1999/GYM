import React, { useState } from 'react';
import axios from 'axios';

const EditPlanForm = ({ plan, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: plan.name,
    amount: plan.amount,
    duration: plan.duration,
  });

  console.log(formData);


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
      await axios.put(`http://localhost:8000/api/plan/${plan.id}`, formData);
      onSave(); 
      onClose(); 
    } catch (error) {
      console.error("There was an error updating the plan!", error);
    }
  };

  return (
    <>
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modalContent {
          position: relative;
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .closeButton {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 18px;
          color: #333;
          background: none;
          border: none;
          cursor: pointer;
        }
        .title {
          text-align: center;
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: bold;
          color: #333;
          border-bottom: 2px solid orange;
          padding-bottom: 10px;
        }
        .formGroup {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        .label {
          width: 80px;
          font-weight: bold;
          color: #555;
        }
        .input {
          flex: 1;
          padding: 8px;
          margin-left: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }
        .buttonContainer {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .saveBtn, .cancelBtn {
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 4px;
          font-weight: bold;
          font-size: 16px;
          flex: 1;
          margin: 0 5px;
        }
        .saveBtn {
          background-color: #28a745;
          color: white;
          border: none;
        }
        .cancelBtn {
          background-color: #dc3545;
          color: white;
          border: none;
        }
      `}</style>

      <div className="modal">
        <div className="modalContent">
          <button className="closeButton" onClick={onClose}>&times;</button>
          <h3 className="title">Edit Plan</h3>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label className="label">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="formGroup">
              <label className="label">Amount:</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="formGroup">
              <label className="label">Duration (In Month):</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="buttonContainer">
              <button type="submit" className="saveBtn">Save</button>
              <button type="button" className="cancelBtn" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPlanForm;
