import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

const CategoryDropdown = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Select Category");

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get("http://localhost:4000/category");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        getCategories();
    }, []);

    const handleSelect = (eventKey) => {
        setSelectedCategory(eventKey);
        onCategorySelect(eventKey);
    };

    return (
        <Dropdown onSelect={handleSelect} style={{marginRight:"5px"}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedCategory}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Divider />
                {categories.map((category, index) => (
                    <Dropdown.Item key={index} eventKey={category.categoryname}>
                        {category.categoryname}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CategoryDropdown;
