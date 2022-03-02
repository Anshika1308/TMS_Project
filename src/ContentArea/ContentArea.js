import React, { useEffect, useState } from 'react'
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import FilterBar from '../FilterBar/FilterBar';
import "./ContentArea.css"
import CardRender from '../CardComponent/CardRender';
import axios from 'axios';
// import { useNavigate } from 'react-router';
// import jwt from "jsonwebtoken"


const ContentArea = () => {

    const [parent, setParent] = useState([])
    const [loading, setLoading] = useState(true)
    const [fdata, setFdata] = useState([])

    let offSet = 10; 
    const loadMore = () => {
        let numberPage = 1;
        axios.post('/ticket/GetApplicableTickets',{
            pageNumber: `${numberPage}`,
            limit: `${offSet}`
          }) 
       .then(res => {setParent((res.data.data));if (res.status===200){
        setLoading(false)
       }}) 
        offSet+=10;  
        numberPage+=1;

    }

    const handleScroll = (e) => {
        if(window.innerHeight + e.target.documentElement.scrollTop + 2 >= e.target.documentElement.scrollHeight){
            setLoading(true)
            loadMore()
        }
    }

    useEffect(() => {
      // add axios here
      loadMore();
      window.addEventListener('scroll', handleScroll)  
    } ,[setParent])


    const [state,setState] = useState('');
    const [data, setData] = useState(parent)

       
    useEffect(()=>{setData(parent)},[parent])

    useEffect(()=> {
        setFdata(data);
    }, [data]);


    const getState = (state) => {
        setState(state)
             let sdata= []
             let newArr =  data.map((list,index)=>{
             console.log(list,"list")
             sdata.push({
             "categoryName": list.categoryName, "ticketResponses" : list.ticketResponses.filter(item=>{return item.status === state})
             })
             return true;
             })  
          setFdata(sdata);
        }

        const getPriority = (state) => {
            setState(state)
            let sdata= []
            let newArr =  data.map((list,index)=>{
            sdata.push({
            "categoryName": list.categoryName, "ticketResponses" : list.ticketResponses.filter(item=>{return item.priority === state})
            })
            return true;
           })
             setFdata(sdata);
            }

            const getCategory = (state) => {      
                let filteredData = parent.filter(item=>{return item.categoryName === state});
                     setData(filteredData);
                      }

            const getRemove = (state)=>{
                 setState(state);
                 let removeData = parent;              
                 setData(removeData);
                 setFdata(removeData);
                }         
    // const navigate = useNavigate();
    // const fetchedToken = localStorage.getItem('token');
    // jwt.verify(fetchedToken,"C1CF4B7DC4C4175B6618DE4F55CA4", function(err,decode)
    // {
    //     if(err && window.onload){
    //       console.log(err);
    //       navigate("/login")
    //     }
    // })
    return (
        <>
            <div className="content-area">
            <CategoriesBar getCategory={getCategory} getRemove={getRemove}/>
            <FilterBar getState={getState} getPriority={getPriority} getRemove={getRemove}/>
            <CardRender parent={fdata} loading={loading}/>
            </div>
        </>  
    )
}

export default ContentArea;
