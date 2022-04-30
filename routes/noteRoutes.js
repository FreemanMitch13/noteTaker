const router = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

router.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/notes', (req, res) => {
    console.log("Id: ", uuid)
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote={
        title,
        text,
        id: uuid()
      };
      readAndAppend(newNote, './db/db.json'); 
      return res.json('Your Note has been added');
    } else {
      return res.json('Error');
    }
  });
  
  router.delete('/notes/:id', (req, res) => {
      const Id = req.params.id;
      readFromFile('./db/db.json').then((data) => JSON.parse(data)).then((json) => {
          const result = json.filter((note) => note.id !==Id);
        writeToFile('./db/db.json', result);
        return res.json('Your Note has been deleted');
      });
  });


module.exports = router;