// const { Sequelize, DataTypes } = require('sequelize')

// const Mentor = sequelize.define('Mentor', {
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//   });
  
//   const Assessment = sequelize.define('Assessment', {
//     title: DataTypes.STRING,
//     description: DataTypes.STRING,
//     time_limit: DataTypes.STRING,
//   });
  
//   const Assignment = sequelize.define('Assignment', {
//     is_accepted: DataTypes.BOOLEAN,
//   });
  
//   const Invite = sequelize.define('Invite', {
//     is_accepted: DataTypes.BOOLEAN,
//   });
  
//   const Question = sequelize.define('Question', {
//     title: DataTypes.STRING,
//     options: DataTypes.STRING,
//     text_question: DataTypes.STRING,
//     correct_answer: DataTypes.STRING,
//   });
  
//   const Grade = sequelize.define('Grade', {
//     grade: DataTypes.STRING,
//   });
  
//   const Student = sequelize.define('Student', {
//     name: DataTypes.STRING,
//     password: DataTypes.STRING,
//     email: DataTypes.STRING,
//   });
  
//   const Answer = sequelize.define('Answer', {
//     option_a: DataTypes.STRING,
//     option_b: DataTypes.STRING,
//     option_c: DataTypes.STRING,
//     option_d: DataTypes.STRING,
//   });
  
//   const Feedback = sequelize.define('Feedback', {
//     feedback: DataTypes.STRING,
//   });
  
//   const Notification = sequelize.define('Notification', {
//     content: DataTypes.STRING,
//   });
  
//   const Response = sequelize.define('Response', {
//     answer_text: DataTypes.STRING,
//     score: DataTypes.INTEGER,
//   });
  
//   // Associations
//   Mentor.hasMany(Assessment, { foreignKey: 'mentor_id' });
//   Mentor.hasMany(Assignment, { foreignKey: 'mentor_id' });
//   Mentor.hasMany(Question, { foreignKey: 'mentor_id' });
//   Mentor.hasMany(Feedback, { foreignKey: 'mentor_id' });
  
//   Assessment.belongsTo(Mentor, { foreignKey: 'mentor_id' });
//   Assignment.belongsTo(Mentor, { foreignKey: 'mentor_id' });
//   Invite.belongsTo(Mentor, { foreignKey: 'mentor_id' });
//   Question.belongsTo(Mentor, { foreignKey: 'mentor_id' });
  
//   Assessment.hasMany(Assignment, { foreignKey: 'assessment_id' });
//   Assessment.hasMany(Question, { foreignKey: 'assessment_id' });
//   Assessment.hasMany(Grade, { foreignKey: 'assessment_id' });
  
//   Assignment.belongsTo(Assessment, { foreignKey: 'assessment_id' });
//   Assignment.belongsTo(Mentor, { foreignKey: 'mentor_id' });
//   Assignment.belongsTo(Student, { foreignKey: 'student_id' });
  
//   Invite.belongsTo(Assessment, { foreignKey: 'assessment_id' });
//   Invite.belongsTo(Mentor, { foreignKey: 'mentor_id' });
//   Invite.belongsTo(Student, { foreignKey: 'student_id' });
  
//   Question.belongsTo(Assessment, { foreignKey: 'assessment_id' });
//   Question.belongsTo(Assignment, { foreignKey: 'assignment_id' });
//   Question.belongsTo(Mentor, { foreignKey: 'mentor_id' });
  
//   Grade.belongsTo(Assessment, { foreignKey: 'assessment_id' });
//   Grade.belongsTo(Student, { foreignKey: 'student_id' });
//   Grade.belongsTo(Assignment, { foreignKey: 'assignment_id' });
  
//   Student.hasMany(Assignment, { foreignKey: 'student_id' });
//   Student.hasMany(Notification, { foreignKey: 'student_id' });
//   Student.hasMany(Response, { foreignKey: 'student_id' });
  
//   Answer.belongsTo(Question, { foreignKey: 'question_id' });
//   Feedback.belongsTo(Question, { foreignKey: 'question_id' });
//   Notification.belongsTo(Student, { foreignKey: 'student_id' });
//   Response.belongsTo(Assignment, { foreignKey: 'assignment_id' });
//   Response.belongsTo(Question, { foreignKey: 'question_id' });
//   Response.belongsTo(Student, { foreignKey: 'student_id' });