'use strict';
import {
  Model,
  Optional
} from 'sequelize';
// These are all the attributes in the User model
interface UserAttributes {
  id: number,
  username: string,
  name: string,
  countryId: number,
  email: string,
  hashedPassword: string,
  referralCode: string,
  lastName: string,
  avatarId: number,
  phone: string,
  birthdate: Date,
  welcomed: boolean,
  lastAnnouncement: string,
  salt: string,
  status: number,
  createdAt: Date,
  updatedAt: Date
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

export class IUserModel extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public username!: string;
  public name!: string;
  public countryId !: number;
  public email!: string;
  public hashedPassword!: string;
  public referralCode: string;
  public lastName!: string;
  public avatarId!: number;
  public phone: string;
  public birthdate: Date;
  public welcomed!: boolean;
  public lastAnnouncement!: string;
  public salt!: string;
  public status!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize, DataTypes) => {
  IUserModel.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true },
    name: DataTypes.STRING,
    countryId: { type: DataTypes.INTEGER, field: "country_id" },
    email: { type: DataTypes.STRING, unique: true },
    hashedPassword: { type: DataTypes.STRING, field: "hashed_password" },
    referralCode: { type: DataTypes.STRING, field: "referral_code" },
    lastName: { type: DataTypes.STRING, field: "last_name" },
    avatarId: { type: DataTypes.INTEGER, field: "avatar_id" },
    phone: { type: DataTypes.STRING },
    birthdate: DataTypes.DATE,
    welcomed: { type: DataTypes.BOOLEAN, field: "welcomed" },
    lastAnnouncement: { type: DataTypes.STRING, field: "last_announcement" },
    salt: DataTypes.STRING,
    status: DataTypes.TINYINT,
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
    modelName: "UserModel",
    tableName: "user"
  });
  
  return IUserModel;
};