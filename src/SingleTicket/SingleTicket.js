import React, { useEffect, useLayoutEffect, useState } from 'react'
import "./SingleTicket.css";
import { Accordion, AccordionDetails, AccordionSummary, Button, LinearProgress, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router'
import ProgressBar from "@ramonak/react-progress-bar";
import ArticleIcon from '@mui/icons-material/Article';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import EditRow from '../EditRow/EditRow';
import NextResParty from '../NextResParty/NextResParty';
import moment from 'moment'
import FileSaver from 'file-saver';
import CancelIcon from '@mui/icons-material/Cancel';
import ChangeStatus from '../Status/ChangeStatus';



const SingleTicket = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [inputData, setInputData] = useState('');
  const [text, settext] = useState([]);

  const [ticketData, setTicketData] = useState([]);

  const [ticketComments, setTicketComments] = useState([])


  const [ticketAttachment, setTicketAttachments] = useState([])

  const [ticketQues, setTicketQues] = useState([])

  const [faq, setFaq] = useState([])

  const [responsible, setResponsible] = useState([])

  const [open, setOpen] = useState(false)

  const [showParty, setShowParty] = useState(false)

  const [showStatus, setShowStatus] = useState(false)

  const [timerDay, setTimerDay] = useState()
  const [timerHour, setTimerHour] = useState()
  const [timerMin, setTimerMin] = useState()
  const [timerSec, setTimerSec] = useState()
  
  
  
  useEffect(() => {
    const abortCont = new AbortController();
    // add axios here
    setTimeout(()=>{
      axios.get(`/ticket/${id}`,{ signal:abortCont.signal })
      .then(res => setTicketData((res.data.data))
      ).catch(err=>console.log(err))
    },800)
    return () => abortCont.abort();
  },[id,open,showParty,showStatus])

  useEffect(() => {
    const abortCont = new AbortController();
    // add axios here
    setTimeout(()=>{
      axios.get(`/ticket/${id}`,{ signal:abortCont.signal })
      .then(res => setTicketComments((res.data.data.comments)))
      .catch(err=>console.log(err))
    },800)
    return () => abortCont.abort();
  },[id,text])

  useEffect(() => {
    const abortCont = new AbortController();
    // add axios here
    axios.get(`/ticket/${id}`,{ signal:abortCont.signal })
    .then(res => setTicketAttachments((res.data.data.attachments)))
    .catch(err=>console.log(err))
    return () => abortCont.abort();
  },[id,ticketAttachment])

  useEffect(() => {
    const abortCont = new AbortController();
    // add axios here
    axios.get(`/ticket/${id}`,{ signal:abortCont.signal })
    .then(res => console.log((res.data.data.generalQandA.questions)))
    .catch(err=>console.log(err))
    return () => abortCont.abort();
  },[id])

  useEffect(() => {
    const abortCont = new AbortController();
    // add axios here
    axios.get(`/faq`,{ signal:abortCont.signal })
    .then(res => setFaq((res.data.data)))
    .catch(err=>console.log(err))
    return () => abortCont.abort();
  },[id])

  useEffect(() => {
    const abortCont = new AbortController();
    // add axios here
    setTimeout(()=>{
      axios.get(`/nextResponsible/${id}`,{ signal:abortCont.signal })
      .then(res => setResponsible((res.data.data)))
      .catch(err=>console.log(err))
    },800)
    return () => abortCont.abort();
  },[id])


  let interval;
  const dateDue = ticketData ? ticketData.dueDate : 10

  const startTimer = () => {
    const finalDue =  (new Date(dateDue).getTime());

    interval = setInterval(()=>{
     const finalSub =  (new Date().getTime());
     const distance = finalDue - finalSub === NaN ? 0 : finalDue - finalSub
     
     const days = Math.floor((distance)/(24 * 60 * 60 * 1000))
     const hours = Math.floor((distance % (24 * 60 * 60 * 1000))/(1000 * 60 * 60));
     const minutes = Math.floor((distance % (60 * 60 * 1000))/(1000 * 60));
     const seconds = Math.floor((distance % ( 60 * 1000))/(1000));

     setTimerDay(days)
     setTimerHour(hours)
     setTimerMin(minutes)
     setTimerSec(seconds)

    })


  }

  useLayoutEffect(() => {
    const abortCont = new AbortController();
    startTimer();
   return (
    { signal:abortCont.signal },abortCont.abort())
    
  });
    


  
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
  const navigate = useNavigate();
  
  let data = JSON.stringify({
    "ticketId":id,
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
          "ticketId":`${id}`,
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

         "ticketId": `${id}`,

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
      //  ticketAttachment.splice(0,1);
       setTicketAttachments(ticketAttachment);
     })

     .catch((error) => {

       console.error('Error:', error);

     }); 

    }


}

  return (
    <div className = "my-ticket">
      <div className="create-ticket-new">
      <Button className="back-btn" onClick={()=>navigate(-1)} style={{
                      backgroundColor: "#0A387D"  
                    }}
        variant="contained">Back</Button>
        <div className="my-ticket-bar">
          <span className="bar-title">
         ID {ticketData.ticketId}
          </span>
          <span>
          {ticketData.title}
          </span>
        </div>
        </div>
        <div className="my-ticket-area">
          <div className="div-left">
          <span className="my-span">ID - {ticketData.ticketId ? ticketData.ticketId : <LinearProgress/>}</span>
          <span className="my-span-2">{ticketData.title ? ticketData.title : 'Loading Title'}</span>
          <div className = "my-ticket-description">
            {ticketData.description ? ticketData.description : 'Loading Description' }
          </div>
          <div className="my-tickets-head">
              <span className="my-tickets-comments-head">
              COMMENTS
              </span>
              
          {/* <span className="my-tickets-comments-act">
              ACTIVITY
          </span> */}
          </div>
          <div className="user-input-section">
          <textarea type="text" placeholder="Enter Comments" value={inputData} onChange={(e)=>{setInputData(e.target.value)}}/>
          <button onClick={addComment}>Save</button>

            {
              ticketComments.map((tixd,id) => (
              <div className="comments-display" key={id}>
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

        <div className = "div-center">
          <div className="status-progress">
            <h1>
              Status
            </h1>
            <span className="edit-span" onClick={editStat}>{showStatus ? <CancelIcon/>: "Edit"}</span>
          </div>
            {
              showStatus ? <ChangeStatus onStatChange={editStat} info={id}/> : <span className={ticketData.status === 'Opened' && 'stat-open' || ticketData.status === 'Closed' && 'stat-close' || ticketData.status === 'In-Progress' && 'stat-progress' || ticketData.status === 'Work Completed' && 'stat-work'} >{ticketData.status}</span>
            }

          <div className="my-timer">

             <span>{timerDay ? timerDay : 0}</span>d <span>{timerHour ? timerHour : 0}</span>h <span>{timerMin ? timerMin : 0}</span>m <span>{timerSec ? timerSec : 0}</span>s
          </div>
          <ProgressBar completed={25} completedClassName="my-progress-bar"/>
            <h1>Attachment</h1>
          {ticketAttachment < 1 ? 'None' : ticketAttachment && ticketAttachment.map((attach,id)=>(
            
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
            
            ))
            }
            <div className="resParty-next">
            <h1>Next Responsible Party</h1>
            <span className="edit-span" onClick={editParty}>{showParty ? <CancelIcon/>: "Edit"}</span>
            </div>
          {!showParty ?  
          <>
          {ticketData.nextResponsible === "" ? <p className="res-p">Next Responsible Party is Not Selected</p> :<p key={id} className="res-p">{ticketData.nextResponsible}</p>}
          </>
          : " "
            }
            {
              showParty ? <NextResParty onPartyChange={editParty} info={id}/> : ''
            }
  
          <div className="my-details-head"> 
          <h1>Details</h1>
          <span className="edit-span" onClick={editTicket}>{open ? <CancelIcon/> :"Edit"}</span>
          </div> 
          <div className = "my-details-content">
              
              {open ? <EditRow onStateChange={editTicket} info={id}/> : 
              <>
              <div className="details-div"><span>ID</span> <p>{ticketData.ticketId}</p></div>
              <div className="details-div"><span>Title</span> <p>{ticketData.title}</p></div>
              <div className="details-div"><span>Project Tag</span> <p>{ticketData.projectTag}</p></div>
              <div className="details-div"><span>Priority</span> <p>{ticketData.priority}</p></div>
              <div className="details-div"><span>Category</span> <p>{ticketData.category}</p></div>
              <div className="details-div"><span>Submitted By</span> <p>{ticketData.submittedBy}</p></div>
              <div className="details-div"><span>Submitted Date</span> <p>{moment(ticketData.submittedDate).format('L')}</p></div>
              <div className="details-div"><span>Due Date</span> <p>{moment(ticketData.dueDate).format('L')}</p></div>  
              </>
              }
              
          </div>

          <h1>People</h1>
          <div className="people">
            {responsible && responsible.map((nxt,id)=>(
              <React.Fragment key={nxt.id}>
            <AccountCircleIcon/>
            <p>{nxt.fullName}</p>
            </React.Fragment>
            )
            )}
          </div>          
        </div>

        <div className = "div-right">
          <div className="faq-head">
            General Related Questions        
          </div>

        <div className="acc-head-2">
            <p>{ticketData.category ? <span>{ticketData.category} Q and A</span> : 'Loading Category Questions' }</p>
          </div>
        {ticketQues.map((que,id)=>(
      <div className="accordianstyle-duplicate" key={id}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="suggestion">{que.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {que.answers}
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>  
        ))}

          <div className="acc-head">
            <p>TMS Related Q and A</p>
          </div>

      {faq.map((gen,id)=>(
      <div className="accordianstyle-duplicate" key={id}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="suggestion">{gen.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {gen.answers}
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>  
      ))    
      }
     
       
        

          </div>
      </div>
    </div>
  )
}

export default SingleTicket
