import React, {useEffect, useState} from 'react'
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import "./MyTickets.css"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ProgressBar from "@ramonak/react-progress-bar";
import ArticleIcon from '@mui/icons-material/Article';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditRow from '../EditRow/EditRow';
import NextResParty from '../NextResParty/NextResParty';
import moment from 'moment'
import axios from 'axios';
import FileSaver from 'file-saver';
import { CircularProgress } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ChangeStatus from '../Status/ChangeStatus';


const MyTickets = () => {
    const [inputData, setInputData] = useState('');
    const [text, settext] = useState([]);
    const [ticketCount, setTicketCount] = useState([]);
    const [ticketNumber, setTicketNumber] = useState([]);
    const [selectTicket, setSelectTicket] = useState([]);
    const [savedComments, setSavedComments] = useState([]);
    const [ticketAttachments, setTicketAttachments] = useState([]);

    const [responsible, setResponsible] = useState([]);

    const [open, setOpen] = useState(false)

    const [showParty, setShowParty] = useState(false)

    const [showStatus, setShowStatus] = useState(false)


    // const [timerDay, setTimerDay] = useState()
    // const [timerHour, setTimerHour] = useState()
    // const [timerMin, setTimerMin] = useState()
    // const [timerSec, setTimerSec] = useState()
    const [loading, setLoading] = useState(false)

    
    useEffect(()=>{
      const abortCont = new AbortController();
      setTimeout(()=>{
        axios.get(`/ticket/GetByUserId`,{ signal:abortCont.signal })
        .then(res => setTicketCount((res.data.data)))
        .catch(err=>console.log(err))
      },800)
      return () => abortCont.abort();   
    },[open,showParty,showStatus])
    
    useEffect(()=>{
      const abortCont = new AbortController();
      setTimeout(()=>{
        axios.get(`/ticket/${ticketNumber}`,{ signal:abortCont.signal })
        .then(response => setSelectTicket(response.data.data))
        .catch(err=>console.log(err))
      },800)
      return () => abortCont.abort(); 
    },[ticketNumber,open,showParty,showStatus])  
    
 useEffect(()=>{
  const abortCont = new AbortController();
  setTimeout(()=>{
    axios.get(`/ticket/${ticketNumber}`,{ signal:abortCont.signal })
    .then(resp => setSavedComments(resp.data.data.comments))
    .catch(err=>console.log(err))
  },800)
    return () => abortCont.abort(); 
 },[ticketNumber,text])   


 useEffect(() => {
  const abortCont = new AbortController();
    // add axios here
    axios.get(`/ticket/${ticketNumber}`,{ signal:abortCont.signal })
    .then(res => setTicketAttachments((res.data.data.attachments)))
    .catch(err=>console.log(err))
    return () => abortCont.abort(); 
  },[ticketNumber,ticketAttachments])

 useEffect(() => {
  const abortCont = new AbortController();
    // add axios here
    setTimeout(()=>{
      axios.get(`/nextResponsible/${ticketNumber}`,{ signal:abortCont.signal })
      .then(res => setResponsible((res.data.data)))
      .catch(err=>console.log(err))
    },800)
    return () => abortCont.abort(); 
  },[ticketNumber])


 const addComment = () => {
    if (!inputData){
      
    } else {
      axios(config).then(function(response) {
        
      console.log(JSON.stringify(response.data));
        
      })
      settext([...text,inputData]);
      setInputData('');
    }
  }
  
  let data = JSON.stringify({
    "ticketId":ticketNumber,
    "comments":inputData
  });
  
  const fetchedToken = localStorage.getItem('token');

  let config = {

    method: 'post',
  
    url: 'http://10.1.130.10:88/dev.tms.api/Comments',
  
    headers: { 
  
      'Content-Type': 'application/json', 
  
      'Authorization': `Bearer ${fetchedToken}`
  
    }, 
    data : data
  };


  // let interval;
  // const dateDue = selectTicket ? selectTicket.dueDate : 10

  // const startTimer = () => {
  //   const finalDue =  (new Date(dateDue).getTime());

  //   interval = setInterval(()=>{
  //    const finalSub =  (new Date().getTime());
  //    const distance = finalDue - finalSub === NaN ? 0 : finalDue - finalSub
     
  //    const days = Math.floor((distance)/(24 * 60 * 60 * 1000))
  //    const hours = Math.floor((distance % (24 * 60 * 60 * 1000))/(1000 * 60 * 60));
  //    const minutes = Math.floor((distance % (60 * 60 * 1000))/(1000 * 60));
  //    const seconds = Math.floor((distance % ( 60 * 1000))/(1000));

  //    setTimerDay(days)
  //    setTimerHour(hours)
  //    setTimerMin(minutes)
  //    setTimerSec(seconds)

  //   })


  // }

  // useEffect(() => {
  //   const abortCont = new AbortController();
  //  return (startTimer(),
  //   { signal:abortCont.signal })
  //   // return () => abortCont.abort();
  // });


  const editTicket = () => {
    setOpen(!open)
  }

  const editParty = () => {
    setShowParty(!showParty)
  }

  const editStat = () => {
    setShowStatus(!showStatus)
  }

  const downloadFile = (filename)=>{
    {
       let data = {
         "ticketId":`${ticketNumber}`,
         "fileName": filename
       }

       fetch('http://10.1.130.10:88/dev.tms.api/File/Attachment', {

        method: 'POST',
        headers: {

          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${fetchedToken}`

        },

        body: JSON.stringify(data),

      })
      .then(function(response) {
       return response.blob();
      
     }).then(function(filePath) {
       FileSaver.saveAs(filePath, data.fileName);
     })

       .catch((error)=>{
       console.log(error)

       })

     }

  }

  const deletefile = (fileName)=>{   
   if(window.confirm("Are you sure that you wanted to delete that file?"))

   {


      let data = {

        "ticketId": `${ticketNumber}`,

        "fileName":fileName

      }
      fetch('http://10.1.130.10:88/dev.tms.api/File/Delete', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',


        'Authorization': `Bearer ${fetchedToken}`

      },

      body: JSON.stringify(data),

    })

    .then(response => response.json())

    .then(data => {

      console.log('Success:', data);
       ticketAttachments.splice(0,1);
       setTicketAttachments(ticketAttachments);


    })

    .catch((error) => {

      console.error('Error:', error);

    }); 

   }


}
    
 

    return (
        <div className="ticket-parent">
         <div className="tickets-list">
            <div className="left-div">
            <div className="top-ticket">
            {/* onClick={()=>{setOpen(!open)}} */}
                <p>TMS</p>
                {/* {open ? <KeyboardArrowDown/> : <KeyboardArrowUpIcon/>} */}
                
            </div>
            {ticketCount < 1 ? 'Sorry, you dont have any tickets!' : ticketCount && ticketCount.map((tix,index)=>(
            <div className={tix.priority === 'High' && "single-list red" || tix.priority==='Low' && "single-list yellow" || tix.priority==='Medium' && "single-list green"} key={index}  onClick={()=>{setTicketNumber(tix.ticketId);setLoading(true)}}>
                <div className="single-list-title" key={index}>
                    <p>ID {tix.ticketId}</p>
                    <OpenInNewIcon style={{color:"#3169bd"}}/>
                </div>
                <div className="single-list-desc">
                    {tix.title}
                </div>
                <div className="single-list-details">
                    <div className="single-list-stat">
                        <p>Status</p> 
                        <span>{tix.status}</span> 
                    </div>
                    <div className="single-list-rest">
                        <p>Project</p> 
                        <span>{tix.projectTag}</span> 
                    </div>
                    <div className="single-list-rest">
                        <p>Category</p> 
                        <span>{tix.category}</span> 
                    </div>
                    <div className="single-list-rest due">
                        <p>Due Date</p> 
                        <span>{moment(tix.dueDate).format( 'L')}</span> 
                    </div>
                </div>
                <div className="single-list-created">
                    <p>Created on {moment(tix.submittedDate).format( 'L - h:mm  a')}

</p>
                </div>
            </div>
            ))
            } 
            </div>
            
            
        </div>

        
        {!selectTicket.ticketId ? <div className="noId">{loading ? <CircularProgress/> : <><p>Nothing Here!!</p><p>Please Select a Ticket to view details</p><ReceiptLongIcon className="noId-icon"/></>}</div> :
       <div className="my-ticket-area-duplicate">
          <div className="div-left-duplicate">
          <span className="my-span">ID - {selectTicket.ticketId}</span>
          <span className="my-span-2">{selectTicket.title}</span>
          <div className = "my-ticket-description-duplicate">
              {selectTicket.description}
          </div>
          <div className="my-tickets-head">
              <span className="my-tickets-comments-head">
              COMMENTS
              </span>
              
          {/* <span className="my-tickets-comments-act">
              ACTIVITY
          </span> */}
          </div>
          <div className="user-input-section-duplicate">
          <textarea type="text" placeholder="Enter Comments" value={inputData} onChange={(e)=>{setInputData(e.target.value)}}/>
          <button onClick={addComment}>Save</button>
        
            {savedComments &&
                savedComments.map((tixd,num) => (
              <div className="comments-display" key={num}>
              <div className="comment-head" >
                <AccountCircleIcon className="title-icon"/>
                <p className="title-comment">{tixd.fullName}</p>
                <p className="title-note" >added a comment - </p>
                <p className="title-time">{moment(tixd.createdDate).format('L - h:mm a ')}</p>
              </div>      
              <div className="comment-content">
              {tixd.comments}
              </div>  
              </div> 
                )).sort().reverse()
            }
          </div>
          </div>



          <div className = "div-center-duplicate">
          <div className="status-progress">
          <h1>
              Status
            </h1>
            <span className="edit-span" onClick={editStat}>{showStatus ? <CancelIcon/>: "Edit"}</span>
          </div>
            {
              showStatus ? <ChangeStatus onStatChange={editStat} info={ticketNumber}/> : <span className={selectTicket.status === 'Opened' && 'stat-open' || selectTicket.status === 'Closed' && 'stat-close' || selectTicket.status === 'In-Progress' && 'stat-progress' || selectTicket.status === 'Work Completed' && 'stat-work'} >{selectTicket.status}</span>
            }
          {/* <div className="my-timer">
          <span>{timerDay ? timerDay : 0}</span>d <span>{timerHour ? timerHour : 0}</span>h <span>{timerMin ? timerMin : 0}</span>m <span>{timerSec ? timerSec : 0}</span>s
          </div> */}
          <ProgressBar completed={25} completedClassName="my-progress-bar"/>
          <h1>Attachment</h1>
          {ticketAttachments < 1 ? "None" : ticketAttachments && ticketAttachments.map((attach,id)=>(
            <>
            <div className="single-attachment" key={id}>
            <div className="attach-text">
                <ArticleIcon className="attachment-icon"/>
                <div className="attachment-text"><p>{attach.fileName}</p><p>{attach.size}</p></div>
             </div>
             <div className="attach-con">
                <FileDownloadOutlinedIcon type='button' onClick={()=>{downloadFile(attach.fileName)}}>Download</FileDownloadOutlinedIcon>
                <DeleteOutlineOutlinedIcon type='button' onClick={()=>deletefile(attach.fileName)}/>
              </div>
            </div>
            </>
            ))
            }
             
            <div className="resParty-next">
            <h1>Next Responsible Party</h1>
            <span className="edit-span" onClick={editParty}>{showParty ? <CancelIcon/> : "Edit"}</span>
            </div>
          {!showParty ?  
          <>
          <p key={ticketNumber} className="res-p">{selectTicket.nextResponsible}</p>
          </>
          : " "
            }
            {
              showParty ? <NextResParty onPartyChange={editParty} info={ticketNumber}/> : ''
            }


          <div className="my-details-head"> 
          <h1>Details</h1>
          <span className="edit-span" onClick={editTicket}>{open ? <CancelIcon/> :"Edit"}</span>
          </div> 
          <div className = "my-details-content">
              
              {open ? <EditRow onStateChange={editTicket} info={ticketNumber}/> :
              <>
              <div className="details-div"><span>ID</span> <p>{selectTicket.ticketId}</p></div>
              <div className="details-div"><span>Title</span> <p>{selectTicket.title}</p></div>
              <div className="details-div"><span>Project Tag</span> <p>{selectTicket.projectTag}</p></div>
              <div className="details-div"><span>Priority</span> <p>{selectTicket.priority}</p></div>
              <div className="details-div"><span>Category</span> <p>{selectTicket.category}</p></div>
              <div className="details-div"><span>Submitted By</span> <p>{selectTicket.submittedBy}</p></div>
              <div className="details-div"><span>Submitted Date</span> <p>{moment(selectTicket.submittedDate).format('L')}</p></div>
              <div className="details-div"><span>Due Date</span> <p>{moment(selectTicket.dueDate).format('L')}</p></div>            
          </>
}
          </div>

          <h1>People</h1>
          <div className="people">
          {responsible.map((nxt,id)=>(
              <React.Fragment key={nxt.id}>
            <AccountCircleIcon/>
            <p>{nxt.fullName}</p>
            </React.Fragment>
            )
            )}
          </div>          
        </div>

        
        </div>
        }
        
        </div>
    )
}

export default MyTickets
