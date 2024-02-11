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
        },
        inviteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'invites',
                key: 'id'
            }
        }
    })
    Notification.associate = (models) => {
        Notification.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: 'students'
        }),
        Notification.belongsTo(models.Invite, {
            foreignKey: 'inviteId',
            as: 'invites'
        });
    }
    return Notification;
}