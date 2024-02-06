const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config();

app.use(cors())

const db = require('./app/models')
db.sequelize.sync().then(() => {
    console.log("Database synced successfully");
})

app.get('/', (req, res) => {
    res.send('Hello')
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})