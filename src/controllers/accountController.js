const Account = require("../models/accountModel");
exports.createAccount = async (req, res) => {
  const account = new Account(req.body);
  await account.create();
  if (account.errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: account.errors,
    });
  }
  res.status(201).json({
    status: "success",
  });
};
