const { DataTypes } = require("sequelize")
module.exports = (sequelize) => {
    const Feedback = sequelize.define("feedbacks", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
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
    Feedback.associate = (models) => {
        Feedback.belongsTo(models.Mentor, {
            foreignKey: 'mentorId',
            as: 'mentors'
        })
        Feedback.belongsTo(models.Assessment, {
            foreignKey: 'assessmentId',
            as: 'assessments'
        })
    }

    return Feedback
}