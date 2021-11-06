const axios = require('axios');
const express = require('express');
const app = express();
const Record = require('./connect1');
const ejs = require('ejs');
app.set('view engine', 'ejs');
const port = Process.env.PORT || 5000 ;

const superheroApi = '4089438887820246';

var superhero, fullname, movieName, movieDescription, movieRating;

app.get('/', (req,res) => {
    Record.find({}, function(err, movies){
        res.render('index',{
            moviesList : movies
        });
    })
})

app.get('/getMovie', (req, res) =>{
   
    const hero = req.query.superheroName;
    const superheroLink = `https://superheroapi.com/api/${superheroApi}/search/${hero}`;

    axios.get(superheroLink).then( (response) =>{
        superhero =  response.data.results[0].name;
        fullname =  response.data.results[0].biography['full-name'];
        
        const movieApi = 'k_71acpmt9';
        const superheroName = response.data.results[0].name;
        const movieNameLink = `https://imdb-api.com/en/API/SearchTitle/${movieApi}/${hero}`;
    
        axios.get(movieNameLink).then( (response) =>{
            movieName = response.data.results[0].title;
            movieDescription = response.data.results[0].description;
    
            const movieID = response.data.results[0].id;
            const movieRatingLink = `https://imdb-api.com/en/API/Ratings/${movieApi}/${movieID}`;
    
            axios.get(movieRatingLink).then( (response) =>{
    
                movieRating = response.data.imDb;
                
                filmValue = new Record ({
    
                    superhero: superhero,
                    fullname: fullname,
                    movieName: movieName,
                    movieDescription: movieDescription,
                    movieRating: movieRating
                        
                });
                
                filmValue.save()   
                    
                    .then((result) => {
                    console.log("Success" + result);
                    
                    })
                
                    .catch((error) => {
                    console.log("Error" + error);
                    });

                res.redirect(req.get('referer'));
                    
            });//close axios movieratinglink

        });//close axios movienamelink
    
    });//close axios superherolink

});//close get movie

app.get('/editMovie', (req, res) =>{
    
    const superhero = req.query.superheroName;
    const rating = req.query.rating;

    Record.updateOne({superhero: `${superhero}`}, {movieRating: `${rating}`}, function(err, res){
        
        if (err) return handleError(err);
        console.log("Success");
    });

    res.redirect(req.get('referer'));
});//close editmovie

app.get('/deleteMovie', (req, res) =>{

    const hero2 = req.query.title;
    Record.deleteOne({_id: `${hero2}`}, function(err){
        
        if (err) return handleError(err);
        console.log("Success");
    });
    
    res.redirect(req.get('referer'));
});//close deletemovie

app.listen(port, ()=>{

console.log('Server listening to port 5000');

});//close close listen

