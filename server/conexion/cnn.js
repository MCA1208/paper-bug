const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "admin",
  database: "TrackingLogistics",
  port: "5432",
});

module.exports = pool;
