import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment'


import "./KnowledgeBase.css"
const KnowledgeBase = () => {
  const navigate = useNavigate();

  const [showArt, setShowArt] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();
    // add axios here
    
      axios.get(`/article`,{ signal:abortCont.signal })
      .then(res => setShowArt((res.data.data))
      ).catch(err=>console.log(err))
    
    return () => abortCont.abort();
  },[])
  
  return( 
  
    <div className="k-base">
      <div className="k-title">
        <h3>All Articles</h3>
        <button onClick={()=>navigate("/add")}><span>+</span>Create Article</button>
      </div>  

    {showArt.length < 1 ? "No Articles Here" : showArt.map((show,id)=>(
      <div className="k-content" onClick={()=>navigate(`/Article/${show.id}`)} key={id}>
      <div className="k-div-left">
      <img src="https://i.pinimg.com/236x/ce/7a/bf/ce7abfa050f852d12a6911deed69e72e--rococo.jpg" placeholder="Sample Image"/>
      </div>
      
      <div className="k-div-right">
        <p>{moment(show.createdDate).format('MMMM Do YYYY')}</p>
        <span>{show.title}</span>
        <div>{show.description}</div>
      </div>
      </div>
    )).sort().reverse()}
   </div>
  );
};

export default KnowledgeBase;
