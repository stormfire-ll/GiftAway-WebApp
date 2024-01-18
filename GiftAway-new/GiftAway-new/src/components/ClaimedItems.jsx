import React from 'react'
import axios from 'axios'

const ClaimedItems = ({ logo, title, mail, phone, id }) => {

    const unClaimIt = (e) => {
        axios.patch("http://localhost:4000/dashboard/unclaimit", {
        
        giftawayId: id,
      
      
        }, {
          withCredentials: true
        })
        .then()
        .catch(err => console.log(err))
        
      
      }  

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>

                <img src={logo} style={{ width: "50px", height: "50px", margin: "5px", borderRadius: "10px" }} />


                <h5 style={{ padding: "15px" }}>{title}</h5>

            </div>
            <div style={{ display: "flex", width: "80%", marginLeft: "75px", textAlign: "left", flexDirection: "row", justifyContent: "space-between" }}>
                <div>
                    <p >mail: {mail}</p>
                    <p >phone: {phone}</p>
                </div>
                <div>
                    <button className="btn btn-warning" style={{ height: "40px", marginTop: "4px" }} onClick={unClaimIt}>
                        Unclaim
                    </button>
                </div>

            </div>

        </div>
    )
}

export default ClaimedItems