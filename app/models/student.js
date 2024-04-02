const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Student = sequelize.define('students', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        skills: {
            type: DataTypes.JSON,
            allowNull: true
        },
        occupation: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
    })
    Student.associate = (models) => {
        Student.hasMany(models.Grade, {
            foreignKey: "studentId",
            as:  'grades'
        }),
        Student.hasMany(models.Notification, {
            foreignKey: "studentId",
            as: "notifications"
        }),
        Student.hasMany(models.Answer, {
            foreignKey: "studentId",
            as: 'answers'
        })
    }
    return Student
}
