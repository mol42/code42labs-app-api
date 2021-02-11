'use strict';
import {
  Model,
  Optional
} from 'sequelize';

interface SkillAttributes {
  id: number,
  name: string,
  image: string,
  shortDescription: string,
  longDescription: string,
  skillTypeId: number;
  createdAt: Date,
  updatedAt: Date
}

// Some attributes are optional in `User.build` and `User.create` calls
interface SkillCreationAttributes extends Optional<SkillAttributes, "id"> { }

// Skill bir programlama dili, yazilim araci, UI framework, backend framwork
// vb bir olgu olabilir.
export class ISkillModel extends Model<SkillAttributes, SkillCreationAttributes>
  implements SkillAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public image!: string;
  public shortDescription: string;
  public longDescription: string;
  public skillTypeId: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize, DataTypes) => {
  ISkillModel.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, field: "name" },
    image: { type: DataTypes.STRING, field: "image" },
    shortDescription: { type: DataTypes.STRING, field: "short_description" },
    longDescription: { type: DataTypes.STRING, field: "long_description" },
    skillTypeId: { type: DataTypes.INTEGER, field: "skill_type_id" },
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
    modelName: "SkillModel",
    tableName: "skills"
  });

  return ISkillModel;
};