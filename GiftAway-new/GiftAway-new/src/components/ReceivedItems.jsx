import React from 'react'
import axios from 'axios'



const CardItems = ({ id, logo, title, description, onClaimIt, mail, phone }) => {


  const claimIt = (e) => {
    axios.patch("http://localhost:4000/dashboard/claimit", {

      giftawayId: id,


    }, {
      withCredentials: true
    })
      .then(response => {

        onClaimIt(id, response.data.consumerId);
      })

      .catch(err => console.log(err))

  }

  

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
        </div>
      </div>

    </div>
  )
}

export default CardItems