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
  const verify = await account.getStatement(req.params.cpf);
  if (account.errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: account.errors,
    });
  }
  return res.status(200).json(verify);
};
exports.deposit = async (req, res) => {
  const account = new Account(req.body);
  await account.deposit(req.params.cpf, req.body.value);
  if (account.errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: account.errors,
    });
  }
  return res.status(200).json({
    status: "success",
  });
};
exports.withdraw = async (req, res) => {
  const account = new Account(req.body);
  await account.withdraw(req.params.cpf, req.body.value);
  if (account.errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: account.errors,
    });
  }
  return res.status(200).json({
    status: "success",
  });
};
exports.getBalance = async (req, res) => {
  const account = new Account(req.body);
  const verify = await account.getBalance(req.params.cpf);
  if (account.errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: account.errors,
    });
  }
  return res.status(200).json(verify);
};
exports.delete = async (req, res) => {
  const account = new Account(req.body);
  await account.delete(req.params.id);
  if (account.errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: account.errors,
    });
  }
  return res.status(200).json({
    status: "success",
  });
};
exports.transfer = async (req, res) => {
  const account = new Account(req.body);
  await account.transfer(req.params.cpf, req.body.value, req.body.cpf);
  if (account.errors.length > 0) {
    return res.status(400).json({
      status: "error",
      message: account.errors,
    });
  }
  return res.status(200).json({
    status: "success",
  });
};
