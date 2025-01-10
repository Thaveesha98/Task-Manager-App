const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_MONGODB_URL)
    .then(() => {
        console.log('Connected to database successfully');
             
    }).catch((error) => {
        console.log('Error connecting to database:', error.message);
    })

    

