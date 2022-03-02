import React, { useState } from 'react'
import "./SideBar.css"
import ReceiptIcon from '@mui/icons-material/Receipt';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import LogoutIcon from '@mui/icons-material/Logout';
import{ ReactComponent as  BtLogo} from "../images/btLogo.svg"
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';


import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

const SideBar = () => {

    const [ expand, setExpand ] = useState(true)
    const [ showMenu, setShowMenu ] = useState(true);
    const navigate = useNavigate();
    return (
           <div className="parent-bar"> 

           <div className ="first_sidebar">

           <span onClick={()=>navigate("/content")}><BtLogo className="btLogo"/></span>
           <div className="hamburger-menu" onClick={()=>{
                setShowMenu(!showMenu)
            }}> {showMenu ? <MenuIcon/> : <CancelPresentationIcon/>}</div>  

            </div>
            <div className="sidebar">
            <div className={showMenu ? "main-menu new" : "new"}>
            <ul>
                <li>
                    
                    <span onClick={() => setExpand(!expand)}className="menu-item">
                        <div className="menu-icon">
                            <div className={`dropdown ${!expand?"down":""}`}>
                            <KeyboardArrowRightIcon className="icon-bar"/>
                            </div>
                        </div>
                        <span className="menu-text">
                        Tickets
                        </span>
                    </span>
                    <ul className={`sub-menu ${!expand ? "active":""}`} >
                        <li>
                            <span className="sub-menu-link"  onClick={()=>{navigate("/content"); setExpand(!expand); window.location.reload()}}>
                                <ReceiptIcon className="icon-bar"/>
                                <span className="menu-text">
                                All Tickets
                                </span>
                            </span>
                        </li>
                        <li>
                            <span className="sub-menu-link"onClick={()=>{navigate("/my"); setExpand(!expand)}}>
                                <ReceiptIcon className="icon-bar"/>
                                <span className="menu-text"  >
                                My Tickets
                                </span>
                            </span>
                        </li>
                    </ul>
                </li>
                <li className="list-items">
                <span className="menu-item">
                        <div className="menu-icon">
                        <ListAltIcon className="icon-bar"/>
                        </div>
                        <span className="menu-text">
                        Incident Reporting
                        </span>
                    </span>

                </li>
                <li className="list-items">
                <span className="menu-item" onClick={()=>{navigate("/users")}}>
                        <div className="menu-icon">
                        <SupervisorAccountIcon className="icon-bar"/>
                        </div>
                        <span className="menu-text">
                        Users
                        </span>
                    </span>

                </li>
                <li className="list-items">
                <span className="menu-item">
                        <div className="menu-icon"> 
                        <AutoGraphIcon className="icon-bar"/>
                        </div>
                        <span className="menu-text">
                        Report
                        </span>
                    </span>

                </li>
                <li className="list-items">
                <span className="menu-item" onClick={()=>{navigate("/knowledge")}}>
                        <div className="menu-icon">
                        <DescriptionIcon className="icon-bar"/>
                        </div>
                        <span className="menu-text">
                        Knowledge Base
                        </span>
                    </span>

                </li>

            </ul>    
               
            
            <LogoutIcon style={{
                        color: "#0866bd"  
                    }}
                     className="button" onClick={()=>{
                        localStorage.removeItem("token");
                        localStorage.removeItem("refresh");
                        navigate("/")
                        window.location.reload()
                    }}>
            </LogoutIcon> 

            </div>
            
        </div>
    </div>
    )
}

export default SideBar
