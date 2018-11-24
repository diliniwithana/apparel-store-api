const mysql = require("./mysql");

class BodyMeasurementDAO {

  getMeasurementOfCustomer(customerId) {
    return new Promise((resolve, reject) => {
      mysql.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const values = [customerId];
        const q =
          "SELECT * FROM Apparel_Store.BodyMeasurement WHERE bodyMeasurementId = ?";
        connection.query(q, values, (error, results) => {
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

  addBodyMeasurement({
    customerId,
    neckGirth,
    neckBase,
    chest,
    hip,
    waist,
    shoulderToWaist,
    sideNeckToWaist,
    underArmToWaist,
    waistToHip,
    shoulderWidth,
    armGirth,
    upperArmGirth,
    upperArmLength,
    underArmLength,
    collar
  }) {
    return new Promise((resolve, reject) => {
      mysql.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const q =
          "INSERT INTO Apparel_Store.BodyMeasurement VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const values = [
          customerId,
          neckGirth,
          neckBase,
          chest,
          hip,
          waist,
          shoulderToWaist,
          sideNeckToWaist,
          underArmToWaist,
          waistToHip,
          shoulderWidth,
          armGirth,
          upperArmGirth,
          upperArmLength,
          underArmLength,
          collar
        ];
        connection.query(q, values, error => {
          if (error) {
            console.log(error);
            return reject(err);
          }
          connection.release();
          console.log("Customer body measurement added>>>>>>>>>>>>>>>>>");
          return resolve("Customer body measurement added");
        });
      });
    });
  }
}

module.exports = new BodyMeasurementDAO();
