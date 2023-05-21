import "reflect-metadata"
import { DataSource } from "typeorm"
import { Adatok } from "./entity/Adatok"
import { Hiba } from "./entity/Hiba"
import { Active } from "./entity/Active"

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "beadando",
    synchronize: true,
    logging: false,
    entities: [Adatok, Hiba, Active],
    migrations: [],
    subscribers: [],
})
