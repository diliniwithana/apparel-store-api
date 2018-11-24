var express = require("express");
var router = express.Router();
var BodyMeasurementDAO = require("../db/bodyMeasurementDAO");

router.get("/getBodyMeasurement/:customerId", function(req, res, next) {
  BodyMeasurementDAO.getMeasurementOfCustomer(req.params.customerId)
    .then(result => {
      if (result) {
        return res.json(result);
      }
      return res.status(400).json("bad request");
    })
    .catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
});

router.post("/addBodyMeasurement", function(req, res, next) {
  BodyMeasurementDAO.addBodyMeasurement(req.body)
    .then(result => {
      if (result) {
        return res.json(result);
      }
      return res.status(400).json("bad request");
    })
    .catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
});

module.exports = router;
