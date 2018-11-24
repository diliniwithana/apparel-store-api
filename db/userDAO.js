const mysql = require("./mysql");

class UserDAO {
  getAllUsers() {
    return new Promise((resolve, reject) => {
      mysql.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const q = "SELECT * FROM Apparel_Store.User";
        connection.query(q, (error, results) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          //all success
          connection.release();
          return resolve(results);
        });
      });
    });
  }

  /**
   * Get a user from mysql database
   * @param userId
   * @returns {Promise<any>}
   */
  getAUsers(email) {
    return new Promise((resolve, reject) => {
      mysql.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const q = "SELECT * FROM Apparel_Store.User WHERE email=?";
        connection.query(q, email, (error, results) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          //all success
          connection.release();
          return resolve(results[0]);
        });
      });
    });
  }

  getRetailerDetails(retailerId) {
    return new Promise((resolve, reject) => {
      mysql.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const q = `SELECT 
          U.*, R.*
          FROM
              Apparel_Store.User U
                  INNER JOIN
              Retailer R ON U.userId = R.retailerId
          WHERE
              U.userId = ?`;
        connection.query(q, retailerId, (error, results) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          //all success
          connection.release();
          return resolve(results[0]);
        });
      });
    });
  }

  getACustomerDetails(customerId) {
    return new Promise((resolve, reject) => {
      mysql.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const q = `SELECT 
            U.userId, U.email, U.primaryContact, U.role, C.preference, B.*
        FROM
            Apparel_Store.User U
                INNER JOIN
            Apparel_Store.Customer C ON U.userId = C.customerId
                INNER JOIN
            BodyMeasurement B ON C.customerId = B.bodyMeasurementId
        WHERE
            U.userId = ?`;
        connection.query(q, customerId, (error, results) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          //all success
          connection.release();
          return resolve(results[0]);
        });
      });
    });
  }

  /**
   * Add a user to the mysql database
   * @param userData
   * @returns {Promise<any>}
   */
  insertUser({ email, primaryContact, role, password }) {
    return new Promise((resolve, reject) => {
      mysql.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const q =
          "INSERT INTO Apparel_Store.User(email, primaryContact, role, password) VALUES (?,?,?,?)";
        const values = [email, primaryContact, role, password];
        connection.query(q, values, error => {
          if (error) {
            console.log(error);
            return reject(err);
          }
          connection.release();
          console.log("User added>>>>>>>>>>>>>>>>>");
          return resolve("user added");
        });
      });
    });
  }

  insertCustomer({ email, primaryContact, role, password, preference }) {
    console.log(email + " " + role);
    return new Promise((resolve, reject) => {
      mysql.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        // first inster the User then the Customer
        this.insertUser({ email, primaryContact, role, password })
          .then(() => {
            const q =
              "INSERT INTO Apparel_Store.Customer(customerId, preference) VALUES ( (SELECT userId FROM Apparel_Store.User where email=?) ,?)";
            const values = [email, preference];
            connection.query(q, values, error => {
              if (error) {
                console.log(error);
                return reject(err);
              }
              connection.release();
              console.log("Customer added>>>>>>>>>>>>>>>>>");
              return resolve("cusomer added");
            });
          })
          .catch(err => {
            console.log("Customer errr>>>>>>>>>>>>>>>>> " + err);
            reject(err);
          });
      });
    });
  }

  insertRetailer({
    email,
    primaryContact,
    role,
    password,
    shopName,
    shopContact
  }) {
    return new Promise((resolve, reject) => {
      mysql.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        // first inster the User then the Retailer
        this.insertUser({ email, primaryContact, role, password })
          .then(() => {
            const q =
              "INSERT INTO Apparel_Store.Retailer(retailerId, shopName, shopContact) VALUES ( (SELECT userId FROM Apparel_Store.User where email=?) ,? ,?)";
            const values = [email, shopName, shopContact];
            connection.query(q, values, error => {
              if (error) {
                console.log(error);
                return reject(err);
              }
              connection.release();
              console.log("Retailer added>>>>>>>>>>>>>>>>>");
              return resolve("cusomer added");
            });
          })
          .catch(err => {
            console.log("Retailer errr>>>>>>>>>>>>>>>>> " + err);
            reject(err);
          });
      });
    });
  }
}

module.exports = new UserDAO();
