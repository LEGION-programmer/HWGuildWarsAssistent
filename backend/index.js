const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routs = require('./api/routs')
const port = process.env.PORT || 3000
const app = express()

// parsers
app.use(bodyParser.text())
app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// deafult cors
app.use(cors());

require('./db/connect')

// api
app.use('/', routs)

// server
app.listen(port, ()=>{
    console.log(`Server working on: localhost:${port}`)
})