const fs = require('fs');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
// const database = require('./db/db.json');
const apiRoute = require('./routes/apiRoutes');
const htmlRoute = require('./routes/htmlRoutes');

// links the access, dont have to make separete routes
app.use(express.static('public'));

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoute);
app.use('/', htmlRoute);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});