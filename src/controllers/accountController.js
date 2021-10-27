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
  return res.status(201).json({
    status: "success",
  });
};
exports.getStatement = async (req, res) => {
  const account = new Account(req.body);
  const verify = await account.checkAccountByCPF(req.params.cpf);
  if (!verify) {
    return res.status(400).json({
      status: "error",
      message: "Account not found",
    });
  }
  return res.status(200).json(verify.statement);
};
