if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


module.exports = {
  "development": {
    "username": process.env.POSTGRESQL_USERNAME,
    "password": process.env.POSTGRESQL_PASSWORD,
    "database": "djello_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.POSTGRESQL_USERNAME,
    "password": process.env.POSTGRESQL_PASSWORD,
    "database": "djello_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
  "use_env_variable": "DATABASE_URL",
  "dialect": "postgres"
}
};
