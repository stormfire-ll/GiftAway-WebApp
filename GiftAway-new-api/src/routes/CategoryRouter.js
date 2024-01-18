const express = require('express');
const Category = require('../db/category.model')

const categoryRouter = express.Router();

categoryRouter.post('/', async (req,res ) => {
    const {name} = req.body

const categoryPresent = await Category.findOne({name})

if(!categoryPresent) {
const newCategory = await Category.create({
    categoryname: name

}) 
res.status(201).json('Category created successfully')
}
else{
res.status(200).json('Category already present')
}
})

module.exports = categoryRouter