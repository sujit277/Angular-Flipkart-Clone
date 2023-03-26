module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Papa@7941",
  DB: "ecommerce",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
