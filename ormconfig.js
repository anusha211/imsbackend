export const type = "mysql";
export const host = "localhost";
export const port = 3306;
export const username = 'root';
export const password = '@rootgo123!';
export const database = 'userdb';
export const synchronize = false;
export const logging = false;
export const entities = [
    "dist/src/models/**/*.js"
];
export const migrations = [
    "dist/src/migration/**/*.js"
];
export const subscribers = [
    "dist/src/subscriber/**/*.js"
];
export const cli = {
    entitiesDir: "src/models",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
};
  