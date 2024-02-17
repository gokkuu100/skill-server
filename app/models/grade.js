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
    Grade.associate = (models) => {
        Grade.belongsTo(models.Assessment, {
            foreignKey: 'assessmentId',
            as: 'assessments'
        }),
        Grade.belongsTo(models.Student, {
            foreignKey: "studentId",
            as: 'students'
        })
    }
    return Grade
}