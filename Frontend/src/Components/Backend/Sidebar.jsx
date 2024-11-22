import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { FaUserTie, FaHome, FaDumbbell, FaSignOutAlt, FaUsers, FaMoneyBillWave } from "react-icons/fa";  // FaMoneyBillWave added
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import Dashboard from './Dashboard';
import ViewEnquiry from './ViewEnquiry';
import AddEnquiryForm from './AddEnquiryForm';
import AddPlan from "./AddPlan";
import ViewPlan from "./ViewPlan";
import AddEquipment from './AddEquipment';
import AddMembers from './AddMembers';
import ViewEquipment from './ViewEquipment';
import ViewMember from './ViewMember';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(localStorage.getItem('selectedMenuItem') || 'dashboard');  // Get saved item or default to 'dashboard'
  const navigate = useNavigate();

  // Handle menu item click
  const handleMenuClick = (menuKey) => {
    if (menuKey === 'logout') {
      handleLogout();
    } else {
      setSelectedMenuItem(menuKey);
      localStorage.setItem('selectedMenuItem', menuKey);  // Save the selected menu item to localStorage
    }
  };

  // Handle logout and clear localStorage
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('selectedMenuItem');  // Clear the saved menu item on logout
    navigate('/login');
  };

  // Render the appropriate content based on the selected menu item
  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'sub1':
        return <ViewEnquiry />;
      case 'sub2':
        return <AddEnquiryForm />;
      case 'sub3':
        return <ViewPlan />;
      case 'sub4':
        return <AddPlan />;
      case 'sub5':
        return <ViewEquipment />;
      case 'sub6':
        return <AddEquipment />;
      case 'sub7':
        return <ViewMember />;
      case 'sub8':
        return <AddMembers />;
      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    // Listen for refresh or page reload and update the selectedMenuItem based on localStorage value
    const savedMenuItem = localStorage.getItem('selectedMenuItem');
    if (savedMenuItem) {
      setSelectedMenuItem(savedMenuItem);
    }
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" style={{ color: 'white', padding: '16px', textAlign: 'center' }}>
          {/* Optional Logo */}
        </div>
        <Menu
          theme="dark"
          selectedKeys={[selectedMenuItem]}  // Highlight selected menu item
          mode="inline"
          onClick={({ key }) => handleMenuClick(key)}
        >
          <Menu.Item key="dashboard" icon={<FaHome />}>
            Dashboard
          </Menu.Item>
          <SubMenu key="enquiry" icon={<FaUserTie />} title="Enquiry">
            <Menu.Item key="sub1">View Enquiry</Menu.Item>
            <Menu.Item key="sub2">Add Enquiry</Menu.Item>
          </SubMenu>
          <SubMenu key="plan" icon={<FaMoneyBillWave />} title="Plan">  {/* FaMoneyBillWave added for Plan */}
            <Menu.Item key="sub3">View Plan</Menu.Item>
            <Menu.Item key="sub4">Add Plan</Menu.Item>
          </SubMenu>
          <SubMenu key="equipment" icon={<FaDumbbell />} title="Equipment">  {/* FaDumbbell added */}
            <Menu.Item key="sub5">View Equipment</Menu.Item>
            <Menu.Item key="sub6">Add Equipment</Menu.Item>
          </SubMenu>
          <SubMenu key="members" icon={<FaUsers />} title="Members">  {/* FaUsers for Members */}
            <Menu.Item key="sub7">View Members</Menu.Item>
            <Menu.Item key="sub8">Add Members</Menu.Item>
          </SubMenu>
          <Menu.Item key="logout" icon={<FaSignOutAlt />}>  {/* FaSignOutAlt for logout */}
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '16px' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Sidebar;