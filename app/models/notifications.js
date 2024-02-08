const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Notification = sequelize.define("notifications", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'students',
                key: 'id'
            }
        }
    })
    Notification.associate = (models) => {
        Notification.hasMany(models.Invite, {
            foreignKey: 'notificationId',
            as: 'invites'
        })
        Notification.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: 'students'
        })
    }
    return Notification;
}