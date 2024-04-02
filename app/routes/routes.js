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
router.post('/assessments', passport.authenticate('jwt', {session: false}), UserController.createAssessment)
router.post('/questions/:mentorId/:assessmentId', passport.authenticate('jwt', {session: false}), UserController.createQuestions)
router.post('/answers', passport.authenticate('jwt', {session: false}), UserController.submitAnswer)
router.post('/sendInvite', passport.authenticate('jwt', {session: false}), UserController.sendInvite)
router.post('/acceptInvitation/:inviteId', passport.authenticate('jwt', {session: false}), UserController.respondToInvite)

router.get('/notifications/:studentId', passport.authenticate('jwt', { session: false }), UserController.getNotification)
router.get('/student/:studentId', passport.authenticate('jwt', {session: false}), UserController.getAssessmentDetails);
router.get('/studentInfo/:studentId', passport.authenticate('jwt', {session: false}), UserController.getStudentInfo);
router.get('/mentorInfo/:mentorId', passport.authenticate('jwt', {session: false}), UserController.getMentorInfo);
router.get('/questions/:assessmentId', passport.authenticate('jwt', {session: false}), UserController.getAssessmentQuestions)
router.get('/grades/:studentId/', passport.authenticate('jwt', {session: false}), UserController.getStudentGrades)
router.get('/students', passport.authenticate('jwt', {session: false}), UserController.getAllStudents)
router.get('/assessments/:mentorId', passport.authenticate('jwt', {session: false}), UserController.getAssessmentByMentor)
router.get('/allgrades/:mentorId', passport.authenticate('jwt', {session: false}), UserController.getGradesByMentor)






module.exports = {router}