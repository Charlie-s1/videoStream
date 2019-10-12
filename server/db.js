const fs = require('fs');

async function getMovies(res) {
  const myConn = await init();
  const [rows] = await myConn.execute('SELECT * FROM film ORDER BY id DESC LIMIT 10');

  var messages = JSON.stringify(rows);
  return messages;
}


async function init() {
  if (sqlPromise){
    return sqlPromise;
  }
  sqlPromise = newConnection();
  return sqlPromise;
}

async function newConnection() {
  const sql = await mysql.createConnection(config.mysql);
  sql.on('error', (err) => {
    console.error(err);
    sql.end();
  });
  return sql;
}
async function releaseConnection(connection) {
  await connection.end();
}
