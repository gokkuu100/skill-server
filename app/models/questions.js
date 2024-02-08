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
        correctChoice: {
            try: DataTypes.STRING(64),
            allowNull: false
        },
        mentorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'mentors',
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
    Question.associate = (models) => {
        Question.belongsTo(models.Mentor, {
            foreignKey: 'mentorId',
            as: 'mentors'
        }),
        Question.belongsTo(models.Assessment, {
            foreignKey: 'assessmentId',
            as: 'assessments'
        })
    }
    return Question
}