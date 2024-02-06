const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Question = sequelize.define('questions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        choice1: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        choice2: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        choice3: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        choice4: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
    })
    Question.associate = (models) => {
        Question.belongsTo(models.Mentor, {
            foreignKey: 'mentorID',
            as: 'mentors'
        }),
        Question.belongsTo(models.Assessment, {
            foreignKey: 'AssessmentID',
            as: 'assessments'
        })
    }
    return Question
}