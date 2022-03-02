import { Button, MenuItem, Select } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./EditRow.css"

const EditRow = ({onStateChange, info}) => {

    const [title, setTitle] = useState("");

    // console.log(info);

    const [projects, setProjects] = useState([])
    const [projectId, setProjectId] = useState(0)

    const [ticketId, setTicketId] = useState([])

    useEffect(() => {
      const abortCont = new AbortController();
      // add axios here
      axios.get(`/ticket/${info}`,{ signal:abortCont.signal })
      .then(res => setTicketId((res.data.data))
      ).catch(err=>console.log(err))
      return () => abortCont.abort();
    },[info])


    useEffect(() => {
        axios.get(`/project`)
        .then(req => setProjects(req.data.data))
     },[])

     const inputEvent3 = (event) => {
        setProjectId(event.target.value) 
       }; 

       



    const [priorityId, setPriorityId] = useState(0); 



    
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(0)
 
    useEffect(() => {
       axios.get(`/category`)
       .then(resp => setCategories(resp.data.data))
       
    },[])

    const inputEvent = (event) => {
        setCategoryId(event.target.value)    
       }; 


       let data = JSON.stringify({
        "id":info,
        "title":title === "" ? ticketId.title : title,
        "projectId":projectId === 0 ? ticketId.projectId : projectId,
        "priorityId":priorityId === 0 ? ticketId.priorityId : priorityId,
        "categoryId":categoryId === 0 ? ticketId.categoryId : categoryId,
      });
      
      const fetchedToken = localStorage.getItem('token');
    
      let config = {
    
        method: 'post',
      
        url: 'http://10.1.130.10:88/dev.tms.api/ticket/Update',
      
        headers: { 
      
          'Content-Type': 'application/json', 
      
          'Authorization': `Bearer ${fetchedToken}`
      
        }, 
        data : data
      };


      const saveDetails = () => {
          console.log(data)

          axios(config).then(function(response) {
            
          console.log(JSON.stringify(response.data));
            
          })
          onStateChange();
      }
    


    return (
        <>
        <div className="edit">

              <input className="input_title"
                  type="text"
                  id="Title"
                  name="Title"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  placeholder="Edit Title"  
                />

          <Select className="sel_projectId"
            value={projectId}
            displayempty="true"
            name="projectTag"
            onChange={inputEvent3}
          >
            <MenuItem value={0}>Edit Project Tag</MenuItem>
            {
              projects.map((pro, id) => (
                <MenuItem key={id} value={pro.id}>{pro.name}</MenuItem>
              )
              )
            }
          </Select>


          <Select className="sel_priority"
            value={priorityId}
            onChange={(e) => { (setPriorityId(e.target.value)) }}>
            <MenuItem value={0}>Edit Priority</MenuItem>
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={3}>Medium</MenuItem>
            <MenuItem value={2}>High</MenuItem>
          </Select>

          <Select className="sel_category"
            displayempty
            name="category"
            value={categoryId}
            onChange={inputEvent}
          >
            <MenuItem value="0" disabled>Edit Category</MenuItem>
            {categories.map((cat, id) => (
              <MenuItem key={id} value={cat.id}>{cat.name}</MenuItem>
            ))
            }
          </Select>

        </div>
                  <Button className="edit-save" onClick={saveDetails}>Save</Button>
                  <Button className="edit-cancel" onClick={onStateChange}>Cancel</Button>

        </>
    )
}

export default EditRow
