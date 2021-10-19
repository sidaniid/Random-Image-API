const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000;
const fs = require('fs');
const multer = require('multer');
const path = require('path')

let baseURL = 'http://localhost:3000';

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(cors());

app.get('/',async (req, res) => {
  res.render('index')
})

app.get('/api/cat', (req, res) => {

  let images = fs.readdirSync('./public/cat')
  let randomImage = images[Math.floor(Math.random() * images.length)]
  let url = baseURL+'/cat/'+randomImage;
   res.status(200).send({data: {status:200, image: url }})
})

app.get('/api/random', (req, res) => {

  let images = fs.readdirSync('./public/random')
  let randomImage = images[Math.floor(Math.random() * images.length)]
  let url = baseURL+'/random/'+randomImage;
   res.status(200).send({data: {status:200, image: url }})
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname+'/public/404.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.error('Failure to launch the server.');
    return;
  }
  console.log(`Listening on ${port}`);
});