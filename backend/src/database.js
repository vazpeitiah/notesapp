const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://localhost/notesapp';

mongoose.connect(URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: 
  true, useFindAndModify: false, 
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('data base is connected');
});