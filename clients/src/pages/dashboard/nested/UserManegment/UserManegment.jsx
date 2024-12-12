import "./UserManegment.css";
import React, { useState, useEffect } from 'react';
import { Avatar, Chip } from '@mui/material';
import { toast, Toaster } from 'react-hot-toast';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../../../../components/Header/Header';

import ApiInstance from '../../../../../Instance/AxiosInstance';

const UserManegment = () => {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Handle opening and closing of modal
  const handleOpen = (userId) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  // Function to delete a user
  const deleteUsers = (userId) => {
    setDeleting(true);
    ApiInstance.delete(`/admin/user/${userId}`)
      .then(response => {
        // Handle successful deletion
        toast.success('User deleted successfully');
        // Update the user list after deletion
        setUsers(users.filter(user => user._id !== userId));
        handleClose(); // Close the modal after deletion
      })
      .catch(error => {
        // Handle deletion error
        toast.error('Error deleting user');
        console.error('Error deleting user:', error);
      })
      .finally(() => setDeleting(false));
  };

  // Fetch Users on load
  useEffect(() => {
    toast.success("Fetching users");

    ApiInstance.get('/admin/getusers')
      .then(response => {
        setUsers(response.data);
        console.log('Fetched users:', response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div style={{ flex: 1, backgroundColor: "#fff" }}>
      <Toaster />
      <Header title="User Management" />

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
        open={openModal}
      >
        <div className='UserManegmentModal'>
          <h3 style={{ marginBottom: 10, marginTop: 0, marginLeft: '20px' }}>Are You Sure you Want Delete User</h3>
          <p style={{ marginTop: 0, marginBottom: 0, paddingLeft: 20, paddingRight: 20, color: '#666666', fontSize: '14px' }}>
            Deleting someone from the database means they'll lose access to services and cease to be a user. It's like removing their digital footprint entirely. They won't be able to log in, access their account, or utilize any associated features. It's essentially cutting off all ties between them and the platform or service.
          </p>
          <div className='ButtonContainerModal'>
            <Button style={{ backgroundColor: "#EDEDED", boxShadow: "none", color: '#4F4F4F', fontWeight: "500", border: '1px solid #4F4F4F', textTransform: "initial", fontFamily: "Outfit" }} variant='outlined' onClick={handleClose}>Cancel</Button>
            <Button color="error" style={{ boxShadow: "none", color: '#fff', fontWeight: "300", textTransform: "initial", fontFamily: "Outfit" }} variant="contained" onClick={() => deleteUsers(selectedUserId)}>
              {deleting ? 'Deleting...' : 'Delete User'}
            </Button>
          </div>
        </div>
      </Modal>

      <div>
        {users.map((user) => (
          <div key={user._id} className='UserCard' style={{display:"flex",justifyContent:"space-between",padding:10,marginTop:20}}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar src={user.avatar} />
              <div style={{ marginLeft: 10 }}>
                <p style={{ marginBottom: 5, fontWeight: "bold"}}>{`${user.firstName} ${user.lastName}`}</p>
                <p style={{ marginBottom: 5, fontSize: 12 }}>{user.email}</p>
                <p style={{ marginBottom: 5, fontSize: 12}}>{user.phone}</p>
                <p style={{ marginBottom: 5, fontSize: 12 }}>{`${user.AddressInfo.Address}, ${user.AddressInfo.City}`}</p>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"center",alignItems:'center'}}>
              <p style={{  fontSize: 12,marginBottom:0 ,marginTop:0,marginRight:4}}>Joining Date: {new Date(user.createdAt).toLocaleDateString()}</p>
              <Chip label={user.role.join(', ')} style={{ height: 20, fontSize: 10, backgroundColor: "#e5e5e5", marginBottom:0 ,marginRight:4}} />
              <Chip label={`${user.DeviceInfo.Brand} ${user.DeviceInfo.DeviceName}`} style={{marginRight:4,height: 20, fontSize: 10, backgroundColor: "#e5e5e5" ,marginBottom:0 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleOpen(user._id)}
                startIcon={<DeleteIcon />}
              >
                Delete User
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserManegment;
