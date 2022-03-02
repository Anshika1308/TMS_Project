import React from 'react'
import CardDetails from './CardDetails'
import "./CardFilter.css"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Carousel from 'react-elastic-carousel';
import { LinearProgress } from '@mui/material';


const CardFilter = ({ parent,loading }) => {

    // const [uniqueCategory, setUniqueCategory] = useState([])


    // useEffect(() => {

    //     let flags = [], uniqueCategories = [], l = parent.length, i;

    //     for (i = 0; i < l; i++) {
    //         if (flags[parent[i].category]) continue;
    //         flags[parent[i].category] = true;
    //         uniqueCategories.push(parent[i]);
    //     }
    //     setUniqueCategory(uniqueCategories)
    // }, [parent])


    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 514, itemsToShow: 2 },
        { width: 850, itemsToShow: 3 }
    ]    
    return (
        <>
        {parent < 1 ? 'No Tickets Here....Yet':
        <Carousel breakPoints={breakPoints}>
        {parent.map((par,id)=>(
        <div className="card-filter" key={id}>
            <div className="filter-head">
            <div className="filter-head-left">
            <span>{par.categoryName}</span>
            </div>
            <div className="filter-head-mid">
            <SortIcon className="icon-filter"/>
            <FilterAltOutlinedIcon className="icon-filter-2"/>
            </div>
            <MoreVertIcon/>
            </div>
            {par.ticketResponses.map((pa,index)=>(
             <CardDetails categoryItem={par.category} pa={pa} key={index} loading={loading}/>
            ))
            }
            {loading ? <LinearProgress/>: ""}
        </div>
        ))}
        </Carousel>
        }
       </> 
    )
}

export default CardFilter
