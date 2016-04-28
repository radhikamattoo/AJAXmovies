var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
// var req = new XMLHttpRequest();

router.get('/', function(req, res) {
  res.redirect('/movies');
});

router.get('/movies', function(req, res) {
  var movieFilter = {},
    searchExists = false;

  if(req.query.director) {
    movieFilter.director = req.query.director;
    searchExists = true;
  }

  Movie.find(movieFilter, function(err, movies, count) {
    res.render('movies', {'movies': movies, searchExists: searchExists, director: req.query.director });
  });
});


router.get('/api/movies', function(req, res){
  var requestObject = {};
  //filter  based on director if filled
  var director = req.query.director;
  if(director !== undefined && director !== ""){
    requestObject['director'] =  director;
  }
  //return movies as JSON
  Movie.find(requestObject, function(err, movies, count){
    var jsonMovies = {movies:movies};
    res.json(jsonMovies);
  });
});

router.post('/api/movies/create', function(req, res) {
  (new Movie({
      title: req.body.movieTitle,
      director: req.body.movieDirector,
      year: Number(req.body.movieYear)
  })).save(function(err, movies, count) {
    console.log(movies);
    var jsonMovie = {movies:movies};
    res.json(jsonMovie);
  });
});

// router.get('/movies/create', function(req, res) {
//   res.render('movies-create', {});
// });

module.exports = router;
