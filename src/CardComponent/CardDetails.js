import React from 'react'
import "./CardDetails.css"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router';
import moment from 'moment'

const CardDetails = ({pa}) => {

    const navigate = useNavigate()

    return (
        <>
        
            <div className="card-details" onClick={() => navigate(`/open/${pa.ticketId}`)}>
            <div className={pa.priority === 'High' && "card red" || pa.priority==='Low' && "card yellow" || pa.priority==='Medium' && "card green"}>
            <div className="card-top">
                <span>{pa.ticketId}</span>
                <OpenInNewIcon style={{color:"#3169bd"}}/>
            </div>
            <p className="card-para">{pa.title}</p>
            <div className="card-mid">
                <span>
                    Status
                    <p className="status-para">
                    {pa.status}
                    </p>
                </span>
                <span>
                    Project
                    <p>
                    {pa.projectTag}
                    </p>
                </span>
                <span>
                    Category
                    <p>
                    {pa.category}
                    </p>
                </span> 
            </div>
            <div className="card-bottom">
                <span>
                    Created Date
                    <p>
                    {moment(pa.submittedDate).format('L - h:mm')}
                    </p>
                </span>
                <span>
                    Due Date
                    <p>
                    {moment(pa.dueDate).format('L')}
                    </p>
                </span> 
            </div>
        </div>
        </div>
    
     </>       
    )
}

export default CardDetails
