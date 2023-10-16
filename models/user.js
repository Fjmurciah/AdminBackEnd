const {
  executeStoredProcedure,
  executeQuery,
  sql,
} = require("../database/config");

class User {
  constructor(name, email, password, phone) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }

  saveInDB() {
    return new Promise((resolve, reject) => {
      const params = [
        { name: "name", type: sql.VarChar, value: this.name },
        { name: "email", type: sql.VarChar, value: this.email },
        { name: "password", type: sql.VarChar, value: this.password },
        { name: "phone", type: sql.VarChar, value: this.phone },
      ];

      executeStoredProcedure("WebUserCreate", params)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const verifyLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    const params = [
      { name: "email", type: sql.VarChar, value: email },
      { name: "password", type: sql.VarChar, value: password },
    ];

    executeStoredProcedure("WebLogin", params)
      .then((data) => {
        if (data[0].respuesta == 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    executeQuery(`SELECT * FROM users WHERE email = '${email}'`)
      .then((data) => {
        const userData = data[0];
        resolve(
          new User(
            userData.name,
            userData.email,
            userData.password,
            userData.phone
          )
        );
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    executeQuery("SELECT * FROM users")
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const params = [{ name: "email", type: sql.VarChar, value: email }];

    executeStoredProcedure("WebUserDelete", params)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  User,
  getUsers,
  getUserByEmail,
  verifyLogin,
  deleteUserByEmail,
};
