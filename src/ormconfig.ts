import { DataSourceOptions } from "typeorm";
import env from "./env";
import { AppleTree } from "./model/entity/AppleTree";
import { Admin } from "./model/entity/Auth";
import { Certificate } from "./model/entity/Certificate";
import { ConiferTree } from "./model/entity/ConiferTree";
import { PoplarTree } from "./model/entity/PoplarTree";
import { Tree } from "./model/entity/Tree";

const ormconfig: DataSourceOptions = {
  type: 'mongodb',
  url: env.dbHost,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  database: env.dbDatabase,
  entities: [
    Certificate,
    Tree,
    AppleTree,
    ConiferTree,
    PoplarTree,
    Admin,
  ],
  migrations: [],
  synchronize: true,
  logging: true
};

export default ormconfig;
