import React from 'react'
import axios from 'axios'



const CardItems = ({ id, logo, title, description, onClaimIt, mail, phone }) => {

//claim funktion wenn man auf den button klickt. er macht einen patch request an das backend und gibt dem entry einen consumerId und gibt in zu den claimed items
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
          <button className="btn btn-warning" style={{ height: "40px", marginLeft: "10px" }} onClick={claimIt}>
            Claim it!
          </button>
        </div>
      </div>

    </div>
  )
}

export default CardItems