import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditEquipmentForm from './EditEquipmentForm';

function ViewEquipment() {
  const [equipment, setEquipment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEquipment, setEditingEquipment] = useState(null);

  // Fetch equipment data from the API
  const fetchEquipment = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/equipment/');
      setEquipment(response.data);
    } catch (error) {
      setError("There was an error fetching the equipment.");
      console.error("There was an error fetching the equipment!", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle equipment deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this equipment?")) {
      try {
        await axios.delete(`http://localhost:8000/api/equipment/${id}/delete/`);
        fetchEquipment(); // Refresh the equipment list
      } catch (error) {
        console.error("There was an error deleting the equipment!", error);
      }
    }
  };

  // Open Edit Modal
  const handleEdit = (equipment) => {
    setEditingEquipment(equipment);
  };

  // Close Edit Modal
  const handleCloseEdit = () => {
    setEditingEquipment(null);
  };

  // Fetch equipment when component mounts
  useEffect(() => {
    fetchEquipment();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.enquiryContainer}>
      <header style={styles.eqheader}>
        <h1 style={styles.eqheaderH1}>Admin Dashboard</h1>
      </header>

      <div style={styles.tableContainer}>
        <h2 style={styles.tableHeading}>View Equipment</h2>

        <table style={styles.enquiryTable}>
          <thead>
            <tr>
              <th style={styles.tableHeadRow}>S.NO</th>
              <th style={styles.tableHeadRow}>EQUIPMENT NAME</th>
              <th style={styles.tableHeadRow}>PRICE</th>
              <th style={styles.tableHeadRow}>UNIT</th>
              <th style={styles.tableHeadRow}>PURCHASE DATE</th>
              <th style={styles.tableHeadRow}>DESCRIPTION</th>
              <th style={styles.tableHeadRow}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item, index) => (
              <tr key={item.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{index + 1}</td>
                <td style={styles.tableCell}>{item.name}</td>
                <td style={styles.tableCell}>{item.price}</td>
                <td style={styles.tableCell}>{item.unit}</td>
                <td style={styles.tableCell}>{item.purchasedate}</td>
                <td style={styles.tableCell}>{item.description}</td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingEquipment && (
        <EditEquipmentForm
          equipment={editingEquipment} 
          onClose={handleCloseEdit}
          onSave={fetchEquipment}
        />
      )}
    </div>
  );
}

const styles = {
  enquiryContainer: {
    width: "90%",
    margin: "0 auto",
    padding: "20px",
  },
  eqheader: {
    backgroundColor: "#fff",
    padding: "20px",
    textAlign: "center",
    borderBottom: "2px solid #eee",
  },
  eqheaderH1: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  },
  tableContainer: {
    marginTop: "30px",
    position: "relative",
  },
  tableHeading: {
    fontSize: "20px",
    marginBottom: "10px",
    borderBottom: "2px solid #b58f00",
    display: "inline-block",
    paddingBottom: "5px",
  },
  enquiryTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "30px",
  },
  tableHeadRow: {
    backgroundColor: "#5c4033",
    color: "white",
    textAlign: "center",
    padding: "10px",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center",
  },
  tableRow: {
    backgroundColor: "#f9f9f9",
  },
  editBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    marginRight: "5px",
    borderRadius: "4px",
    fontWeight: "bold",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "bold",
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default ViewEquipment;
