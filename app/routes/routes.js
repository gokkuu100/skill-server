const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const { UserController } = require('../controllers/controller')
require("dotenv").config()

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized'})
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403).json({ message: 'Forbidden'})
        } else {
            req.user = user;
            next()
        }
    })
}

router.post( '/registerMentor', UserController.createMentor )
router.post('/registerStudent', UserController.createStudent)
router.post('/login', UserController.login)

module.exports = {router}