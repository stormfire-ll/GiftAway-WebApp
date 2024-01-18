import React, { useEffect, useState } from 'react'
import CardItems from '../components/CardItems'
import ClaimedItems from '../components/ClaimedItems'
import Navbar from '../components/Navbar'
import axios from 'axios'



const Dashboard = () => {

    const [claimedGiftaways, setClaimedGiftaways] = useState([])
    const [unclaimedGiftaways, setUnclaimedGiftaways] = useState([])
    const [consumerId, setConsumerId] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:4000/dashboard', {

            withCredentials: true

        })
            .then((res) => {
                const claimedGiftaways = res.data.claimedGiftaways
                const unclaimedGiftaways = res.data.unclaimedGiftaways

                setClaimedGiftaways(claimedGiftaways)
                setUnclaimedGiftaways(unclaimedGiftaways)
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
                                        <li key={item._id}> <CardItems id={item._id} logo={item.avatar} title={item.title} description={item.description} /></li>
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