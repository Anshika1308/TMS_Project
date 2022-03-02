import React, { useEffect, useState } from 'react';
import  ReactDOM  from 'react-dom';
import "./ModalUser.css"
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useNavigate } from 'react-router';


const ModalUser = ({isOpen, onClosing}) => {

  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const abortCont = new AbortController();
    // add axios here
    axios.get(`/user`,{ signal:abortCont.signal })
    .then(res => setUser((res.data.data)))
    .catch(err=>console.log(err))
    return () => abortCont.abort();
  },[])

   
  const signOutLogic = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/")
    document.getElementById('root-portal').classList.add('logged-off')
    window.location.reload()
  }

  
  if(!isOpen) return null



  return ReactDOM.createPortal( 
  <div className="modal-container">
    <div className="modal-top">
    <span className="profile-span">Profile</span>
    <p onClick={onClosing} ><CloseIcon/></p>
    </div>
    <div className="class-padding">
    <div className="modal-content">
      <AccountCircleIcon className="account-icon"/>
      </div>
      <div className="content-right">
          <span>{user.fullName}</span>
          <p>{user.department}</p>
          <p>{user.email}</p>
          <p>{user.phoneNumber}</p>
      </div>
    </div>
    <div>
      <button className="out-sign" variant = "contained" onClick={signOutLogic}>Sign Out</button>
    </div>

  </div>,
  document.getElementById('root-portal')
  )
};

export default ModalUser;
