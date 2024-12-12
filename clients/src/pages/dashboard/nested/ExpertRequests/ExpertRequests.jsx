import React, { useEffect, useState } from 'react';
import { Avatar, Button, Modal } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { defaultUserImg } from '../../../../constants/ImageConstants';
import Header from '../../../../components/Header/Header';
import "./ExpertRequests.css";
import axios from 'axios';

const ExpertRequests = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  const handleOpen = (userId) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedUserId(null);
  };

  const approveRequest = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.post('https://backend-autoexpertease-production-5fd2.up.railway.app/api/admin/expert-applications/approve', {
        id: userId
      });
      console.log(response.data);
      // Handle success response, e.g., updating the state to remove the approved request
      setApplications((prevApplications) => prevApplications.filter(app => app.user !== userId));
      handleClose();
    } catch (error) {
      console.error('Error approving request:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://backend-autoexpertease-production-5fd2.up.railway.app/api/admin/expert-applications');
        console.log(response.data);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError(error.message);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Expert Requests" />
      <section style={{ marginTop: '10px', cursor: "pointer" }}>
        {applications.map((application, index) => (
          <div key={index} className='ExpertReqCard' style={{ backgroundColor: "#f5f5f5" }} onClick={() => handleOpen(application)}>
            <div className='TextContainerReq'>
              <Avatar style={{ marginRight: '5px' }} src={application.facialVerification || defaultUserImg} />
              <div>
                <p>
                  <span style={{ fontWeight: "bold", margin: 0 }}>
                    {application.firstName} {application.LastName}
                  </span> Applied for Expert/Business partner approval.
                </p>
                <p style={{ fontSize: '10px', marginTop: 4, marginBottom: 0 }}>#UserId {application.user}</p>
                <p style={{ fontSize: '10px', marginTop: 4, marginBottom: 0 }}> {application.phone}</p>
                <p style={{ fontSize: '10px', marginTop: 0, marginBottom: 0 }}> {application.email}</p>
                <p style={{ fontSize: '10px', marginTop: 0, marginBottom: 0 }}> {new Date(application.createdAt).toLocaleString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                }).replace(',', ' At')}</p>
              </div>
            </div>
            <NavigateNextIcon />
          </div>
        ))}
      </section>

      {selectedUserId && (
        <Modal
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onClose={handleClose}
          open={openModal}
        >
          <div className='UserManegmentModal'>
            <h3 style={{ marginBottom: 10, marginTop: 0, marginLeft: '20px' }}>Are You Sure you Want to Approve this Request?</h3>
            <img src={selectedUserId.facialVerification} alt="selfie" style={{ display: 'block', margin: 'auto', marginBottom: '20px', height: 100, width: 100, borderRadius: 300, objectFit: "cover" }} />
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{selectedUserId.firstName} {selectedUserId.LastName}</p>
            <p style={{ fontSize: '14px', marginTop: 0, marginBottom: 0, textAlign: "center" }}>Date of Birth {new Date(selectedUserId.DateOfBirth).toLocaleString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: '2-digit',
            }).replace(',', ' At')}</p>
            <p style={{ fontSize: '14px', marginTop: 0, marginBottom: 0, textAlign: "center" }}>Cnic No# {selectedUserId.CnicNo}</p>
            <p style={{ fontSize: '14px', marginTop: 0, marginBottom: 0, textAlign: "center" }}>UserId# {selectedUserId.user}</p>
            <img src={selectedUserId.CnicFront} alt="cnicfront" style={{ display: 'block', margin: 'auto', width: "400px", height: "200px" }} />
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#999' }}>Front Cnic</p>
            <img src={selectedUserId.CnicBack} alt="cnic Back" style={{ display: 'block', margin: 'auto', width: "400px", height: "200px" }} />
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#999' }}>Back Cnic</p>
            <div className='ButtonContainerModal'>
              <Button style={{ backgroundColor: "#EDEDED", boxShadow: "none", color: '#4F4F4F', fontWeight: "500", border: '1px solid #4F4F4F', textTransform: "initial", fontFamily: "Outfit" }} variant='outlined' onClick={handleClose}>Cancel</Button>
              <Button color="primary" style={{ boxShadow: "none", fontWeight: "300", textTransform: "initial", fontFamily: "Outfit" }} variant="contained" onClick={() => approveRequest(selectedUserId.user)}>
                Approve Request
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ExpertRequests;
