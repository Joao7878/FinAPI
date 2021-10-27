const express = require("express");
const router = express.Router();
const accountController = require("./controllers/accountController");
//Create a new route for creating a new account
router.post("/account", accountController.createAccount);

module.exports = router;
