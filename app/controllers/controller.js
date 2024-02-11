const db = require('../models')
const { Op } = require('sequelize')
const bcrypt = require('bcrypt') //install lib
const jwt = require('jsonwebtoken') //install lib

const Student = db.Student
const Mentor = db.Mentor
const Assessment = db.Assessment
const Question = db.Question
const Answers = db.Answer
const Grade = db.Grade
const Feedback = db.Feedback
const Invite = db.Invite
const Notification = db.Notification

const sendNotification = async (studentId, details) => {
    // Assuming you have a notification service or function to send the notification
    // In this example, we'll use console.log as a simple messaging service
    try {
        const message = `New ${details.type} received: ${details.assessmentName}`;
        console.log(`Sending message to student ${studentId}: ${message}`);
        // In a real scenario, you would call a messaging or push notification service here
        // Example: notificationService.send(studentId, message);

        return true; // Success
    } catch (error) {
        console.error(`Error sending notification to student ${studentId}:`, error);
        return false; // Failure
    }
};


const UserController = {
    createMentor: async (req, res) => {
        try {
            const { name, email, password } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)

            const newMentor = await Mentor.create({ name, email, password: hashedPassword })
            return res.status(201).json({newMentor})
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error'})
        }
    },
    createStudent: async (req, res) => {
        try {
            const { name, email, password } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)

            const newStudent = await Student.create({ name, email, password: hashedPassword })
            return res.status(201).json(newStudent)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error'})
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } =  req.body;

            const mentorUser = await Mentor.findOne({ where: { email }});
            const studentUser = await Student.findOne({ where: { email }})
            if (!mentorUser && !studentUser) {
                return res.status(401).json({ error: 'Invalid email or password'})
            }
            const user = mentorUser || studentUser

            // compare passwords
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid email or password'})
            }

            const role = mentorUser ? 'mentor' : 'student'

            const token = jwt.sign({ userId: user.id, role}, process.env.SECRET_KEY, { expiresIn: '1hr'})
            return res.status(200).json({ user: { id: user.id, name: user.name, email: user.email, role }, token})
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error'})
        }
    },
    createAssessment: async (req, res) => {
        try {
            const { title, description, mentorId } = req.body;

            const newAssessment = await Assessment.create({ title, description, mentorId })
            newAssessment.questions = []

            return res.status(201).json(newAssessment)
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server error'})
        }
    },
    createQuestions: async (req, res) => {
        try {
            const { title, choice1, choice2, choice3, choice4, correctChoice } = req.body
            const { mentorId, assessmentId } = req.params;

            const assessment = await Assessment.findByPk(assessmentId)
            if (!assessment) {
                return res.status(404).json({ error: 'Assessment not found'})
            }

            const newQuestions = await Question.create({ title, choice1, choice2, choice3, choice4, correctChoice, mentorId, assessmentId })

            newQuestions.assessmentId = assessmentId;
            await newQuestions.save();

            res.status(201).json(newQuestions)
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error'})
        }
    },
    createAnswers: async (req, res) => {
        try {
            const { chosenAnswer,  studentId, questionId, assessmentId } = req.body;
            const newAnswers = await Answers.create({ chosenAnswer, studentId, questionId, assessmentId  })
            res.status(201).json(newAnswers)
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error'})
        }
    },
    submitAnswer: async (req, res) => {
        try {
            const { studentId, assessmentId, answers } = req.body;

            // validate if assessment and student exists
            const assessment = await Assessment.findByPk(assessmentId)
            const student = await Student.findByPk(studentId)

            if (!assessment || !student) {
                return res.status(404).json({ error: 'Assessment or student not found'})
            }

            const questions = await Question.findAll({
                where: { assessmentId }
            })

            if (!questions || questions.length === 0) {
                return res.status(404).json({ error: 'Assessment has no questions'})
            }

            // validates if number of answers matches number of questions 
            if (answers.length !== questions.length) {
                return res.status(400).json({ error: 'Invalid number of answers submitted'})
            }

            // Calculate the grade
            let correctAnswers = 0;

            for (let i = 0; i < questions.length; i++) {
                const question = questions[i];
                const submittedAnswer = answers[i];

                // Check if the submitted answer is correct
                if (question.correctChoice === submittedAnswer) {
                correctAnswers++;
                }

                // Save the answer to the database
                await Answers.create({
                chosenAnswer: submittedAnswer,
                studentId,
                questionId: question.id,
                assessmentId,
                })};
            // calculate percentage
            const percentage = (correctAnswers / questions.length) * 100;

            // Save the grade to the database
            const grade = await Grade.create({
                studentId,
                assessmentId,
                grade: percentage,
            });

            return res.status(200).json({ grade });
        } catch (error) {
            console.log(err);
            return res.status(500).json({error: "Error submitting assessment" })
        }
    },
    sendInvite: async (req, res) => {
        try {
            const { mentorId, studentId, assessmentId } = req.body;
    
            const mentor = await Mentor.findByPk(mentorId);
            const student = await Student.findByPk(studentId);
            const assessment = await Assessment.findByPk(assessmentId);
    
            if (!mentor || !student || !assessment) {
                return res.status(404).json({ error: 'Mentor, student, or assessment not found' });
            }
    
            const newInvite = await Invite.create({
                mentorId, studentId, assessmentId
            });
    
            // Add notification details
            const notificationDetails = {
                type: 'invite',
                assessmentName: assessment.title
            };
    
            // Call a function to send the notification to the student
            sendNotification(studentId, notificationDetails);
    
            return res.status(201).json({ newInvite });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getNotification: async (req, res) => {
        try {
            const { studentId } = req.params;
    
            // Find invites associated with the student
            const invites = await Invite.findAll({
                where: {
                    studentId,
                    status: 'pending', // You can modify this based on your requirements
                },
                include: [
                    {
                        model: Assessment,
                        as: 'assessments',
                        attributes: ['title'], // Only include the assessment title in the result
                    },
                ],
            });
    
            // Extract assessment names from the invites
            const assessmentNames = invites.map(invite => invite.assessments.title);
    
            return res.status(200).json({ assessmentNames });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    respondToInvite: async (req, res) => {
        try {
            const { inviteId, response } = req.body;

            // find the invite
            const invite = await Invite.findByPk(inviteId)
            if (!invite) {
                return res.status(404).json({ error: 'Invite not found'})
            }
            invite.status = response;
            await invite.save();

            return res.status(200).json({ invite })
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error'})
        }
    }
}

module.exports = {UserController}

// getNotification: async (req, res) => {
//     try {
//         const { studentId } = req.params;

//         const invites = await Invite.findAll({
//             where: { studentId },
//             include: [
//                 { model: Assessment, as: 'assessments', required: true } // Include assessment details
//             ]
//         });

//         const notifications = invites.map(invite => ({
//             id: invite.id,
//             type: 'invite',
//             assessmentName: invite.assessment.title, // Access assessment name
//             status: invite.status,
//             mentorId: invite.mentorId,
//             createdAt: invite.createdAt
//         }));

//         res.status(200).json(notifications);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }