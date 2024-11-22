import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditEnquiryForm from './EditEnquiryForm';

function ViewEnquiry() {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEnquiry, setEditingEnquiry] = useState(null);

  // Fetch enquiries from the API
  const fetchEnquiries = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/enquiries/');
      setEnquiries(response.data);
      console.log(response.data,'p')
      
    } catch (error) {
      setError("There was an error fetching the enquiries.");
      console.error("There was an error fetching the enquiries!", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle enquiry deletion
  const handleDelete = async (id) => {
    console.log(id)
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      try {
        await axios.delete(`http://localhost:8000/api/enquiries/${id}/delete/`);
        fetchEnquiries(); // Refresh the enquiry list
      } catch (error) {
        console.error("There was an error deleting the enquiry!", error);
      }
    }
  };

  //Handle Edit


  // Open Edit Modal
  const handleEdit = (enquiry) => {
    setEditingEnquiry(enquiry);
  };

  // Close Edit Modal
  const handleCloseEdit = () => {
    setEditingEnquiry(null);
  };

  // Fetch enquiries when component mounts
  useEffect(() => {
    fetchEnquiries();
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
        <h2 style={styles.tableHeading}>View Enquiry</h2>

        <table style={styles.enquiryTable}>
          <thead>
            <tr>
              <th style={styles.tableHeadRow}>S.NO</th>
              <th style={styles.tableHeadRow}>NAME</th>
              <th style={styles.tableHeadRow}>CONTACT NUMBER</th>
              <th style={styles.tableHeadRow}>EMAIL ID</th>
              <th style={styles.tableHeadRow}>AGE</th>
              <th style={styles.tableHeadRow}>GENDER</th>
              <th style={styles.tableHeadRow}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry, index) => (
              <tr key={enquiry.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{index + 1}</td>
                <td style={styles.tableCell}>{enquiry.name}</td>
                <td style={styles.tableCell}>{enquiry.mobile}</td>
                <td style={styles.tableCell}>{enquiry.email}</td>
                <td style={styles.tableCell}>{enquiry.age}</td>
                <td style={styles.tableCell}>{enquiry.gender}</td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(enquiry)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(enquiry.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingEnquiry && (
        <EditEnquiryForm
          enquiry={editingEnquiry}
          onClose={handleCloseEdit}
          onSave={fetchEnquiries}
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

export default ViewEnquiry;
