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
        }
    })
    Feedback.associate = (models) => {
        Feedback.belongsTo(models.Mentor, {
            foreignKey: 'mentorID',
            as: 'mentors'
        })
        Feedback.belongsTo(models.Assessment, {
            foreignKey: 'assessmentID',
            as: 'assessments'
        })
    }

    return Feedback
}