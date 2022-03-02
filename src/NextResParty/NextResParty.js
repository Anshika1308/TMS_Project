import { Button, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./NextResParty.css"

const NextResParty = ({ onPartyChange, info }) => {

  const [nextResParty, setNextResParty] = useState([])
  const [nextResponsibleId, setNextResponsibleId] = useState(0)

  // console.log(info)

  useEffect(() => {
    axios.get(`/nextResponsible/${info}`)
      .then(req => setNextResParty(req.data.data))
  }, [])


  const inputEvent7 = (event) => {
    setNextResponsibleId(event.target.value)
  };



  const saveParty = () => {

    let data = JSON.stringify({
      "id": info,
      "nextResponsibleId": nextResponsibleId

    });

    const fetchedToken = localStorage.getItem('token');

    let config = {

      method: 'post',

      url: 'http://10.1.130.10:88/dev.tms.api/nextResponsible/Update',

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
    onPartyChange();
  }

  return (
    <>
      <div>

        <Select className='selnextParty'
          name="nextParty"
          value={nextResponsibleId}
          onChange={inputEvent7}>
          <MenuItem value="0" disabled>Edit</MenuItem>
          {nextResParty.map((nxt,index) => (
            <MenuItem key={index} value={nxt.id}>{nxt.fullName}</MenuItem>
          ))
          }
        </Select>

      </div>
      <div className="party-buttons">
        <Button className="edit-save-btn" onClick={saveParty}>Save</Button>
        <Button className="edit-cancel-btn" onClick={onPartyChange}>Cancel</Button>
      </div>
    </>
  )
}

export default NextResParty
