import { ModelType } from "sequelize";

export type GetModelFunction = {
  (modelName: string, modelType: ModelType): ModelType
}

export type IModelCache = {
  getModel: GetModelFunction
};

class ModelCacheFactory {
  modelCache: Object;
  sequelize: any;
  DataTypes: any;

  constructor(sequelize) {
    this.modelCache = {};
    this.sequelize = sequelize;
  }

  init(sequelize, Sequelize) {
    this.sequelize = sequelize;
    this.DataTypes = Sequelize;
    return this;
  }

  registerModels(dbModelDataList: Array<any>) {
    const sequelize = this.sequelize;
    const DataTypes = this.DataTypes;

    dbModelDataList.forEach((modelData) => {
      this.modelCache[modelData.name] = modelData.model(sequelize, DataTypes);
    });
  }

  getModel(modelName) {
    return this.modelCache[modelName];
  }
}

export default ModelCacheFactory;
