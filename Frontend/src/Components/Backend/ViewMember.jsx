import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditMemberForm from './EditMemberForm';

function ViewMember() {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMember, setEditingMember] = useState(null);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/members/');
      setMembers(response.data);
    } catch (error) {
      setError("There was an error fetching the members.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/plan/');
      setPlans(response.data);
    } catch (error) {
      setError("There was an error fetching the plans.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`http://localhost:8000/api/members/${id}/delete/`);
        fetchMembers();
      } catch (error) {
        console.error("There was an error deleting the member!", error);
      }
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
  };

  const handleCloseEdit = () => {
    setEditingMember(null);
  };

  useEffect(() => {
    fetchMembers();
    fetchPlans();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  // Helper function to get plan details by plan ID
  const getPlanDetails = (planId) => {
    const plan = plans.find((p) => p.id === planId);
    if (plan) {
      return `${plan.name} - ₹${plan.amount}`;
    }
    return 'N/A';
  };

  return (
    <div style={styles.memberContainer}>
      <header style={styles.eqheader}>
        <h1 style={styles.eqheaderH1}>Admin Dashboard</h1>
      </header>

      <div style={styles.tableContainer}>
        <h2 style={styles.tableHeading}>Member Data</h2>

        <table style={styles.memberTable}>
          <thead>
            <tr>
              <th style={styles.tableHeadRow}>S.NO</th>
              <th style={styles.tableHeadRow}>NAME</th>
              <th style={styles.tableHeadRow}>CONTACT NO.</th>
              <th style={styles.tableHeadRow}>EMAIL ID</th>
              <th style={styles.tableHeadRow}>GENDER</th>
              <th style={styles.tableHeadRow}>PLAN</th>
              <th style={styles.tableHeadRow}>JOINING DATE</th>
              <th style={styles.tableHeadRow}>INITIAL AMOUNT</th>
              <th style={styles.tableHeadRow}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{index + 1}</td>
                <td style={styles.tableCell}>{member.name}</td>
                <td style={styles.tableCell}>{member.contact}</td>
                <td style={styles.tableCell}>{member.email}</td>
                <td style={styles.tableCell}>{member.gender}</td>
                <td style={styles.tableCell}>
                  {getPlanDetails(member.plan)}
                </td>
                <td style={styles.tableCell}>{member.joindate}</td>
                <td style={styles.tableCell}>{member.initamount}</td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(member)}
                  >
                    <i className="fas fa-edit" style={styles.icon}></i>
                    <span style={styles.buttonText}>Edit</span>
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(member.id)}
                  >
                    <i className="fas fa-trash-alt" style={styles.icon}></i>
                    <span style={styles.buttonText}>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingMember && (
        <EditMemberForm
          member={editingMember}
          onClose={handleCloseEdit}
          onSave={() => {
            fetchMembers(); // Refresh member list
            handleCloseEdit(); // Close modal
          }}
          plans={plans}
        />
      )}

    </div>
  );
}


const styles = {
  memberContainer: {
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
  memberTable: {
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
    display: "flex",
    alignItems: "center",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "8px",
  },
  buttonText: {
    fontSize: "14px",
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default ViewMember;

