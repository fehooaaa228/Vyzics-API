'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AnswerOption.init({
    text: DataTypes.STRING,
    question_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AnswerOption',
  });
  return AnswerOption;
};