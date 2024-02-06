const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Answer = sequelize.define("answers", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ans1: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        ans2: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        ans3: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        ans4: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
    })
    Answer.associate = (models) => {
        Answer.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: 'students'
        })
        Answer.belongsTo(models.Question, {
            foreignKey: 'questionsId',
            as: 'questions'
        })
    }
    return Answer
}