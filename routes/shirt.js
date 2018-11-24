var express = require("express");
var router = express.Router();
var ShirtDAO = require("../db/shirtDAO");

router.get("/getShirtById/:shirtId", function(req, res, next) {
  ShirtDAO.getMeasurementOfShirt(req.params.shirtId)
    .then(result => {
      if (result) {
        return res.json(result);
      }
      return res.status(400).json("bad request");customerId
    })
    .catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
});

router.get("/getShirtsByRetailerId/:retailerId", function(req, res, next) {
    ShirtDAO.getMeasurementOfShirtByRetailerId(req.params.retailerId)
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

router.post("/addShirt", function(req, res, next) {
  ShirtDAO.insertShirt(req.body)
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
