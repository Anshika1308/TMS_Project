import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import "./EditArticle.css"
import moment from 'moment'
import axios from 'axios';


const EditArticle = ({onEditChange,currentArticle,id}) => {

    const [header, setHeader] = useState(currentArticle.title);
    const [body, setBody] = useState(currentArticle.description);   
    const[loading,setLoading] = useState(false) 
    
    const editTitle = (e) => {
        e.preventDefault();
        setHeader(e.target.value)

      }
      const editDesc = (e) => {
        e.preventDefault();
        setBody(e.target.value)
      }


    const fetchedToken = localStorage.getItem('token');

    const url = 'http://10.1.130.10:88/dev.tms.api/article/UpdateArticle'


    const EditedForm = (e) => {
      setLoading(true)
      e.preventDefault();
      let bodyFormData = new FormData();
      bodyFormData.append('Id',id);
      bodyFormData.append('Title', header);
      bodyFormData.append('Description', body);
      bodyFormData.append('formFiles', '');
    for (var pair of bodyFormData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      axios.post(url, bodyFormData,
        {
          headers:
            { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${fetchedToken}` }
        }).then(res=>{console.log(res) 
          if (res.data.succeeded === true){
            onEditChange();
            setLoading(false)
        }});
    }
    // console.log(currentArticle)

  return (
    <div className="create-art">
    <Button className="back-btn" onClick={onEditChange} style={{
                     backgroundColor: "#0A387D"  
                   }}
       variant="contained">Back</Button>
     <div className="create-art-img">
     <img src="https://i.pinimg.com/236x/ce/7a/bf/ce7abfa050f852d12a6911deed69e72e--rococo.jpg" placeholder="Sample Image"/>
   <label className="art-label">
      Select an Image   
    <input type="file" className="art-input"/>
   </label>
     </div>  
     <p className="art-date-edit">
     {moment(currentArticle.createdDate).format('MMMM Do YYYY')}
     </p>
     <div className="edit-art-title">
       <p>Header</p>
           <textarea type="text" value={header} onChange={editTitle}></textarea>
     </div>
     <div className="edit-art-desc">
       <p>Body</p>
       <textarea type="text"  value={body} onChange={editDesc}></textarea>
     </div>
     <div className="create-art-controls">
     <Button className="back-btn" style={{
                     backgroundColor: "#0A387D"  
                   }}
       variant="contained" onClick={EditedForm}>{loading?<CircularProgress style={{color:"white"}} />:"Save"}</Button>
     <Button className="cancel-btn-art" onClick={onEditChange} style={{
                     backgroundColor: "#707070"  
                   }}
       variant="contained">Cancel</Button>
       </div>
 </div>
  );
};

export default EditArticle;
