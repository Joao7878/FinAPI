const express = require("express");
const router = express.Router();
const accountController = require("./controllers/accountController");
//Create a new route for creating a new account
router.post("/account", accountController.createAccount);
//Create a new route for getting the statement of an account
router.get("/statement/:cpf", accountController.getStatement);
//Create a new route for getting the balance of an account
router.get("/balance/:cpf", accountController.getBalance);
//Create a new route for update the deposit of an account
router.put("/statement/deposit/:cpf", accountController.deposit);
//Create a new route for update the withdraw of an account
router.put("/statement/withdraw/:cpf", accountController.withdraw);
//Create a new route for delete an account
router.delete("/account/delete/:id", accountController.delete);
module.exports = router;
