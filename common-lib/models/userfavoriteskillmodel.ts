'use strict';
import {
  Model,
  Optional
} from 'sequelize';

interface FavoritesJSON extends JSON {
  items: any
}

interface UserFavoriteSkillAttributes {
  id: number,
  userId: number,
  favorites: FavoritesJSON,
  createdAt: Date,
  updatedAt: Date
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserFavoriteSkillCreationAttributes extends Optional<UserFavoriteSkillAttributes, "id"> { }

export class IUserFavoriteSkillModel extends Model<UserFavoriteSkillAttributes, UserFavoriteSkillCreationAttributes>
  implements UserFavoriteSkillAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public userId!: number;
  public favorites!: FavoritesJSON;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize, DataTypes) => {
  IUserFavoriteSkillModel.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.BIGINT, field: "user_id" },
    favorites: { type: DataTypes.JSON, field: "favorites" },
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