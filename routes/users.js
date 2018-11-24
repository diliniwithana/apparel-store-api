var express = require("express");
var router = express.Router();
var UserDAO = require("../db/userDAO");

/* GET users listing. */
router.get("/getAllUsers", function(req, res, next) {
  UserDAO.getAllUsers()
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(404).json(err);
    });
});

router.get("/login/:email", function(req, res, next) {
  let email = req.params.email;
  UserDAO.getAUsers(email)
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

router.get("/getCustomerDetails/:customerId", function(req, res, next) {
  let customerId = req.params.customerId;
  UserDAO.getACustomerDetails(customerId)
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

router.get("/getRetailerDetails/:retailerId", function(req, res, next) {
  let retailerId = req.params.retailerId;
  UserDAO.getRetailerDetails(retailerId)
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

router.post("/addUser", function(req, res, next) {
  UserDAO.insertUser(req.body)
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

router.post("/addCustomer", function(req, res, next) {
  UserDAO.insertCustomer(req.body)
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

router.post("/addRetailer", function(req, res, next) {
  UserDAO.insertRetailer(req.body)
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
