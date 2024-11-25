import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ViewEnquiry from './ViewEnquiry';  
import ViewPlan from './ViewPlan';  
import ViewMember from './ViewMember'; 
import ViewEquipment from './ViewEquipment'; 

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState(null); // Track selected component
  const [loading, setLoading] = useState(true); // To handle loading state
  const [data, setData] = useState({
    enquiry: 0,
    plan: 0,
    member: 0,
    equipment: 0,
  });

  // Fetch data from your API (Only once when the component mounts)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch('http://127.0.0.1:8000/api/viewcount/');
        console.log(response, "response");

        // Check if the response is successful (status 200)
        if (response.ok) {
          const result = await response.json(); 
          
          // Access data from the nested "data" key
          setData({
            enquiry: result.data.enquirycont || 0,
            plan: result.data.plancont || 0,
            member: result.data.membercont || 0,
            equipment: result.data.equipmentcount || 0,
          });
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        // Handle error (if the API fails)
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData(); // Fetch data only once when the component mounts
  }, []); // Empty dependency array ensures it runs only once

  // Function to handle card click
  const handleCardClick = (type) => {
    switch (type) {
      case 'enquiry':
        setSelectedComponent('enquiry');
        break;
      case 'plan':
        setSelectedComponent('plan');
        break;
      case 'member':
        setSelectedComponent('member');
        break;
      case 'equipment':
        setSelectedComponent('equipment');
        break;
      default:
        setSelectedComponent(null);
        break;
    }
  };

  // Render the selected component based on state
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'enquiry':
        return <ViewEnquiry />;
      case 'plan':
        return <ViewPlan />;
      case 'member':
        return <ViewMember />;
      case 'equipment':
        return <ViewEquipment />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {loading ? (
        <div className="loading-message">Loading...</div> // Show loading message while data is being fetched
      ) : (
        <div className="dashboard">
          <div className="card" onClick={() => handleCardClick('enquiry')}>
            <div className="card-title">
              Total Enquiry: {data.enquiry}
            </div>
          </div>
          <div className="card" onClick={() => handleCardClick('plan')}>
            <div className="card-title">
              Total Plan: {data.plan}
            </div>
          </div>
          <div className="card" onClick={() => handleCardClick('member')}>
            <div className="card-title">
              Total Member: {data.member}
            </div>
          </div>
          <div className="card" onClick={() => handleCardClick('equipment')}>
            <div className="card-title">
              Total Equipment: {data.equipment}
            </div>
          </div>
        </div>
      )}

      {/* Render the selected component */}
      <div className="selected-component">
        {renderSelectedComponent()}
      </div>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <span>Copyright © 2024 All Right Reserved |</span> 
      <span className="creator">This website is made with <span className="heart">💛</span> by Ashish Sahu</span>
    </footer>
  );
}

export default Dashboard;
