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

    // State variables for editing
    const [editMode, setEditMode] = useState(false);
    const [editItemId, setEditItemId] = useState(null);

    // State variables for editing form
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editImage, setEditImage] = useState(null);

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
        })
        .then((res) => {
            console.log(res)
            setMyGiftaways(prevGiftaways => [...prevGiftaways, res.data.createdGiftaway]);
        })
        .catch(err => console.log("Giftaway creation error", err))
    }

    //wird getriggert wenn man auf den delete button klickt und aktualisiert automatisch im frontend
    const handleDelete = (id) => {
        setMyGiftaways(prevGiftaways => prevGiftaways.filter(item => item._id !== id));
    };

    // ------------ TO DO 

    // Function to handle submit edit form
    const submitEditGiftAway = (e) => {
        e.preventDefault();

        const image = editImage || myGiftaways.find((item) => item._id === editItemId).avatar;
        //const image = e.target.elements.avatar.files[0];

        const formData = new FormData();

        formData.append('title', editTitle);
        formData.append('description', editDescription);
        formData.append('categoryName', editCategory);
        formData.append('image', image);

        axios
            .patch(`http://localhost:4000/giftaway/${editItemId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })
            .then((res) => {
                // Update the edited item in the state
                setMyGiftaways((prevGiftaways) =>
                    prevGiftaways.map((item) => (item._id === editItemId ? res.data.updatedGiftaway : item))
                );
                handleCancelEdit(); // Reset the edit mode and form data
            })
            .catch((err) => console.log('Giftaway edit error', err));
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    // Function to handle edit button click
    const handleEdit = (id, title, description, category, image) => {
        setEditMode(true);
        setEditItemId(id);
        setEditTitle(title);
        setEditDescription(description);
        setEditCategory(category);
        // You may need to handle the image differently, e.g., using a separate file input for editing.
    };

    // Function to handle cancel editing
    const handleCancelEdit = () => {
        setEditMode(false);
        setEditItemId(null);
        setEditTitle('');
        setEditDescription('');
        setEditCategory('');
        setEditImage(null);
    };

    // ------------ TO DO 
    // const handleRetrieved = (id) => {

    // };

    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100% " }}>
            <div style={{ display: "flex", height: "100vh", alignContent: "center", justifyContent: "center", width: "50%", flex: 1 }}>
                <div style={{ height: "50%", width: "70%", marginTop: "5rem", border: "2px", borderColor: "black", backgroundColor: "wheat", padding: "2rem", borderRadius: "2rem" }}>
                    
                {editMode ? (
                    <form onSubmit={submitEditGiftAway}>
                        {/* Similar form fields as the create form, but pre-filled with existing data */}
                        <div className="mb-3">
                        <label htmlFor="edit-avatar" className="form-label">
                            Avatar
                        </label>
                        <input type="file" id="edit-avatar" accept="image/*" onChange={(e) => setEditImage(e.target.files[0])} />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="edit-title" className="form-label">
                            Title
                        </label>
                        <input type="text" className="form-control" id="edit-title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="edit-description" className="form-label">
                            Description
                        </label>
                        <input type="text" className="form-control" id="edit-description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="edit-category" className="form-label">
                            Category
                        </label>
                        <input type="text" className="form-control" id="edit-category" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} required />
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg" style={{ marginLeft: '40%', marginTop: '20px' }}>
                        Save Changes
                        </button>
                        <button type="button" className="btn btn-danger btn-lg" style={{ marginLeft: '20px', marginTop: '20px' }} onClick={handleCancelEdit}>
                        Cancel
                        </button>
                    </form>
                ) : (
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
                )}
                </div>
            </div>
            <div style={{ width: "50%", flex: 1, backgroundColor: "wheat" }}>
                <ul style={{ listStyleType: "none" }}>
                    {myGiftaways.map((item) => {
                        return (
                            <li key={item._id}><ManageItems id={item._id} logo={item.avatar} title={item.title} description={item.description} onDelete={handleDelete} onEdit={handleEdit} ></ManageItems></li> //onRetrieved={handleRetrieved}
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default GiftAway