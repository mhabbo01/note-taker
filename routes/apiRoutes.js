const router = require('express').Router();
const fs =  require('fs');

router.get('/notes', function (req, res) {
    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        if (err) throw err;

        res.json(JSON.parse(data));
    });
});


    
router.post('/notes/', (req, res) => {
        
        fs.readFile('./db/db.json', 'utf8', function(err, data) {
            if (err) throw err;
            let newNote = JSON.parse(data);
            let newNoteId = req.body;
            newNoteId.id = Math.floor(Math.random() * 5000);
            newNote.push(req.body);

            fs.writeFile('./db/db.json', JSON.stringify(newNote), function (err) {
                if (err) return err;
                res.json(newNoteId);
                console.log('New note saved!');
            });
        });
        
    });


router.delete('/notes/:id', (req, res) => {
    let id = req.params.id;
    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        if (err) throw err;
        let notes = JSON.parse(data);
        const newNotes = notes.filter(note => note.id !== parseInt(req.params.id));

        fs.writeFile('./db/db.json', JSON.stringify(newNotes), function (err) {
            if (err) throw err;
            res.json({msg: 'deletion successful'})
        });
           

    });
    
});

module.exports = router;