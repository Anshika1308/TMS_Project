import React, { useEffect, useState } from "react";
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MultiSelect } from "react-multi-select-component";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import "./Newticket.css";
import { CircularProgress, FormControlLabel, Radio } from "@mui/material";
import axios from "axios";

const Newticket = () => {

  const Input = styled('input')({
    display: 'none',
  });

  const [title, setTitle] = useState("");

  const [ticketDescription, setticketDescription] = useState("");

  const [loading, setLoading] = useState(false);


  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState(0)


  useEffect(() => {
    axios.get(`/category`)
      .then(resp => setCategories(resp.data.data))

  }, [])




  const [clients, setClients] = useState([])
  const [clientId, setClientId] = useState(0)

  useEffect(() => {
    axios.get(`/client`)
      .then(res => setClients(res.data.data))
  }, [])




  const [projects, setProjects] = useState([])
  const [projectId, setProjectId] = useState(1)

  useEffect(() => {
    axios.get(`/project`)
      .then(req => setProjects(req.data.data))
  }, [])

  const [priorityId, setPriorityId] = useState(3);





  const [status, setStatus] = useState([])
  const [statusId, setStatusId] = useState(1)

  useEffect(() => {
    axios.get(`/status`)
      .then(req => setStatus(req.data.data))
  }, [])



  const [dueDate, setDueDate] = useState(new Date())


  const [assign, setAssign] = useState([])
  const [assignid, setAssignid] = useState([])
  const [listassignid, setAssignTo] = useState([])

  
  useEffect(() => {

    let assignItem = [];

    let resData;

    axios.get(`/assign`)

      .then(req => {

        resData = req.data.data
        for (let i = 0; i < resData.length; i++) {

          let idItem = resData[i].id;

          let data = resData[i].fullName;

          assignItem.push({ value: idItem, label: data })

        }

        setAssign(assignItem);

      })

  }, [])



  //   const [nextResParty,setNextResParty] = useState([])
  //   const [nextResponsibleId,setNextResponsibleId] = useState(0)

  //   useEffect(() => {
  //     axios.get(`/nextResponsible`)
  //     .then(req => setNextResParty(req.data.data))
  //  },[])


  //  const [file,setFile] = useState('')
  const [files, setFiles] = useState([]);
  const [showName, setShowName] = useState([]);

  const onFileChange = (e) => {
    const allAttach = Array.from(e.target.files).map((file)=>file)
    setFiles((prevAtt)=>prevAtt.concat(allAttach));
    const fileArray = Array.from(e.target.files).map((file)=>file.name)
    setShowName((prevNames)=>prevNames.concat(fileArray));
  }

  const remFile = (e) => {
    let x = e.target.getAttribute("delattach");
    setFiles(files.filter(v=>v.name!==x));
    setShowName(showName.filter(art=>art!==x));
  }


  const inputEvent = (event) => {
    setCategoryId(event.target.value)

  };


  const inputEvent2 = (event) => {
    setClientId(event.target.value)

  };


  const inputEvent3 = (event) => {
    setProjectId(event.target.value)

  };


  const inputEvent4 = (event) => {
    setStatusId(event.target.value)

  };


  //  const inputEvent5 = (event) => {
  //   setDueDate(event.target.value) 

  //  };


  //  const inputEvent6 = (event) => {
  //   setAssignTo(event.target.value)

  //  };
  const inputEvent6 = (event) => {
    setAssignid(event)
    setAssignTo(Array.isArray(event)?event.map(x=>x.value):[]);
   };

   const cancelButton = (e) => {
     e.preventDefault();
     navigate(-1);
   }

   const previewButton = (e) => {
     e.preventDefault();
     window.scrollTo(0,0);
   }


  //  const inputEvent7 = (event) => {
  //   setNextResponsibleId(event.target.value)

  //  };

  const fetchedToken = localStorage.getItem('token');


  const url = 'http://10.1.130.10:88/dev.tms.api/ticket'


  const navigate = useNavigate()

  const formSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('ticketDescription', ticketDescription);
    bodyFormData.append('categoryId', categoryId);
    bodyFormData.append('clientId', clientId);
    bodyFormData.append('projectId', projectId);
    bodyFormData.append('priorityId', priorityId);
    bodyFormData.append('statusId', statusId);
    for (let i = 0; i < listassignid.length; i++) {
      let finalList = listassignid[i];
      bodyFormData.append('listassignid', finalList); 
  }
    for(let j = 0; j < files.length; j++){
      let finalFiles = files[j];
      bodyFormData.append('formFiles', finalFiles);
    }
    bodyFormData.append('dueDate', dueDate.toISOString());
    for (var pair of bodyFormData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    if (!title.length || !ticketDescription.length === "") {
      alert("Please fill in all the details")
      setLoading(false)
      return false;
    }

    


    axios.post(url, bodyFormData,
      {
        headers:
          { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${fetchedToken}` }
      })
      .then(res => {
        console.log(res)
        if (res.data.succeeded === true) {
          setLoading(false)
          navigate('/content')
        } else {
          alert('Please fill all the details and/or Reload the page')
        }
      });
    //  }

  };



  return (
    <>

      <div className="maincontainer">

        <div className="container_2">
          <div className="create-new-ticket">
            <Button onClick={() => navigate("/content")} style={{
              backgroundColor: "#0A387D"
            }}
              variant="contained">Back</Button>
            <div className="ticket-new">
              <span>
                Create New Ticket
              </span>
            </div>
          </div>

          <div className="sub_container">

            {/* <form> */}
              <div className="title">

                <label className="label">Title</label>
                <div className="txt">
                  <input
                    type="text"
                    id="Title"
                    name="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                  />
                </div>
              </div>

              <br />
              <div className="txt2">
                <label className="">Description</label>
                <br />
                <div className="txt">
                  <textarea
                    type="text"
                    id="Description"
                    rows="3"
                    name="Description"
                    value={ticketDescription}
                    onChange={(e) => setticketDescription(e.target.value)}
                  />
                </div>
              </div>

              <br />

              <div className="user">
                <label className="">Category</label>
                <div className="select1">

                  <Select
                    className="sel"
                    displayEmpty
                    name="category"
                    value={categoryId}
                    onChange={inputEvent}
                  >
                    <MenuItem value="0" disabled>Select</MenuItem>
                    {/* <MenuItem value="2" >Sample</MenuItem> */}
                    {categories.map((cat, id) => (
                      <MenuItem key={id} value={cat.id}>{cat.name}</MenuItem>
                    ))

                    }
                  </Select>


                </div>


                <div className="clientstyle">
                  <label className="client">Client</label>

                  <Select
                    className="sel2"
                    value={clientId}
                    displayEmpty
                    name="client"
                    onChange={inputEvent2}
                  >
                    <MenuItem value="0" disabled>Select</MenuItem>
                    {
                      clients.map((cli, id) => {
                        return (
                          <MenuItem key={id} value={cli.id}>{cli.name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </div>


                <label className="ptag">Project Tag</label>
                <div className="ptaglab">
                  <Select
                    className="sel3"
                    value={projectId}
                    displayEmpty
                    name="projectTag"
                    onChange={inputEvent3}
                  >
                    <MenuItem value="0" disabled>Select</MenuItem>
                    {
                      projects.map((pro, id) => (

                        <MenuItem key={id} value={pro.id}>{pro.name}</MenuItem>
                      )
                      )
                    }
                  </Select>
                </div>
              </div>

              <div className="userstyle3">

                <FormControl component="fieldset">

                  <FormLabel className="lab">Priority</FormLabel>
                  <RadioGroup row aria-label="priority" name="row-radio-buttons-group" value={priorityId} onChange={(e) => { (setPriorityId(e.target.value)) }}>

                    <FormControlLabel value="1" control={<Radio sx={{ color: "#b2a429", '&.Mui-checked': { color: "#ffeb3b", }, }} />} label="Low" />
                    <FormControlLabel value="3" control={<Radio sx={{ color: "#357a38", '&.Mui-checked': { color: "#357a38", }, }} />} label="Medium" />
                    <FormControlLabel value="2" control={<Radio sx={{ color: "#aa2e25", '&.Mui-checked': { color: "#aa2e25", }, }} />} label="High" />

                  </RadioGroup>
                </FormControl>


                <div className="userstyle4">
                  <label className="lab1">Status</label>

                  <Select
                    className="status"
                    value={statusId}
                    displayEmpty
                    name="projectTag"
                    onChange={inputEvent4}
                  >
                    <MenuItem value="0" disabled>Select</MenuItem>
                    {
                      status.map((stat, id) => (
                        <MenuItem key={id} value={stat.id}>{stat.name}</MenuItem>
                      ))
                    }
                  </Select>


                  <label className="labdate">Due Date</label>

                  <DatePicker
                    className="date"
                    selected={dueDate}
                    dateFormat="MM-dd-yyyy"
                    onChange={date => setDueDate(date)}
                    minDate={new Date()} />

                </div>
              </div>

              <div className="user2" >
                <div className="lab2">
                  <label>Assign To</label>
                  </div>
                <br />

                <div className="assignMulti">
                  <MultiSelect

                    // className="assign"

                    options={assign}

                    labelledBy="Select"

                    // displayEmpty

                    name="assignTo"

                    value={assignid}

                    onChange={inputEvent6}

                  >

                  </MultiSelect>

                </div>


                </div>
                <div className="lab3">

                  {/* <div className="add">
                    <Stack direction="column" alignItems="center" spacing={2}>

                      <label htmlFor="contained-button-file" >
                        <input type="file" name="file_upload" onChange={onFileChange} className="file1" /> */}

                        {/* <Button className="file1" variant="contained" component="span">
                         Add Attachment 
                           {/* {files ? files : "Add Attachment"} */}
                        {/* </Button>  */}
                        {/* <img src={view} height="200px"/> */}
                      {/* </label>
                      <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" />
                      </label>
                    </Stack>
                  </div> */}
                </div>
                <div className="dragdrop">

               <Stack direction="row" alignItems="center" spacing={2}>

                  <label htmlFor="contained-button-file">

                     <Input  id="contained-button-file"  onChange={onFileChange} multiple type="file" />

                       <Button className="add2" variant="contained" component="span">

                             Drag Files Here

                       </Button>
                  </label>

                  <label htmlFor="icon-button-file">

                     <Input accept="image/*" id="icon-button-file" type="file" />

                  </label>

               </Stack>

             </div>

             {/* {showName.length > 1 ?
             <div className="showFile">     
             Uploaded file name - {showName}
             <DeleteOutlineIcon className="delFile" onClick={remFile}/>
             </div>  
              : " "} */}
              {showName.length > 0 ? showName.map((shw,id)=>(
                <div className="showFile" key={id}>{shw} 
                <DeleteOutlineIcon className="delFile" delattach={shw} onClick={remFile}/>
                </div>
              ))
              :" "}





            {/* </form> */}


              <div className="buttonstyle">
                <button className="button1" type="submit" onClick={formSubmit}>
                  {loading ? "Loading..." : "Save"}
                </button>
                <button className="button2" onClick={previewButton}>
                  Preview
                </button>
                <button className="button3" onClick={cancelButton}>
                  Cancel
                </button>

              </div>

          </div>




        </div>


        <div className="accordian">

          <div className="accordianstyle">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="suggestion">The answer you are looking for</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The Answer lies within
                </Typography>
              </AccordionDetails>
            </Accordion>

          </div>
          <div className="accordianstyle">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="suggestion">The answer you are looking for</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The Answer lies within
                </Typography>
              </AccordionDetails>
            </Accordion>

          </div>
          <div className="accordianstyle">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="suggestion">The answer you are looking for</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The Answer lies within
                </Typography>
              </AccordionDetails>
            </Accordion>

          </div>
          <div className="accordianstyle">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="suggestion">The answer you are looking for</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The Answer lies within
                </Typography>
              </AccordionDetails>
            </Accordion>

          </div>
          <div className="accordianstyle">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="suggestion">The answer you are looking for</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The Answer lies within
                </Typography>
              </AccordionDetails>
            </Accordion>

          </div>
          <div className="accordianstyle">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="suggestion">The answer you are looking for</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The Answer lies within
                </Typography>
              </AccordionDetails>
            </Accordion>

          </div>
          <div className="accordianstyle">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="suggestion">The answer you are looking for</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The Answer lies within
                </Typography>
              </AccordionDetails>
            </Accordion>

          </div>
          <div className="accordianstyle">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="suggestion">The answer you are looking for</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The Answer lies within
                </Typography>
              </AccordionDetails>
            </Accordion>

          </div>
          <div className="accordianstyle">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="suggestion">The answer you are looking for</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The Answer lies within
                </Typography>
              </AccordionDetails>
            </Accordion>

          </div>
          <div className="accordianstyle">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className="suggestion">The answer you are looking for</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The Answer lies within
                </Typography>
              </AccordionDetails>
            </Accordion>

          </div>

        </div>
      </div>


    </>





  );

};


export default Newticket;

