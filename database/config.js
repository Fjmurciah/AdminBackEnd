const sql = require('mssql')

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

const dbConnection =
  async () => {
    try {
      console.log('Conectando a la base de datos...')
      await sql.connect(sqlConfig);
      console.log('Base de datos en linea')
    } catch (error) {
      console.log(error);
      throw new Error('Error a la hora de iniciar la base de datos');
    }
  }

const pool = new sql.ConnectionPool(sqlConfig);
const poolConnect = pool.connect();

async function executeQuery(query) {
  try {
    const request = pool.request();
    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    throw err;
  }
}

async function executeStoredProcedure(name, parameters) {
  try {
    const request = pool.request();
    parameters.forEach(param => {
      request.input(param.name, param.type, param.value);
    });

    const result = await request.execute(name);
    return result.recordset;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  dbConnection,
  executeQuery,
  executeStoredProcedure,
  sql
}