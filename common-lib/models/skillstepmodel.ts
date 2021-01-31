'use strict';
import {
  Model,
  Optional
} from 'sequelize';

interface SkillStepAttributes {
  id: number,
  skillId: number,
  order: number,
  shortDescription: string,
  longDescription: string,
  createdAt: Date,
  updatedAt: Date
}

// Some attributes are optional in `User.build` and `User.create` calls
interface SkillStepCreationAttributes extends Optional<SkillStepAttributes, "id"> { }

// Her skill icin tamamlanmasi gereken adimlar vardir ve bu adimlari
export class ISkillStepModel extends Model<SkillStepAttributes, SkillStepCreationAttributes>
  implements SkillStepAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public skillId!: number;
  public order: number;
  public shortDescription: string;
  public longDescription: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize, DataTypes) => {
  ISkillStepModel.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    skillId: { type: DataTypes.INTEGER, field: "skill_id" },
    order: { type: DataTypes.INTEGER, field: "order" },
    shortDescription: { type: DataTypes.TEXT, field: "short_description" },
    longDescription: { type: DataTypes.TEXT, field: "long_description" },
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
    modelName: "SkillStep",
    tableName: "skill_steps"
  });

  return ISkillStepModel;
};