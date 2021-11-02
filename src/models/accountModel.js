const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  cpf: {
    type: "string",
    required: true,
  },
  statement: {
    balance: {
      type: "Number",
      default: 0,
    },
    list: [],
  },
});
const accountModel = mongoose.model("account", accountSchema);
class Account {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.show = [];
  }
  async create() {
    const alreadyExists = await this.checkAccountByCPF(this.body.cpf);
    if (alreadyExists) {
      this.errors.push("Account already exists");
      return this.errors;
    }
    if (this.body.name == "") {
      this.errors.push("Name is required");
    }
    if (this.body.cpf == "") {
      this.errors.push("CPF is required");
    }
    if (this.errors.length > 0) {
      return this.errors;
    }
    await accountModel.create(this.body);
  }
  async getStatement(cpf) {
    const account = await this.checkAccountByCPF(cpf);
    if (!account) {
      this.errors.push("Account not found");
      return this.errors;
    }
    return account.statement.list;
  }
  async getBalance(cpf) {
    const account = await this.checkAccountByCPF(cpf);
    if (!account) {
      this.errors.push("Account not found");
      return this.errors;
    }
    return account.statement.balance;
  }
  async deposit(cpf, value) {
    const account = await this.checkAccountByCPF(cpf);
    if (!account) {
      this.errors.push("Account not found");
      return this.errors;
    }
    account.statement.list.push(Date() + " Deposit: " + value);
    account.statement.balance += value;
    const update = await accountModel.findByIdAndUpdate(account._id, account);
    return update;
  }
  async withdraw(cpf, value) {
    const account = await this.checkAccountByCPF(cpf);
    if (!account) {
      this.errors.push("Account not found");
      return this.errors;
    }
    if (account.statement.balance < value) {
      this.errors.push("Insufficient funds");
      return this.errors;
    }
    account.statement.list.push(Date() + " Withdraw: " + value);
    account.statement.balance -= value;
    const update = await accountModel.findByIdAndUpdate(account._id, account);
    return update;
  }
  async checkAccountByCPF(cpf) {
    const account = await accountModel.findOne({ cpf: cpf });
    if (account) {
      return account;
    }
    return false;
  }
}
module.exports = Account;
