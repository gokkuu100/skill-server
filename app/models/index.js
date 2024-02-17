const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    define: {
      timestamps: false,
    },
  });


// test connection
sequelize.authenticate()
.then(() => {
    console.log("Connection has been established successfully.");
})
.catch(err => {
    console.error("Unable to connect to the database:", err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Answer = require('./answers')(sequelize, Sequelize)
db.Assessment = require('./assessment')(sequelize, Sequelize);
db.Feedback = require('./feedback')(sequelize, Sequelize);
db.Grade = require('./grade')(sequelize, Sequelize);
db.Invite = require('./invite')(sequelize, Sequelize);
db.Mentor = require('./mentors')(sequelize, Sequelize);
db.Notification = require('./notifications')(sequelize, Sequelize);
db.Question = require('./questions')(sequelize, Sequelize);
db.Student = require('./student')(sequelize, Sequelize);

module.exports = db;