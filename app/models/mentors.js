const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Mentor = sequelize.define('mentors', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    })
    Mentor.associate = (models) => {
        Mentor.hasMany(models.Assessment, {
            foreignKey: 'mentorID',
            as: 'assessments'
        }),
        Mentor.hasMany(models.Feedback, {
            foreignKey: 'mentorID',
            as: 'feedbacks'
        }),
        Mentor.hasMany(models.Question, {
            foreignKey:  "mentorID",
            as: 'questions'
        }),
        Mentor.hasMany(models.Invite, {
            foreignKey: 'mentorID',
            as: 'invites'
        })
    }

    return Mentor
}