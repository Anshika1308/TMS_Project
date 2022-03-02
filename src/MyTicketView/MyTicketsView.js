import React from 'react'
import FilterBar from '../FilterBar/FilterBar'
import MyTickets from '../MyTickets/MyTickets'
import "./MyTicketsView.css"

const MyTicketsView = () => {
    return (
        <div className="my-ticket-view">
        <div className="my-tickets-filter">
            <FilterBar/>
        </div>
        <div className="my-tickets-display">
            <MyTickets/>
        </div>
        </div>

    )
}

export default MyTicketsView
