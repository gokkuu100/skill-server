const { DataTypes } = require("sequelize")
module.exports = (sequelize) => {
    const Invite = sequelize.define('invites', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: DataTypes.STRING(10),
            defaultValue: 'pending' // pending, accepted, rejected
        }
    })
    Invite.associate = (models) => {
        Invite.belongsTo(models.Mentor, {
            foreignKey: 'mentorID',
            as: 'mentors'
        }),
        Invite.belongsTo(models.Student, {
            foreignKey: 'studentID',
            as: 'students'
        }),
        Invite.belongsTo(models.Assessment, {
            foreignKey: 'assessmentID',
            as: 'assessments'
        }),
        Invite.belongsTo(models.Notification, {
            foreignKey: 'notificationID',
            as: 'notifications'
        })
    }
    return Invite;
}