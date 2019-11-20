const xss = require('xss')
const express = require('express')
const path = require('path')
const FlyersService = require('./Flyers-Service')
const atob = require('atob')

const flyersRouter = express.Router()
const jsonBodyParser = express.json({limit: '50MB'})

const serializeFlyers = flyer => ({
    id: flyer.id,
    title: xss(flyer.title),
    image: atob(flyer.flyerimage.toString('base64')),
    location: xss(flyer.eventlocation),
    eventstartdate: flyer.eventstartdate,
    eventenddate: flyer.eventenddate,
    actiondate: flyer.actiondate,
    action: xss(flyer.flyeraction),
    category: flyer.flyercategory,
    
})


flyersRouter
    .route('/')
    .get((req,res, next) => {
        FlyersService.getAllFlyers(req.app.get('db'))
        .then(flyer =>{
            res.json(flyer.map(serializeFlyers))
        })
        .catch(next)
    })
    .post(jsonBodyParser, (req, res, next) => {
        const {title, flyerimage, eventstartdate, eventenddate, eventlocation, flyeraction, actiondate, flyercategory} = req.body
        const newFlyer = {title, flyerimage, eventstartdate, eventenddate, eventlocation, flyeraction, actiondate, flyercategory}
        const requiredFields = {title, flyerimage, eventstartdate, eventenddate, eventlocation}
        
       for (const [key, value] of Object.entries(requiredFields))
        if(value == null){
            return res.status(400)
            .json({
                error: {
                    message: `Missing the ${key} in the request body`
                }
            })
        }
        
        FlyersService.insertFlyer(req.app.get('db'), newFlyer)
        .then(flyer =>{
            res.status(201)
            .location(path.posix.join(req.originalUrl, `/${flyer.id}`))
            .json(serializeFlyers(flyer))
        })
        .catch(next)
    })

    flyersRouter
    .route('/:id')
    .all((req, res, next) =>{
        const {id} = req.params
        FlyersService.getFlyerbyId(req.app.get('db'), id)
        .then(flyer =>{
            if(!flyer){
                return res.status(404)
                .json({
                    error: {message: 
                    'Flyer does not exist'}
                })
            }
            res.flyer = flyer
            
            next()
        })
        .catch(next)

    })
    .get((req, res, next)=>{
        res.json(serializeFlyers(res.flyer))
    })
    .delete((req, res, next)=>{
        
        FlyersService.deleteFlyer(req.app.get('db'),req.params.id)
        .then(()=>{
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonBodyParser, (req, res, next)=>{
        const {title, flyerimage, eventstartdate, eventenddate, flyerlocation, flyeraction, actiondate, flyercategory} = req.body
        
        const fieldsToUpdate = {title, flyerimage, eventstartdate, eventenddate, flyerlocation, flyeraction, actiondate, flyercategory}

        const numberOfValues = Object.values(fieldsToUpdate).filter(Boolean).length
        
        if(numberOfValues === 0){
            return res.status(400).json({
                error: {message: `Request body must contain either 'name', 'content', or 'folderId'`}
            })
        }

        FlyersService.updateFlyer(req.app.get('db'), req.params.id, fieldsToUpdate)
        .then((result)=>{
            res.status(204).end()
            .json(serializeFlyers(flyer))
        })
        .catch(next)

    })

    flyersRouter
    .route('/user/:userid')
    .get((req, res, next) =>{
        const userId = req.params.userid
        
        FlyersService.getAllFlyersByUserId(req.app.get('db'), userId)
        .then((flyers)=>{
            res.json(flyers.map(serializeFlyers))
        })
        .catch(next)
    })


module.exports = flyersRouter