const {
  executeStoredProcedure,
  executeQuery,
  sql,
} = require("../database/config");

class Client {
  constructor(id, name, role, team, status, age, avatar) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.team = team;
    this.status = status;
    this.age = age;
    this.avatar = avatar;
  }
}
const getClients = () => {
  return new Promise((resolve, reject) => {
    executeQuery("SELECT * FROM clientes")
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  Client,
  getClients,
};
