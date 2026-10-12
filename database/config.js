const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");

function getConfig(environment) {
    let variables;

    if (environment === "production") {
        variables = process.env;
    } else {
        const envPath = path.resolve(__dirname, "..", `.env.${environment}`);
        variables = dotenv.parse(fs.readFileSync(envPath));
    }

    return {
        username: variables.DB_USER,
        password: variables.DB_PASSWORD ?? "",
        database: variables.DB_NAME,
        host: variables.DB_HOST,
        port: Number(variables.DB_PORT ?? 3306),
        dialect: "mysql",
        logging: false,
        migrationStorage: "sequelize",
        seederStorage: "sequelize" };
}

module.exports = {
    development: getConfig("development"),
    test: getConfig("test"),
    production: getConfig("production")
};