import React, { useEffect, useState } from 'react'
import CardItems from '../components/CardItems'
import ClaimedItems from '../components/ClaimedItems'
import ReceivedItems from '../components/ReceivedItems'
import CategoryDropdown from '../components/CategoryDropdown'
import Navbar from '../components/Navbar'
import LoginPopup from '../components/LoginPopup';
import axios from 'axios'



const Dashboard = () => {


    //claimed sind die items mit consumerID zusätzlich zur publisherId, unclaimed/all-gifts nur mit publisherId
    const [claimedGiftaways, setClaimedGiftaways] = useState([])
    const [unclaimedGiftaways, setUnclaimedGiftaways] = useState([])
    const [consumerId, setConsumerId] = useState(null)
    const [receivedGiftaways, setReceivedGiftaways] = useState([])

    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');


    const handleCategorySelect = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    const handleSearch = async (event) => {
        event.preventDefault();

        const categoryQuery = selectedCategory !== "All" ? `category=${selectedCategory}` : '';
        const searchQueryPart = searchQuery ? `searchQuery=${searchQuery}` : '';

        const url = `http://localhost:4000/dashboard?${categoryQuery}&${searchQueryPart}`.replace(/&+/g, '&').replace(/\?&/, '?');

        try {
            const response = await axios.get(url);
            setClaimedGiftaways(response.data.claimedGiftaways);
            setUnclaimedGiftaways(response.data.unclaimedGiftaways);
        } catch (error) {
            console.error("Error fetching filtered data:", error);
        }
    };

    const handleReset = async () => {
        setSelectedCategory('');
        setSearchQuery('');
        loadGiftaways(); // Eine Funktion, um die Daten neu zu laden
    };

    const loadGiftaways = async () => {
        try {
            const response = await axios.get('http://localhost:4000/dashboard', {
                withCredentials: true
            });
            console.log(response.data); // Zum Debuggen
            setClaimedGiftaways(response.data.claimedGiftaways);
            setUnclaimedGiftaways(response.data.unclaimedGiftaways);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        loadGiftaways();
    }, []);

    //claim funktion damit es auch automatisch aktualisiert wird im frontend wenn man claimt, und fügt eine consumerId hinzu
    //zeigt dann nur die contactinformation an
    const handleClaimIt = async (id, consumer_id) => {
        try {
            const res = await axios.post("http://localhost:4000/dashboard/getuser", { id: consumer_id }, {

                withCredentials: true
            })
            const phone = res.data.phone
            const mail = res.data.mail
            const claimedItem = unclaimedGiftaways.find(item => item._id == id)

            //automatische änderung im frontend
            if (claimedItem) {
                setUnclaimedGiftaways(prev => prev.filter(item => item._id != id))
                setClaimedGiftaways(prev => [...prev, { ...claimedItem, phone, mail }])
            }

        }

        catch (err) {
            if (err.response && err.response.status === 404) {
                handleLoginPopup();
            }
            else {
                console.error('An unexpected error occurred: ', err);
            }
        }
    }

    const handleUnclaimIt = (id) => {

        const unclaimedItems = claimedGiftaways.find(item => item._id == id)

        if (unclaimedItems) {
            setClaimedGiftaways(prev => prev.filter(item => item._id != id))
            setUnclaimedGiftaways(prev => [...prev, unclaimedItems])
        }

    }

    //get request für die ganze dashboard
    useEffect(() => {
        axios.get('http://localhost:4000/dashboard', {

            withCredentials: true

        })
            .then((res) => {
                const claimedGiftaways = res.data.claimedGiftaways
                const unclaimedGiftaways = res.data.unclaimedGiftaways
                const receivedGiftaways = res.data.receivedGiftaways


                setClaimedGiftaways(claimedGiftaways)
                setUnclaimedGiftaways(unclaimedGiftaways)
                setReceivedGiftaways(receivedGiftaways)                
                console.log(unclaimedGiftaways, claimedGiftaways) //, receivedGiftaways

            })

            .catch(err => console.log(err))

    }, []);

    const addConsumerId = () => {

    }

    const removeConsumerId = () => {


    }

    const handleLoginPopup = () => {
        setShowLoginPopup(true);
    }

    const closeLoginPopup = () => {
        setShowLoginPopup(false);
    }

    return (
        <>
            {showLoginPopup && <LoginPopup onClose={closeLoginPopup} />}
            {/* <Navbar /> */}
            <div className="dashboardWrapper" style={{ padding: "5px", paddingTop: "2rem" }}>
                <div className="text-center" style={{ height: "90vh" }}>
                    <div >
                    </div>
                    <div style={{ flexDirection: "row", display: "flex" }}>

                        <div style={{ flex: 3 }}>
                            <h3>All GiftAways</h3>
                            <hr />
                            <form className="d-flex" role="search" style={{ alignContent: "center", marginBottom: "20px" }} onSubmit={handleSearch}>
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: "15rem" }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                <CategoryDropdown onCategorySelect={handleCategorySelect} />
                                <button className="btn btn-outline-success" type="submit" style={{ marginRight: "5px" }}>Search</button>
                                <button className="btn btn-outline-success" onClick={handleReset}>Show all</button>
                            </form>

                            <ul style={{ listStyleType: "none" }}>
                                {unclaimedGiftaways.map((item) => {
                                    return (
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
                        <div style={{ flex: 1 }}>
                            <h3>Received GiftAways</h3>
                            <hr />
                            <ul style={{ listStyleType: "none" }}>
                                {receivedGiftaways.map((item) => {
                                    return (
                                        <li key={item._id}> <ReceivedItems id={item._id} logo={item.avatar} title={item.title} description={item.description} mail={item.mail} phone={item.phone} /></li>
                                    )
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