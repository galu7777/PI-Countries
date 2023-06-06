const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Activity', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: true,
                min: 1,
                max: 5
            }
        },
        season: {
            type: DataTypes.STRING
        }
    }, { timestamps: false });
};