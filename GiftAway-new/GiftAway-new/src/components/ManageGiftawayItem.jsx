import React from 'react'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const ManageGiftAwayItems = ({id, logo, title, description}) => {

console.log(id, logo, title, description)

 const deleteIt = (e) => {
  axios.delete("http://localhost:4000/giftaway/deleteGiftaway", {

  giftawayId: id,


  }, {
    withCredentials: true
  })
  .then()
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
          <button className="btn btn-warning" style={{ height: "40px", marginLeft: "10px" }} onClick={deleteIt}>
            Delete me!
          </button>
        </div>
      </div>

    </div>
  )
}

export default ManageGiftAwayItems