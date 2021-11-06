const mongoose = require('mongoose');

const db = "mongodb+srv://ChooLiWey:iicp001207070159@cluster0.rqhx5.mongodb.net/superheroMovie?retryWrites=true&w=majority";

mongoose
    .connect(db)
    .then(() => {
        console.log("Connected to database");
    }
    )
    .catch(() => {
        console.log("Error Connecting to database");
    }
    )

    const heroSchema = new mongoose.Schema({

        superhero: {type: String},
        fullname: {type: String},
        movieName: {type: String},
        movieDescription: {type: String},
        movieRating: {type: String}
    });
    
    
    const Record = mongoose.model('movies', heroSchema);
    
    module.exports = Record;