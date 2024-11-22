import React, { useState } from 'react';
import axios from 'axios';

const EditEquipmentForm = ({ equipment, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: equipment.name,
    price: equipment.price,
    unit: equipment.unit,
    purchasedate: equipment.purchasedate,
    description: equipment.description,
  });

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
      await axios.put(`http://127.0.0.1:8000/api/equipment/${equipment.id}`, formData);
      onSave();
      onClose();
    } catch (error) {
      console.error("There was an error updating the equipment!", error);
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
          max-width: 500px;
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
          width: 120px;
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
        select.input {
          padding: 8px;
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
          <h3 className="title">Edit Equipment</h3>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label className="label">Equipment Name:</label>
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
              <label className="label">Price:</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="formGroup">
              <label className="label">Unit:</label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="formGroup">
              <label className="label">Purchase Date:</label>
              <input
                type="date"
                name="purchasedate"
                value={formData.purchasedate}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="formGroup">
              <label className="label">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="input"
                rows="4"
              />
            </div>
            <div className="buttonContainer">
              <button type="submit" className="saveBtn" onClick={onSave}>Save</button>
              <button type="button" className="cancelBtn" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditEquipmentForm;
