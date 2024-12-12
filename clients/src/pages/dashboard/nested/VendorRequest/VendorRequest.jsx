import React, { useState, useEffect } from 'react'
import Header from '../../../../components/Header/Header'
//Mui
import { Avatar, Button, Modal } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

ApiInstance
//css
import "./VendorRequest.css"
import axios from 'axios';
import ApiInstance from '../../../../../Instance/AxiosInstance';
const VendorRequest = () => {
  const [openModal, setopenModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  const approveRequest = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.post("https://backend-autoexpertease-production-5fd2.up.railway.app/api/admin/vendor-applications/approve", {
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
        const response = await axios.get('https://backend-autoexpertease-production-5fd2.up.railway.app/api/admin/vendor-applications');
        console.log(response.data);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError(error.message);
      }
    };
    

    fetchApplications();
  }, []);
  //handle opening and closing of model
  const handleOpen = (userId) => {
    setopenModal(true);
    setSelectedUserId(userId);
    console.log(userId);
  } //set to open
  const handleClose = () => {
    setopenModal(false);
  }//set to false.
  return (
    <div style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Vendor Requests" />
      {/* Modal */}
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
        open={openModal}
      >
        <p>Wow</p>
      </Modal>
      {/* Modal Ended */}
      {/* Card Example map Container */}
      <section className='RequestContainer'>
        {
          applications.map((application, index) => (
            <div  style={{backgroundColor:"#f5f5f5"}} onClick={()=>handleOpen(application)} className='RequestCard'>

              <div className='TextContainerRequests'>
                <Avatar style={{ marginRight: '5px' }} src={application.avatar} />
                <div>  <p><span style={{ fontWeight: "bold", marginBottom: 0,padding:0,margin:0 }}>SomeOne </span>applied for vendorShip on the app shopname {""}{application.shopName }</p>

                  <p style={{ fontSize: '10px', marginTop: 0, marginBottom: 0 }}>{application.contactInfo.email}</p>
                  <p style={{ fontSize: '10px', marginTop: 0, marginBottom: 0 }}>{application.vendorDetails.cnic}</p>
                  </div>
                  
              </div>
              <NavigateNextIcon />
            </div>
          ))
        }
      </section>
      {/* Containe Ends */}

      
      {selectedUserId && (
        <Modal
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onClose={handleClose}
          open={openModal}
        >
 <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:"center",
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: 'auto',
        outline: 'none',
        textAlign: 'center',
      }}>
        <h3 style={{ marginBottom: 10, marginTop: 0 }}>Are You Sure You Want to Approve this Request?</h3>
        <img 
          src={selectedUserId.avatar} 
          alt="selfie" 
          style={{ 
            display: 'block', 
            margin: '20px auto', 
            height: '100px', 
            width: '100px', 
            borderRadius: '50%', 
            objectFit: 'cover' 
          }} 
        />
        <p style={{ fontSize: '14px', margin: '10px 0' }}>#Requested at {selectedUserId.createdAt}</p>
        <p style={{ fontSize: '14px', margin: '10px 0' }}>#Pickup Address: {selectedUserId.vendorDetails.address}</p>
        <p style={{ fontSize: '14px', margin: '10px 0' }}>#Vendor Name: {selectedUserId.vendorDetails.name}</p>
        <p style={{ fontSize: '14px', margin: '10px 0' }}>#Shop Name: {selectedUserId.shopName}</p>
        <p style={{ fontSize: '14px', margin: '10px 0' }}>#CNIC No: {selectedUserId.vendorDetails.cnic}</p>
        <p style={{ fontSize: '14px', margin: '10px 0' }}>#NTN No: {selectedUserId.ntnNumber}</p>
        <p style={{ fontSize: '14px', margin: '10px 0' }}>#Coordinates: {selectedUserId.location}</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '20px' }}>
          <Button 
            style={{ 
              backgroundColor: "#EDEDED", 
              boxShadow: "none", 
              color: '#4F4F4F', 
              fontWeight: "500", 
              border: '1px solid #4F4F4F', 
              textTransform: "initial", 
              fontFamily: "Outfit" 
            }} 
            variant='outlined' 
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button 
            color="primary" 
            style={{ 
              boxShadow: "none", 
              fontWeight: "300", 
              textTransform: "initial", 
              fontFamily: "Outfit" 
            }} 
            variant="contained" 
            onClick={() => approveRequest(selectedUserId.user)}
          >
            Approve Request
          </Button>
        </div>
      </div>
        </Modal>
      )}
    </div>
  )
}

export default VendorRequest