import React, { useEffect, useState } from 'react';
import { Button, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import "./ChangeStatus.css"



const ChangeStatus = ({onStatChange , info}) => {

const [status, setStatus] = useState([])
const [statusId, setStatusId] = useState(0)

useEffect(() => {
  // add axios here
  axios.get(`/status`)
    .then(req => setStatus(req.data.data))
}, [])

const inputEvent = (event) => {
    setStatusId(event.target.value)
  };

  const saveStat = () => {

    let data = JSON.stringify({
      "id": info,
      "statusId": statusId

    });

    const fetchedToken = localStorage.getItem('token');

    let config = {

      method: 'post',

      url: 'http://10.1.130.10:88/dev.tms.api/ticket/UpdateTicketStatus',

      headers: {

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${fetchedToken}`

      },
      data: data
    };
    console.log(data)

    axios(config).then(function (response) {

      console.log(JSON.stringify(response.data));

    })
    onStatChange();
  }




  return (
      <>
  <div>
        <Select className='selnextParty'
          value={statusId}
          onChange={inputEvent}>
          <MenuItem value="0" disabled>Edit</MenuItem>
          {status.map((stat,index) => (
            <MenuItem key={index} value={stat.id}>{stat.name}</MenuItem>
          ))
          }
        </Select>

  </div>
   <div>
   <Button className="edit-save-btn" onClick={saveStat}>Save</Button>
   <Button className="edit-cancel-btn" onClick={onStatChange}>Cancel</Button>
 </div>
 </>
  )
};

export default ChangeStatus;
