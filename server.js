const fs = require('fs');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const database = require('./db/db.json');

// links the access, dont have to make separete routes
app.use(express.static('public'));

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html')); //wildcard to return index.html
});

app.route('/api/notes')
    .get((req, res) => {
        res.json(database);
    })
    .post((req, res) => {
        let jsonPath = path.join(__dirname, '/db/db.json');
        let newNote = req.body;

        let highId = 99;
        for (let i = 0; i < database.length; i++) {
            let singleNote = database[i];
            if (singleNote.id > highId) {
                highId = singleNote.id;
            }
        }
        newNote.id = highId + 1;
        database.push(newNote)

        fs.writeFile(jsonPath, JSON.stringify(database), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('New note saved!');
        });
        res.json(newNote);
    });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});