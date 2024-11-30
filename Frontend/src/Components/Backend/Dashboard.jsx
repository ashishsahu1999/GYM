import React, { useState, useEffect } from "react";

// Importing Components from other files
import ViewEnquiry from '../Backend/ViewEnquiry';  // Adjust path as needed
import ViewPlan from './ViewPlan';  // Adjust path as needed
import ViewMember from './ViewMember';  // Adjust path as needed
import ViewEquipment from './ViewEquipment';  // Adjust path as needed

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    enquiry: 0,
    plan: 0,
    member: 0,
    equipment: 0,
  });

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/viewcount/");
        if (response.ok) {
          const result = await response.json();
          setData({
            enquiry: result.data.enquirycont || 0,
            plan: result.data.plancont || 0,
            member: result.data.membercont || 0,
            equipment: result.data.equipmentcount || 0,
          });
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle card clicks
  const handleCardClick = (type) => {
    setSelectedComponent(type);
  };

  // Render the selected component based on card click
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "enquiry":
        return <ViewEnquiry />;
      case "plan":
        return <ViewPlan />;
      case "member":
        return <ViewMember />;
      case "equipment":
        return <ViewEquipment />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <>
          {/* Dashboard Cards */}
          <div className="dashboard">
            <div
              className="card"
              style={{ background: "linear-gradient(90deg, #d291ff, #42a5f5)" }}
              onClick={() => handleCardClick("enquiry")}
            >
              <div className="card-number">{data.enquiry}</div>
              <i className="card-icon">📩</i>
              <div className="card-title">Total Enquiry</div>
            </div>
            <div
              className="card"
              style={{ background: "linear-gradient(90deg, #d291ff, #9c27b0)" }}
              onClick={() => handleCardClick("plan")}
            >
              <div className="card-number">{data.plan}</div>
              <i className="card-icon">₹</i> {/* Updated Plan icon to Rupee */}
              <div className="card-title">Total Plan</div>
            </div>
            <div
              className="card"
              style={{ background: "linear-gradient(90deg, #42a5f5, #007bff)" }}
              onClick={() => handleCardClick("member")}
            >
              <div className="card-number">{data.member}</div>
              <i className="card-icon">👤</i>
              <div className="card-title">Total Member</div>
            </div>
            <div
              className="card"
              style={{ background: "linear-gradient(90deg, #42a5f5, #00c3ff)" }}
              onClick={() => handleCardClick("equipment")}
            >
              <div className="card-number">{data.equipment}</div>
              <i className="card-icon">🏋‍♂</i> {/* Updated Equipment icon to Dumbbell */}
              <div className="card-title">Total Equipment</div>
            </div>
          </div>

          {/* Selected Component */}
          <div className="selected-component">{renderSelectedComponent()}</div>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <span>Copyright © 2024 All Right Reserved |</span>
      <span className="creator">
        This website is made by <br />
        <span className="heart">❤ </span>
        <span className="glow"> Ashish Sahu</span>
      </span>
    </footer>
  );
}

const styles = `
  body {
    font-family: Arial, sans-serif;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .dashboard-container {
    padding: 20px;
    text-align: center;
    flex-grow: 1;
  }

  .dashboard {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .card {
    width: 220px;
    height: 120px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }

  .card:hover {
    transform: translateY(-5px);
  }

  .card-number {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #ffffff;
    color: #000;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  .card-icon {
    font-size: 30px;
    margin-bottom: 10px;
  }

  .card-title {
    font-weight: bold;
  }

  footer {
    font-size: 24px;
    text-align: center;
    margin-top: 400px;
  }

  footer span {
    font-weight: bold;
    color: red;
  }

  footer .creator {
    color: #008000;
    font-size: 24px;
  }

  footer .heart {
    color: #ffcc00;
    font-size: 20px;
  }

  .glow {
    font-size: 40px;
    color: #fff;
    text-align: center;
    font-weight: bold;
    -webkit-animation: glow 1s ease-in-out infinite alternate;
    animation: glow 1s ease-in-out infinite alternate;
  }

  @-webkit-keyframes glow {
    0% {
      text-shadow: 0 0 5px #42a5f5, 0 0 10px #42a5f5, 0 0 20px #42a5f5, 0 0 40px #42a5f5, 0 0 80px #42a5f5;
    }
    100% {
      text-shadow: 0 0 10px #42a5f5, 0 0 20px #42a5f5, 0 0 30px #42a5f5, 0 0 60px #42a5f5, 0 0 100px #42a5f5;
    }
  }

  @keyframes glow {
    0% {
      text-shadow: 0 0 5px #42a5f5, 0 0 10px #42a5f5, 0 0 20px #42a5f5, 0 0 40px #42a5f5, 0 0 80px #42a5f5;
    }
    100% {
      text-shadow: 0 0 10px #42a5f5, 0 0 20px #42a5f5, 0 0 30px #42a5f5, 0 0 60px #42a5f5, 0 0 100px #42a5f5;
    }
  }

  .loading-message {
    text-align: center;
    font-size: 24px;
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Dashboard;