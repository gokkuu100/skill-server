const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Grade = sequelize.define("grades", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        grade: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    })
    Grade.associate = (models) => {
        Grade.belongsTo(models.Assessment, {
            foreignKey: 'AssessmentID',
            as: 'assessments'
        }),
        Grade.belongsTo(models.Student, {
            foreignKey: "studentID",
            as: 'students'
        })
    }
    return Grade
}