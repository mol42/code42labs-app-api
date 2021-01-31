'use strict';
import {
  Model,
  Optional
} from 'sequelize';

interface UserFavoriteSkillAttributes {
  id: number,
  skillId: number,
  createdAt: Date,
  updatedAt: Date
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserFavoriteSkillCreationAttributes extends Optional<UserFavoriteSkillAttributes, "id"> { }

export class IUserFavoriteSkillModel extends Model<UserFavoriteSkillAttributes, UserFavoriteSkillCreationAttributes>
  implements UserFavoriteSkillAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public skillId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize, DataTypes) => {
  IUserFavoriteSkillModel.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    skillId: { type: DataTypes.INTEGER, field: "skill_id" },
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
    modelName: "UserFavoriteSkillModel",
    tableName: "user__favorite_skills"
  });

  return IUserFavoriteSkillModel;
};