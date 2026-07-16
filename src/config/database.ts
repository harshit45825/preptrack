import "reflect-metadata";
import { DataSource } from "typeorm";
import { Track } from "../model/Track";
import { User } from "../model/User";
export const PostgresDataSource = new DataSource({
    type: "postgres",
    // host: "localhost",
    // port: 5432,
    // username: "postgres",
    // password: "postgres",
    // database: "preptrack",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "preptrack",
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    synchronize: true,
    logging: false,
    entities: [Track, User],
    migrations: [],
    subscribers: [],
});
export const initializeDatabase = async () => {
  if (PostgresDataSource.isInitialized) return PostgresDataSource;
  return PostgresDataSource.initialize();
};