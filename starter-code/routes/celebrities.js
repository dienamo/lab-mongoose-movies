const express = require('express');
const router =  express.Router();

const Celebrity = require('../models/celebrity')

router.get('/' , (req , res , next) => {
    Celebrity.find()
    .then(allCelebrities => {
        console.log(`Celebrities founds are ${allCelebrities}`);
        res.render('celebrities/index' , {allCelebrities})
    })
    .catch(error => {
        console.log(`an error occured : ${error}`)
    })
})

router.get('/new' , (req , res , next) => {
    res.render('celebrities/new')
})

router.post('/new' , (req , res, next) => {
    Celebrity.create({
        name : req.body.name,
        occupation : req.body.occupation,
        catchphrase : req.body.catchphrase
    })
    .then(createdCelebrity => {
        res.redirect('/celebrities')
    })
    .catch(error => {
        res.render('celebrities/new')
    })
})

router.get('/:id' , (req , res , next) => {
    Celebrity.findById(req.params.id)
    .then(celebrity => {
        res.render('celebrities/show' , {celebrity})
    })
    .catch(error => {
        next(error);
    })
})

router.post('/:id/delete' , (req , res , next) => {
    Celebrity.findByIdAndRemove(req.params.id)
    .then(deletedCelebrity =>{
        res.redirect('/celebrities')
        console.log(`The celebrity ${deletedCelebrity.name} has been deleted!`)
    })
    .catch(error =>{
        console.log(error)
    })
})

router.get('/:id/edit' , (req , res , next) => {
    Celebrity.findById(req.params.id)
    .then(celebrity =>{
        res.render('celebrities/edit' , {celebrity})
    })
    .catch(error => {
        console.log(error)
    })
})

router.post('/:id' , (req , res , next) => {
        Celebrity.update({_id: req.params.id},{
            name: req.body.name,
            occupation: req.body.occupation,
            catchphrase : req.body.catchphrase
        })
        .then(celebrity => {
            console.log(`The celebrity ${celebrity} has been updated`)
            res.redirect('/celebrities')
        })
        .catch(error => {
            next(error)
        })
})

module.exports = router;