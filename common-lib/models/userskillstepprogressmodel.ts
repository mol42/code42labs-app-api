'use strict';
import {
  Model,
  Optional
} from 'sequelize';

interface UserSkillStepProgressAttributes {
  id: number,
  userId: number,
  skillId: number,
  progress: JSON,
  createdAt: Date,
  updatedAt: Date
}

// Some attributes are optional in `Model.build` and `Model.create` calls
interface UserSkillStepProgressCreationAttributes extends Optional<UserSkillStepProgressAttributes, "id"> { }

export class IUserSkillStepProgressModel extends Model<UserSkillStepProgressAttributes, UserSkillStepProgressCreationAttributes>
  implements UserSkillStepProgressAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public userId: number;
  public skillId!: number;
  // Burada progress alani icin JSON kullanma amacimiz tablo yapisini basitlestirmek
  // eger JSON kullanmasaydik yeni bir tablo yaratip onun icine kullanicinin tamamladigi
  // adimlari ekleyip cikariyor olacaktik ve bunlari listelemek istedigimizde query atip
  // hepsini cekmemiz gerekecekti bu JSON datasi varken gereksiz bir zaman kaybi ve kompleks
  // bir yapiya neden oluyor.
  public progress: JSON;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize, DataTypes) => {
  IUserSkillStepProgressModel.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.BIGINT, field: "user_id" },
    skillId: { type: DataTypes.INTEGER, field: "skill_id" },
    progress: { type: DataTypes.JSON, field: "progress" },
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
    tableName: "user__skill_step_progresses"
  });

  return IUserSkillStepProgressModel;
};