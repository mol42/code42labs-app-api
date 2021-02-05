'use strict';
import {
  Model,
  Optional
} from 'sequelize';

interface SkillStepResourceAttributes {
  id: number,
  skillId: number,
  skillStepId: number,
  type: number,
  languageId: number,
  data: JSON,
  createdAt: Date,
  updatedAt: Date
}

// Some attributes are optional in `User.build` and `User.create` calls
interface SkillStepResourceCreationAttributes extends Optional<SkillStepResourceAttributes, "id"> { }

// Bir skill adimina ait kaynaklardan bir tanesini temsile den model.
// Ornegin Javascript degiskenleri adimina (konusuna) ait video veya blog 
// yazilari bilgisi.
export class ISkillStepResourceModel extends Model<SkillStepResourceAttributes, SkillStepResourceCreationAttributes>
  implements SkillStepResourceAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public skillId!: number;
  public skillStepId!: number;
  // video || article
  public type: number;
  public languageId: number;
  // data icerisinde kaynagin tipine gore JSON yapisinda formatlanmis 
  // veri yer almaktadir bu sayede app verideki bilgileri kullanarak
  // video veya blog gosterimi yapar.
  public data: JSON;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize, DataTypes) => {
  ISkillStepResourceModel.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    skillId: { type: DataTypes.INTEGER, field: "skill_id" },
    skillStepId: { type: DataTypes.INTEGER, field: "skill_step_id" },
    type: { type: DataTypes.INTEGER, field: "type" },
    languageId: { type: DataTypes.INTEGER, field: "language_id" },
    data: { type: DataTypes.JSON, field: "data" },
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
    modelName: "SkillStepResource",
    tableName: "skill_step_resources"
  });

  return ISkillStepResourceModel;
};