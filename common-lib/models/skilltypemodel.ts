'use strict';
import {
  Model,
  Optional
} from 'sequelize';

interface SkillTypeAttributes {
  id: number,
  name: string,
  shortDescription: string,
  longDescription: string,
  createdAt: Date,
  updatedAt: Date
}

// Some attributes are optional in `User.build` and `User.create` calls
interface SkillTypeCreationAttributes extends Optional<SkillTypeAttributes, "id"> { }

// bir programlama dili, yazilim araci, UI framework, backend framwork vb konuyu
// temsil eden model
export class ISkillTypeModel extends Model<SkillTypeAttributes, SkillTypeCreationAttributes>
  implements SkillTypeAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public shortDescription: string;
  public longDescription: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize, DataTypes) => {
  ISkillTypeModel.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, field: "name" },
    shortDescription: { type: DataTypes.STRING, field: "short_description" },
    longDescription: { type: DataTypes.STRING, field: "long_description" },
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
    modelName: "SkillTypeModel",
    tableName: "skill_types"
  });

  return ISkillTypeModel;
};