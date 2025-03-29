import { DataSource, Repository, DataSourceOptions } from 'typeorm';
import ormconfig from '../../ormconfig.json';
import mysql from 'mysql2/promise';
import { User } from '../entities/User';

export interface Database {
    User: Repository<User>;
}

export const db: Database = {} as Database;

initialize();

async function initialize() {
  const connection = await mysql.createConnection({
    host: ormconfig.host,
    port: ormconfig.port,
    user: ormconfig.username,
    password: ormconfig.password
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${ormconfig.database}\`;`);

  const datasource = new DataSource(ormconfig as DataSourceOptions);
  await datasource.initialize();
  db.User = datasource.getRepository(User);
}

export default db;
