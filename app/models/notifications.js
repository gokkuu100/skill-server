const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Notification = sequelize.define("notifications", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    })
    Notification.associate = (models) => {
        Notification.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: 'students'
        })
        Notification.belongsTo(models.Invite, {
            foreignKey: 'inviteId',
            as: 'invites'
        })
    }
    return Notification;
}