const express = require("express");
const router = express.Router();
const accountController = require("./controllers/accountController");
//Create a new route for creating a new account
router.post("/account", accountController.createAccount);
//Create a new route for getting the statement of an account
router.get("/statement/:cpf", accountController.getStatement);

module.exports = router;
