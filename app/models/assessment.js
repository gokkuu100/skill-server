const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Assessment = sequelize.define('assessments', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    })
    Assessment.associate = (models) => {
        Assessment.belongsTo(models.Mentor, {
            foreignKey: 'mentorID',
            as: 'mentors'
        })
        Assessment.hasMany(models.Grade, {
            foreignKey: 'assessmentID',
            as: 'grades'
        })
        Assessment.hasMany(models.Question, {
            foreignKey: 'assessmentID',
            as: 'questions'
        })
        Assessment.hasMany(models.Invite, {
            foreignKey: 'assessmentID',
            as: 'invites'
        })
        Assessment.hasMany(models.Feedback, {
            foreignKey: 'assessmentID',
            as: 'feedbacks'
        })
    }
    return Assessment;
}