import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router';
import React, { useState } from 'react'
import "./AllTicketsHeader.css"
import ModalUser from '../Modal/ModalUser';


const AllTicketsHeader = () => {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();

    const showModal = () => {
        document.getElementById('root-portal').classList.remove('logged-off')
        setIsOpen(!isOpen)
    }
    return (
        <>
        <div className="all-tickets-head">
            <div className="head-left">
                <h3>{location.pathname === "/my" ? "My Tickets": location.pathname==="/knowledge" ? "Knowledge Base": location.pathname==="/Article" ? "Knowledge Base":location.pathname==="/users"?"Users":"All Tickets" }</h3>
                </div>
                <div className="head-middle">
                    {location.pathname === "/create" ? 

                <button style={{backgroundColor:"grey", cursor:"not-allowed"} } disabled={true} onClick={()=>navigate("/create")}
                 ><p>+</p> Create New Ticket</button>

                : <button onClick={()=>navigate("/create")} style={{
                    backgroundColor: "#0A387D"  
                }}><p>+</p> Create New Ticket</button>}
                </div>
                <div className="head-right">
                <SearchIcon/>
                <input type="text" placeholder="Search..."/>
                <NotificationsIcon/>
                <AccountCircleIcon className = "profile" onClick={showModal}/>
                <ModalUser isOpen={isOpen} onClosing={()=> setIsOpen(false)} />
            </div>
        </div>
        </>
    )
}

export default AllTicketsHeader
