const mongoose = require('mongoose');

const Celebrity = require('../models/celebrity');

const dbname = 'lab-mongoose-movies';

mongoose.connect(`mongodb://localhost/${dbname}`);

const celebrities = [
    {
        name : 'Lionel MESSI',
        occupation : 'athlete',
        catchphrase : 'Je marque des but comme je respires'
    },
    {
        name : 'Lebron JAMES',
        occupation : 'athlete',
        catchphrase : 'jump and dunk'
    },
    {
        name : 'Spike LEE',
        occupation : 'actor',
        catchphrase : 'like nike spizike'
    }
];

Celebrity.create(celebrities)
    .then(celebrities => {
        console.log(`You have created those celebrities ${celebrities}`);
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(`You have an error ${error}`)
    })