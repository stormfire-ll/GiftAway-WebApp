import React from 'react'
import axios from 'axios'
import { useState } from 'react';


const ManageItems = ({id, logo, title, description, onDelete, onRetrieved  }) => { //onEdit
  // const [retrieved, setRetrieved] = useState(false);
  const [retrieverId, setRetrieverId] = useState(null);

  //löscht einen eintrag aus der db 
  const deleteIt = () => {
  axios.delete(`http://localhost:4000/giftaway?giftawayId=${id}`, {
  //giftawayId: id,
      withCredentials: true
    })
    .then(res => {
      //console.log(res);
      onDelete(id);
    })
    .catch(err => console.log(err))
  }  

  const retrievedIt = (e) => {
    axios.get(`http://localhost:4000/giftaway`, {
      giftawayId: id,
    },
    {
      withCredentials: true
    })
    .then(response => {
      const newRetrieverId = response.data.retrieverId;
      setRetrieverId(newRetrieverId);
      onRetrieved(id, newRetrieverId);
    })
    .catch(err => console.log(err))
  }

// ------------ TO DO 

  // const editIt = () => {
  //   axios.get(`http://localhost:4000/giftaway?giftawayId=${id}`, {
  //     withCredentials: true
  //   })
  //   .then(res => {
  //     onEdit(id);
  //   })
  //   .catch(err => console.log(err))
  // }

  return (
    
    <div style={{ display: "flex", flexDirection: "row" }} >
      <div className='leftCardItem'>
        <img src={logo} style={{ width: "100px", height: "100px", margin: "5px", borderRadius: "10px" }} />
      </div>
      <div className='rightCardItem' style={{ textAlign: "left", paddingLeft: "10px" }}>
        <h2>{title}</h2>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p style={{ flex: 1, padding: "2px" }}>
           {description}
          </p>
          <button className="btn btn-warning" style={{ height: "40px", marginLeft: "10px" }} onClick={deleteIt}>
            Delete me!
          </button>     
          {/* <button className="btn btn-warning" style={{ height: "40px", marginLeft: "10px" }} onClick={editIt}>
            Edit
          </button>  */}
          <button className="btn btn-warning" style={{ height: "40px", marginLeft: "10px" }} onClick={retrievedIt}>
            Retrieved
          </button>   
          {retrieverId && (
            <input
              type="text"
              value={retrieverId}
              readOnly
              style={{ height: '40px', marginLeft: '10px', border: '1px solid #ccc', padding: '5px' }}
            />
          )}
        </div>
      </div>

    </div>
  )
}

export default ManageItems