const note = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

note.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

note.post('/', (req, res) => {
    
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote={
        title,
        text,
        id: uuidv4()
      };
      readAndAppend(newNote, './db/db.json'); 
      res.json('Your Note has been added');
    } else {
      res.json('Error');
    }
  });
  
  note.delete('/:id', (req, res) => {
      const Id = req.params.id;
      readFromFile('./db/db.json').then((data) => JSON.parse(data)).then((json) => {
          const result = json.filter((note) => note.id !==Id);
        writeToFile('./db/db.json', result);
        res.json('Your Note has been deleted');
      });
  });


module.exports = note;