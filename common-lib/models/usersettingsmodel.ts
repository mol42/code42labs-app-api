'use strict';
import {
  Model,
  Optional
} from 'sequelize';

interface UserSettingsAttributes {
  id: number,
  userId: number,
  languageOptions: JSON,
  selectedTheme: number,
  createdAt: Date,
  updatedAt: Date
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserSettingsAttributes, "id"> { }

export class IUserSettingsModel extends Model<UserSettingsAttributes, UserCreationAttributes>
  implements UserSettingsAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public userId!: number;
  public languageOptions: JSON;
  public selectedTheme: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize, DataTypes) => {
  IUserSettingsModel.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.BIGINT },
    languageOptions: { type: DataTypes.JSON, field: "language_options" },
    selectedTheme: { type: DataTypes.INTEGER, field: "selected_theme" },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "UserSkillProgressModel",
    tableName: "user__skill_progress"
  });

  return IUserSettingsModel;
};