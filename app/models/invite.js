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
        },
        mentorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'mentors',
                key: 'id'
            }
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'students',
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
    Invite.associate = (models) => {
        Invite.belongsTo(models.Mentor, {
            foreignKey: 'mentorId',
            as: 'mentors'
        }),
        Invite.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: 'students'
        })
        Invite.belongsTo(models.Assessment, {
            foreignKey: 'assessmentId',
            as: 'assessments'
        })
    }
    return Invite;
}