const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config();
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello')
})