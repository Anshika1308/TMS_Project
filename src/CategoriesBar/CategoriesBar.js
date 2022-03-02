import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./CategoriesBar.css"
import { LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router';



const CategoriesBar = (props) => {


    const [keywords,setKeywords] = useState([])
    const [isActive, setIsActive] = useState();
    const [visible, setVisible] = useState(false);



    const fetchedToken = localStorage.getItem('token');

    const navigate = useNavigate()

    
    useEffect(() => {
        if (fetchedToken) {
            axios.get(`/category`)
            .then(resp => setKeywords(resp.data.data)).catch(err=> alert(err, 'Try again! Please Refresh the Page') && navigate("/login"))
        } else {
            window.location.reload()
        }  
     },[])

     const selectedCategory = (id,state) => {
        props.getCategory(state)
        setIsActive(id)
        setVisible(true)

    }

    const removeCat = (id,state)=>{
        props.getRemove(state);
        setIsActive();
        setVisible(false);
   }


    return (
        <div className="categories">
            {keywords <  1 ? <LinearProgress/> :
                keywords.map(word =>(
                    <span className={isActive === word.id ? "activeness" : ""} key={word.id} onClick={()=>selectedCategory(word.id, word.name)}>{word.name}</span>
                )) 
            }

            {visible ? <span onClick={removeCat}>All Categories</span> : " " }
            
        </div>
    )
}

export default CategoriesBar
