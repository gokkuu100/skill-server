const express = require('express')
const router = express.Router();
const { UserController } = require('../controllers/controller')
require("dotenv").config()

const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

// Configure Passport JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY, 
  };
  
  passport.use(new jwtStrategy(jwtOptions, (jwtPayload, done) => {
    return done(null, { userId: jwtPayload.userId });
  }));
  


router.post( '/registerMentor', UserController.createMentor )
router.post('/registerStudent', UserController.createStudent)
router.post('/login', UserController.login)
router.post('/assessments', UserController.createAssessment)
router.post('/questions/:mentorId/:assessmentId', UserController.createQuestions)
router.post('/answers', UserController.submitAnswer)
router.post('/sendInvite', UserController.sendInvite)
router.post('/acceptInvitation/:inviteId',UserController.respondToInvite)

router.get('/notifications/:studentId', passport.authenticate('jwt', { session: false }) ,UserController.getNotification)
router.get('/student/:studentId', UserController.getAssessmentDetails);


module.exports = {router}