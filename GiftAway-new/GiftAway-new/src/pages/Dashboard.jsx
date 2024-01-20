import React, { useEffect, useState } from 'react'
import CardItems from '../components/CardItems'
import ClaimedItems from '../components/ClaimedItems'
import Navbar from '../components/Navbar'
import axios from 'axios'



const Dashboard = () => {


//claimed sind die items mit consumerID zusätzlich zur publisherId, unclaimed/all-gifts nur mit publisherId
    const [claimedGiftaways, setClaimedGiftaways] = useState([])
    const [unclaimedGiftaways, setUnclaimedGiftaways] = useState([])
    const [consumerId, setConsumerId] = useState(null)

//claim funktion damit es auch automatisch aktualisiert wird im frontend wenn man claimt, und fügt eine consumerId hinzu
//zeigt dann nur die contactinformation an
    const handleClaimIt = (id, consumer_id) => {

        axios.post("http://localhost:4000/dashboard/getuser", {id: consumer_id}, {

            withCredentials: true
        })
            .then(res => {
                console.log(res)

                const phone = res.data.phone
                const mail = res.data.mail
                const claimedItem = unclaimedGiftaways.find(item => item._id == id)
//automatische änderung im frontend
                if (claimedItem) {
                    setUnclaimedGiftaways(prev => prev.filter(item => item._id != id))
                    setClaimedGiftaways(prev => [...prev, { ...claimedItem, phone, mail }])
                } 
                
             /*    const claimedItem = unclaimedGiftaways.find(item => item._id === id);

                if (claimedItem) {
                    setUnclaimedGiftaways(prev => prev.filter(item => item._id !== id));
                    setClaimedGiftaways(prev => [...prev, { ...claimedItem, phone: res.data.phone, mail: res.data.mail }]);
                } */
            }
            )
            .catch()

    }

    //get request für die ganze dashboard
    useEffect(() => {
        axios.get('http://localhost:4000/dashboard', {

            withCredentials: true

        })
            .then((res) => {
                const claimedGiftaways = res.data.claimedGiftaways
                const unclaimedGiftaways = res.data.unclaimedGiftaways

                setClaimedGiftaways(claimedGiftaways)
                setUnclaimedGiftaways(unclaimedGiftaways)
                console.log(unclaimedGiftaways, claimedGiftaways)

            })

            .catch(err => console.log(err))

    }, []);

    const addConsumerId = () => {

    }

    const removeConsumerId = () => {


    }

    return (
        <>
            <Navbar />
            <div className="dashboardWrapper" style={{ padding: "5px", paddingTop: "2rem" }}>
                <div className="text-center" style={{ height: "90vh" }}>
                    <div style={{ flexDirection: "row", display: "flex" }}>
                        <div style={{ flex: 3 }}>
                            <h3>All GiftAways</h3>
                            <hr />
                            <ul style={{ listStyleType: "none" }}>
                                {unclaimedGiftaways.map((item) => {
                                    return (
                                        //ändern auf Elemente aus MongoDB...
                                        <li key={item._id}> <CardItems onClaimIt={handleClaimIt} id={item._id} logo={item.avatar} title={item.title} description={item.description} mail={item.mail} phone={item.phone} /></li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div style={{ flex: 2 }}>
                            <h3>Claimed GiftAways</h3>
                            <hr />
                            <ul style={{ listStyleType: "none" }}>
                                {claimedGiftaways.map((item) => {

                                    return (
                                        <li key={item._id} >  <ClaimedItems id={item._id} logo={item.avatar} title={item.title} mail={item.mail} phone={item.phone} /></li>)
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard