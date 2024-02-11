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
        },
        mentorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'mentors',
                key: 'id'
            }
        }
    })
    Assessment.associate = (models) => {
        Assessment.belongsTo(models.Mentor, {
            foreignKey: 'mentorId',
            as: 'mentors'
        })
        Assessment.hasMany(models.Grade, {
            foreignKey: 'assessmentId',
            as: 'grades'
        })
        Assessment.hasMany(models.Question, {
            foreignKey: 'assessmentId',
            as: 'questions'
        })
        Assessment.hasMany(models.Feedback, {
            foreignKey: 'assessmentId',
            as: 'feedbacks'
        })
        Assessment.hasMany(models.Answer, {
            foreignKey: 'assessmentId',
            as: 'answers'
        })
    }
    return Assessment;
}