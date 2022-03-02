import React, { useEffect, useState } from 'react';
import "./Article.css"
import { useLocation, useNavigate } from 'react-router';
import { Button, LinearProgress } from '@mui/material';
import EditArticle from '../EditArticle/EditArticle';
import axios from 'axios';
import moment from 'moment'


const Article = () => {

  const[isEdit, setIsEdit] = useState(false)
  const[currentArticle, setCurrentArticle] = useState([])

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const abortCont = new AbortController();
    // add axios here
    setTimeout(()=>{
      axios.get(`/article/${id}`,{ signal:abortCont.signal })
      .then(res => setCurrentArticle((res.data.data))
      ).catch(err=>console.log(err))
    },200)
    return () => abortCont.abort();
  },[id, isEdit])

  const editArt = () => {
    setIsEdit(!isEdit)
  }

    const navigate = useNavigate()
  return (
    <>
   {isEdit ? <EditArticle currentArticle={currentArticle} id={id} onEditChange={editArt}/> :  
  <div className="article">
      <div className="art-controls">
          <div className="controls-left">
          <Button className="back-btn" onClick={()=>navigate("/knowledge")} style={{
                      backgroundColor: "#0A387D"  
                    }}
        variant="contained">Back</Button>
          </div>
          <div className="controls-right">
          <Button className="back-btn" style={{
                      backgroundColor: "#0A387D"  
                    }}
        variant="contained" onClick={editArt}>Edit</Button>
            <button className="art-create" onClick={()=>navigate("/add")}><span>+</span>Create Article</button>
          </div>
      </div>
      <div className="art-img">
      <img src="https://i.pinimg.com/236x/ce/7a/bf/ce7abfa050f852d12a6911deed69e72e--rococo.jpg" placeholder="Sample Image"/>
      </div>
      <p className="art-date">
        {moment(currentArticle.createdDate).format('MMMM Do YYYY')}
      </p>
      <span className="art-title">
        {currentArticle.title}
      </span>

      <div className="art-desc"> 
        {!currentArticle.description ? <LinearProgress/> : currentArticle.description}
      </div>
  </div>
}
  </>
  );
};

export default Article;
