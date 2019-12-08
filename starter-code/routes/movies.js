const express = require('express');
const router =  express.Router();
const Celebrity = require('../models/celebrity')
const Movie = require('../models/movie.js')


router.get('/' , (req , res , next) => {
    Movie.find()
    .then(allMovies => {
        console.log(`The list of movies is ${allMovies}`)
        res.render('movies/index' , {allMovies})
    })
    .catch(error => {
        next(error)
    })
})

router.get('/new' , (req , res , next) => {
    Celebrity.find()
    .then(actors => {
        res.render('movies/new' , {actors})
    })
    .catch(error => {
        next(error)
    })
})

router.post('/' , (req , res , next) => {
    Movie.create({
        title : req.body.title,
        genre : req.body.genre,
        plot : req.body.plot,
        cast : req.body.cast
    })
    .then(createdmovie => {
        console.log(`The movie ${createdmovie} has been created`)
        res.redirect('/movies')
    })
    .catch(error => {
        next(error)
    })
})

router.get('/:id' , (req , res , next) => {
    Movie.findById(req.params.id)
        .then(movie => {
            res.render('movies/show' , {movie})
        })
        .catch(error => {
            next(error)
        })
})

router.post('/:id/delete' , (req , res , next) => {
    Movie.findByIdAndRemove(req.params.id)
        .then(deletedMovie => {
            res.redirect('/movies')
        })
        .catch(error => {
            next(error)
        })
})

router.get('/:id/edit' , (req , res , next) => {
    Movie.findById(req.params.id)
        .then(movie => {
            res.render('movies/edit' , {movie})
        })
        .catch(error => {
            next(error)
        })
})

router.post('/:id' , (req , res , next) => {
    Movie.update({_id: req.params.id},{
        title : req.body.title,
        genre : req.body.genre,
        plot : req.body.plot,
        cast : req.body.cast
    } , { new: true })
    .then(movie => {
        res.redirect('/movies/'+ req.params.id)
    })
    .catch(error => {
        next(error)
    })
})





module.exports = router;