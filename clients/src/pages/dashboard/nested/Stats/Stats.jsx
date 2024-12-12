import React, { useEffect, useState } from 'react';
import Header from '../../../../components/Header/Header';
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';
import { BsBox2, BsShop, BsPersonGear } from 'react-icons/bs';
import { LineChart } from "@mui/x-charts/LineChart";
import Avatar from '@mui/material/Avatar';
import axios from "axios";

import "./Stats.css";
import { defaultUserImg } from '../../../../constants/ImageConstants';

const Stats = () => {
  const xLabels = ["Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"];
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [todaysRegistration, setTodaysRegistration] = useState(0);
  const [approvedVendors, setApprovedVendors] = useState(0);
  const [approvedExperts, setApprovedExperts] = useState(0);
  const [latestUser, setLatestUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, productResponse, todaysRegistrationResponse, approvedVendorsResponse, approvedExpertsResponse, latestUsersResponse] = await Promise.all([
          axios.get('https://backend-autoexpertease-production-5fd2.up.railway.app/api/admin/usercount'),
          axios.get('https://backend-autoexpertease-production-5fd2.up.railway.app/api/admin/productscount'),
          axios.get('https://backend-autoexpertease-production-5fd2.up.railway.app/api/admin/today-registration'),
          axios.get('https://backend-autoexpertease-production-5fd2.up.railway.app/api/admin/approved-vendors'),
          axios.get('https://backend-autoexpertease-production-5fd2.up.railway.app/api/admin/approved-experts'),
          axios.get('https://backend-autoexpertease-production-5fd2.up.railway.app/api/admin/latest-users')
        ]);

        setUserCount(userResponse.data.count);
        setProductCount(productResponse.data.count);
        setTodaysRegistration(todaysRegistrationResponse.data.count);
        setApprovedVendors(approvedVendorsResponse.data.count);
        setApprovedExperts(approvedExpertsResponse.data.count);
        setLatestUser(latestUsersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ flex: 1, backgroundColor: "#fff",cursor:"pointer" }}>
      <Header title="Statistics" />
      {/* Cards for mapping the earning daily users etc */}
      <div>
        <h5 style={{ marginTop: 10, marginBottom: 0 }}>Welcome Back</h5>
        <p style={{ marginTop: 5, marginBottom: 0, fontSize: '14px' }}>Let's See What's Happening With The App Called AutoExpertEase.</p>
        {/* Row for Card Statistics. */}
        <section className='statsContainer'>
          {/* Card */}
          <div className='StatsCard' style={{ backgroundColor: '#2196F3' }}>
            <AiOutlineUser  color='#fff'  size={30} />
            <h1 style={{ marginTop: 10, marginBottom: 0 ,color:"#fff"}}>{userCount}</h1>
            <p style={{ marginTop: 5, marginBottom: 0, fontSize: '14px',color:"#fff" }}>All Users</p>
          </div>

          {/* Card Ended */}
          <div className='StatsCard'  style={{ backgroundColor: '#2196F3' }}>
            <AiOutlineUserAdd color='#fff' size={30} />
            <h1 style={{ marginTop: 10, marginBottom: 0 ,color:"#fff"}}>{todaysRegistration}</h1>
            <p style={{ marginTop: 5, marginBottom: 0, fontSize: '14px',color:"#fff"}}>Today's Registrations</p>
          </div>
          <div className='StatsCard' style={{ backgroundColor: '#2196F3' }}>
            <BsBox2  color='#fff'  size={30} />
            <h1 style={{ marginTop: 10, marginBottom: 0,color:"#fff" }}>{productCount}</h1>
            <p style={{ marginTop: 5, marginBottom: 0, fontSize: '14px',color:"#fff" }}>Total Approved Products Listed</p>
          </div>
          <div className='StatsCard'  style={{ backgroundColor: '#2196F3' }}>
            <BsShop   color='#fff'  size={30} />
            <h1 style={{ marginTop: 10, marginBottom: 0,color:"#fff" }}>{approvedVendors}</h1>
            <p style={{ marginTop: 5, marginBottom: 0, fontSize: '14px',color:"#fff" }}>Approved Business Vendors</p>
          </div>
          <div className='StatsCard'  style={{ backgroundColor: '#2196F3' }}>
            <BsPersonGear color='#fff' size={30} />
            <h1 style={{ marginTop: 10, marginBottom: 0,color:"#fff" }}>{approvedExperts}</h1>
            <p style={{ marginTop: 5, marginBottom: 0, fontSize: '14px',color:"#fff" }}>No. of Experts/Business Partners (Approved)</p>
          </div>
        </section>
        {/* Row Ended */}
        {/* Add A graph to Show No of User by Time. */}
        <div className='GraphContainer'>
          {/* App Visitors Graph*/}
          <div className='WeeklySignupGraph'>
            <h4 style={{ marginBottom: 0, marginTop: 20 }}>Weekly Signup Graphical Overview</h4>
            <p style={{ marginBottom: 0, marginTop: 0, fontSize: 12 }}>7 days</p>
            <LineChart
              grid={{ vertical: true, horizontal: true }}
              xAxis={[{ scaleType: "point", data: xLabels }]}
              series={[
                {
                  data: [2, 10, 100, 12, 300, 600, 900],
                  area: true,
                },
              ]}
              width={800}
              height={400}
            />
          </div>
          {/* App Visitors Graphs Ended*/}
          {/* Recent Signups. */}
          <div className='RecentSignups'>
            <h3 style={{ marginBottom: 0, marginTop: 20 }}>Recent Signups</h3>
            <p style={{ marginBottom: 0, marginTop: 0, fontSize: 12 }}>See Users Who Just Signed Up</p>
            {/* Scrollable */}
            <div style={{ display: 'flex', flexDirection: "column", rowGap: 10, marginTop: 10 }}>
              {/* User Card */}
              {latestUser.map((user, index) => (
                <div key={index}  style={{padding:10}} className='UserCard'>
                  <Avatar style={{ marginRight: 10 }} src={user.avatar || defaultUserImg} />
                  <div>
                    <p style={{ marginBottom: 5, marginTop: 0, fontSize: 14, fontWeight: 'bold' }}>{user.firstName}</p>
                    <p style={{ marginBottom: 0, marginTop: 0, fontSize: 12 }}>{user.email}</p>
                  </div>
                </div>
              ))}
              {/* User Card */}
            </div>
            {/* Scrollable */}
          </div>
          {/* Recent Signups Ended */}
        </div>
        {/* Graph and New User Row Ended */}
      </div>
    </div>
  );
};

export default Stats;
