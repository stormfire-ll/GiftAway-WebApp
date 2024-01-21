import React, { useEffect, useState } from 'react'
import axios from "axios"
import CardItems from '../components/CardItems'
import ManageItems from '../components/ManageItems'
import CategoryDropdown from '../components/CategoryDropdown';



const GiftAway = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const [category, setCategory] = useState("")
    const [myGiftaways, setMyGiftaways] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("");



    //für giftaway route get request um sich nur deine erstellen items anzuzeigen
    useEffect(() => {
        axios.get('http://localhost:4000/giftaway', {

            withCredentials: true

        })
            .then((res) => {
                const myGiftaways = res.data.giftaways
                setMyGiftaways(myGiftaways)
            })

            .catch(err => console.log(err))
    }, []);

    //funktion für den gesamten upload eines items in die datenbank, wird getriggert sobald man auf den button klickt

    const clearFormFields = () => {
        setTitle("");
        setDescription("");
        setSelectedImage(null);
        setSelectedCategory("");
    };

    const submitGiftAway = (e) => {
        e.preventDefault();

        const image = e.target.elements.avatar.files[0];

        const formData = new FormData()


        formData.append("title", title)
        formData.append("description", description)
        // formData.append("categoryName", category)
        formData.append("categoryName", selectedCategory);
        formData.append("image", image)

        console.log(formData)

        axios.post("http://localhost:4000/giftaway",
            formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true
        }

        )

        .then((res) => {
            console.log(res)
            setMyGiftaways(prevGiftaways => [...prevGiftaways, res.data.createdGiftaway]);

            // Clear form fields after successful submission
            clearFormFields();
        })
        .catch(err => console.log("Giftaway creation error", err))
    }

    //wird getriggert wenn man auf den delete button klickt und aktualisiert automatisch im frontend
    const handleDelete = (id) => {
        setMyGiftaways(prevGiftaways => prevGiftaways.filter(item => item._id !== id));
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };




    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100% " }}>

            <div style={{ display: "flex", height: "100vh", alignContent: "center", justifyContent: "center", width: "50%", flex: 1 }}>
                <div style={{ height: "50%", width: "70%", marginTop: "5rem", border: "2px", borderColor: "black", backgroundColor: "wheat", padding: "2rem", borderRadius: "2rem" }}>
                    <form onSubmit={submitGiftAway}>

                        <div className="mb-3">
                            <label htmlFor="avatar" className="form-label">Avatar</label>
                            <input type="file" id="avatar" accept="image/*" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" value={description} onChange={e => setDescription(e.target.value)} required />
                        </div>
                        {/*   <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <input type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                        </div> */}

                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <CategoryDropdown onCategorySelect={handleCategorySelect} />
                        </div>



                        <button type="submit" className="btn btn-primary btn-lg" style={{ marginLeft: "40%", marginTop: "20px" }}>Submit</button>
                    </form>
                </div>
            </div>
            <div style={{ width: "50%", flex: 1, backgroundColor: "wheat" }}>
                <ul style={{ listStyleType: "none" }}>
                    {myGiftaways.map((item) => {
                        return (
                            <li key={item._id}><ManageItems id={item._id} logo={item.avatar} title={item.title} description={item.description} onDelete={handleDelete} ></ManageItems></li>
                        )
                    })
                    }
                </ul>
            </div>
        </div>
    )
}

export default GiftAway