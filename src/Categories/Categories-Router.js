const xss = require('xss')
const express = require('express')
const path = require('path')
const CategoriesService = require('./Categories-Service')

const categoriesRouter = express.Router();
const jsonBodyParser = express.json();

const serializeCategory = category => ({
    category: category.unnest,
})

categoriesRouter
.route('/')
.get((req, res, next) =>{
    CategoriesService.getAllCategories(req.app.get('db'))
    .then(categories =>{
        //res.json(categories)
        //categories.map((category) => res.json(category.unnest))
        res.json(categories.map(serializeCategory))
    })
    .catch(next)
})
.post(jsonBodyParser, (req, res, next)=>{
    const {value} = req.body
    CategoriesService.insertNewCategory(req.app.get('db'), value)
    .then(category =>{
        res.status(201)
        .json(category)
    })
    .catch(next)
    
})

module.exports = categoriesRouter;