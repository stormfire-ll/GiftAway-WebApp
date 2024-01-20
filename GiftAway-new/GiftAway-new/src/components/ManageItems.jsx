import React from 'react'
import axios from 'axios'

const ManageItems = ({id, logo, title, description, onDelete, onEdit, onRetrieved}) => {
  const [retrieved, setRetrieved] = useState(false); //?

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

// ------------ TO DO 

  // const editIt = () => {
  //   axios.patch(`http://localhost:4000/giftaway?giftawayId=${id}`, {
  //     withCredentials: true
  //   })
  //   .then(res => {
  //     onEdit(id);
  //   })
  //   .catch(err => console.log(err))
  // }

  const retrievedIt = () => {
    axios.patch(`http://localhost:4000/giftaway?giftawayId=${id}`, { // LInk?
        //???
    },
    {
      withCredentials: true
    })
    .then(res => {
      onRetrieved(id);
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
          <button className="btn btn-warning" style={{ height: "40px", marginLeft: "10px" }} onClick={deleteIt}>
            Delete me!
          </button>     
          {/* <button className="btn btn-warning" style={{ height: "40px", marginLeft: "10px" }} onClick={editIt}>
            Edit
          </button>  */}
          <button className="btn btn-warning" style={{ height: "40px", marginLeft: "10px" }} onClick={retrievedIt}>
            Retrieved
          </button>   
        </div>
      </div>

    </div>
  )
}

export default ManageItems