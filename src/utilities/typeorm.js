const { createConnection, Connection } = require('typeorm');

async function dbConnector() {
  try {
    await createConnection({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "test",
      password: "test",
      database: "test"
    });
    console.log('Connected to MySQL');
  } catch (err) {
    console.log(`${err} - MySQL connection failed`);
  }
}

module.exports = dbConnector;