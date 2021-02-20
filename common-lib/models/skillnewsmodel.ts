'use strict';
import {
  Model,
  Optional
} from 'sequelize';

interface SkillNewsAttributes {
  id: number,
  skillId: number,
  title: string,
  smallImage: string,
  largeImage: string,
  summary: string,
  content: string,
  languageId: number,
  publishDate: Date,
  createdAt: Date,
  updatedAt: Date
}

// Some attributes are optional in `User.build` and `User.create` calls
interface SkillStepCreationAttributes extends Optional<SkillNewsAttributes, "id"> { }

// Her skill icin tamamlanmasi gereken adimlar vardir ve bu adimlari temsil
// etmek icin bu modeli kullaniyoruz
export class ISkillNewsModel extends Model<SkillNewsAttributes, SkillStepCreationAttributes>
  implements SkillNewsAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public skillId!: number;
  public title: string;
  public smallImage: string;
  public largeImage: string;
  public summary: string;
  public content: string;
  public languageId: number;
  public publishDate: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize, DataTypes) => {
  ISkillNewsModel.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    skillId: { type: DataTypes.INTEGER, field: "skill_id" },
    title: { type: DataTypes.TEXT, field: "title" },
    smallImage: { type: DataTypes.INTEGER, field: "small_image" },
    largeImage: { type: DataTypes.INTEGER, field: "large_image" },
    summary: { type: DataTypes.INTEGER, field: "summary" },
    content: { type: DataTypes.INTEGER, field: "content" },
    languageId: { type: DataTypes.INTEGER, field: "language_id" },
    publishDate: { type: DataTypes.DATE, field: "publish_date" },
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
    modelName: "SkillNews",
    tableName: "skill_news"
  });

  return ISkillNewsModel;
};