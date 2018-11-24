const mysql = require("./mysql");

class ShirtDAO {
  getMeasurementOfShirt(shirtId) {
    return new Promise((resolve, reject) => {
      mysql.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const values = [shirtId];
        const q = "SELECT * FROM Apparel_Store.Shirt WHERE shirtId = ?";
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

  getMeasurementOfShirtByRetailerId(retailerId) {
    return new Promise((resolve, reject) => {
      mysql.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const values = [retailerId];
        const q = "SELECT * FROM Apparel_Store.Shirt WHERE retailerId = ?";
        connection.query(q, values, (error, results) => {
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

  insertShirt({
    brand,
    color,
    imageURL,
    retailerId,
    lengthFromShoulder,
    seamLength,
    lengthFromMiddle,
    lengthFromCollarToShoulder,
    lowerHipWidth,
    waist,
    chest,
    collarWidth,
    upperArmLength,
    lowerArmLength,
    lowerGirth,
    upperGirth,
    backLengthFromMiddle,
    backLengthFromShoulder,
    backShoulderWidth
  }) {
    return new Promise((resolve, reject) => {
      mysql.getConnection((err, connection) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const q = `INSERT INTO Apparel_Store.Shirt (brand, color, imageURL, retailerId, lengthFromShoulder,seamLength,
          lengthFromMiddle,lengthFromCollarToShoulder,lowerHipWidth,
          waist,chest,collarWidth,
          upperArmLength,lowerArmLength,lowerGirth,
          upperGirth,backLengthFromMiddle,backLengthFromShoulder,backShoulderWidth
          )
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        const values = [
          brand,
          color,
          imageURL,
          retailerId,
          lengthFromShoulder,
          seamLength,
          lengthFromMiddle,
          lengthFromCollarToShoulder,
          lowerHipWidth,
          waist,
          chest,
          collarWidth,
          upperArmLength,
          lowerArmLength,
          lowerGirth,
          upperGirth,
          backLengthFromMiddle,
          backLengthFromShoulder,
          backShoulderWidth
        ];
        connection.query(q, values, error => {
          if (error) {
            console.log(error);
            return reject(err);
          }
          connection.release();
          console.log("Shirt added>>>>>>>>>>>>>>>>>");
          return resolve("Shirt added");
        });
      });
    });
  }
}

module.exports = new ShirtDAO();
