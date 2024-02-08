const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Answer = sequelize.define("answers", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        chosenAnswer: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'students',
                key: 'id'
            }
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'questions',
                key: 'id'
            }
        },
        assessmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'assessments',
                key: 'id'
            }
        }
    })
    Answer.associate = (models) => {
        Answer.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: 'students'
        })
        Answer.belongsTo(models.Question, {
            foreignKey: 'questionId',
            as: 'questions'
        })
        Answer.belongsTo(models.Assessment, {
            foreignKey: 'assessmentId',
            as: 'assessments'
        })
    }
    return Answer
}