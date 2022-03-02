import React, { useEffect, useState } from 'react'
import "./FilterBar.css"
import CircleIcon from '@mui/icons-material/Circle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AlarmIcon from '@mui/icons-material/Alarm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';


const FilterBar = (props) => {

    const [filterKeywords,setFilterKeywords] = useState([]);

    const [filterwords,setFilterwords] = useState([]);

    const [isActiveState, setIsActiveState] = useState();

    const [isActivePriorty, setIsActivePriorty] = useState();

    const [stateVisible, setStateVisible] = useState(false);
    const [priorityVisible, setPriorityVisible] = useState(false);
    
    useEffect(() => {
        axios.get(`/status`)
        .then(resp => setFilterKeywords(resp.data.data))
        
     },[])


     useEffect(() => {
        axios.get(`/priority`)
        .then(resp => setFilterwords(resp.data.data))  
     },[])




     
     const selectedState = (id, state) => { 
        props.getState(state)
        setIsActiveState(state);
        setStateVisible(true)
    }

    const removeState = (id,state)=>{
        props.getRemove(state);
        setIsActiveState()
        setStateVisible(false)
   }

    const removePriority = (id,state)=>{
        props.getRemove(state);
        setIsActivePriorty()
        setPriorityVisible(false)
   }



    const selectedPriorty = (id, state) => {
        props.getPriority(state)
        setIsActivePriorty(state);
        setPriorityVisible(true)

    }

    return (
        <div className="filter-bar">
            <div className="filter-left">
                <p>Status</p>
                {
                    filterKeywords.map(stat =>(
                          <span key ={stat.id} className={isActiveState === stat.name? "activeness" : ""} onClick={()=>selectedState(stat.id, stat.name)}>{stat.name}</span>  
                          
                    ))
                }
                {stateVisible ? <span onClick={removeState}>All Statuses</span> : " " }
            </div>
            <div className="filter-mid">
                <p>Priority</p>
                {
                filterwords.map(text =>(
                <span key ={text.id}  className={isActivePriorty === text.name ? "activeness" : ""} onClick={()=> selectedPriorty(text.id, text.name)}>{text.name}
                    <CircleIcon className={text.name === 'High' && "dot-icon-high" 
                                            || text.name ==='Low' && "dot-icon-low"
                                            || text.name==='Medium' && "dot-icon-med"}/>
                                            </span>))}
                {priorityVisible ? <span onClick={removePriority} className="all-prio">All Priority</span> : " " }
                <span className="filter-span">Due Date<CalendarTodayIcon className="filter-icon"/></span>
                <span className="filter-span">Task Domain<KeyboardArrowDownIcon className="filter-icon"/></span>
                <span className="filter-span">SLA<AlarmIcon className="filter-icon"/></span>
            </div>
            <div className="filter-right">
                <CheckCircleIcon className="filter-icon-right"/>
                <CancelIcon className="filter-icon-right-2"/>
            </div>
        </div>
    )
}

export default FilterBar
