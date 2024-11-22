import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditPlanForm from './EditPlanForm';

function ViewPlan() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);

  // Fetch plans from the API
  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/plan/');
      setPlans(response.data);
    } catch (error) {
      setError("There was an error fetching the plans.");
      console.error("There was an error fetching the plans!", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle plan deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await axios.delete(`http://localhost:8000/api/plan/${id}/delete/`);
        fetchPlans(); // Refresh the plan list
      } catch (error) {
        console.error("There was an error deleting the plan!", error);
      }
    }
  };

  // Open Edit Modal
  const handleEdit = (plan) => {
    setEditingPlan(plan);
  };

  // Close Edit Modal
  const handleCloseEdit = () => {
    setEditingPlan(null);
  };

  // Fetch plans when component mounts
  useEffect(() => {
    fetchPlans();
  }, []);

  // Fetch plans again after saving edits
  const handleSave = () => {
    fetchPlans();
    handleCloseEdit(); // Close the edit modal after saving
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="enquiry-container">
      <header className="eqheader">
        <h1>Admin Dashboard</h1>
      </header>

      <div className="table-container">
        <h2>View Plan</h2>

        <table className="enquiry-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>PLAN NAME</th>
              <th>AMOUNT</th>
              <th>DURATION (IN MONTH)</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <tr key={plan.id}>
                <td>{index + 1}</td>
                <td>{plan.name}</td>
                <td>{plan.amount}</td>
                <td>{plan.duration}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(plan)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(plan.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingPlan && (
        <EditPlanForm
          plan={editingPlan}
          onClose={handleCloseEdit}
          onSave={handleSave} // Use the updated handleSave function
        />
      )}

      {/* Internal CSS */}
      <style jsx>{`
        /* enquiry-container styles */
        .enquiry-container {
          width: 90%;
          margin: 0 auto;
          padding: 20px;
        }

        /* eqheader styles */
        .eqheader {
          background-color: #fff;
          padding: 20px;
          text-align: center;
          border-bottom: 2px solid #eee;
        }

        .eqheader h1 {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }

        /* table-container styles */
        .table-container {
          margin-top: 30px;
          position: relative;
        }

        /* table heading styles */
        .table-container h2 {
          font-size: 20px;
          margin-bottom: 10px;
          border-bottom: 2px solid #b58f00;
          display: inline-block;
          padding-bottom: 5px;
        }

        /* enquiry-table styles */
        .enquiry-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 30px;
        }

        .enquiry-table th,
        .enquiry-table td {
          padding: 12px;
          text-align: center;
        }

        .enquiry-table th {
          background-color: #5c4033;
          color: white;
          text-align: center;
        }

        .enquiry-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .enquiry-table td {
          border: 1px solid #ddd;
        }

        /* button styles */
        .edit-btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          cursor: pointer;
          margin-right: 5px;
          border-radius: 4px;
          font-weight: bold;
        }

        .delete-btn {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          cursor: pointer;
          border-radius: 4px;
          font-weight: bold;
        }

        /* error styles */
        .error {
          color: red;
          text-align: center;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

export default ViewPlan;
