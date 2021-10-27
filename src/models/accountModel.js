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
    type: "array",
  },
});
const accountModel = mongoose.model("account", accountSchema);
class Account {
  constructor(body) {
    this.body = body;
    this.errors = [];
  }
  async create() {
    const alreadyExists = await this.checkAccount();
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
  async checkAccount() {
    const account = await accountModel.findOne({ cpf: this.body.cpf });
    if (account) {
      return account;
    }
    return false;
  }
}
module.exports = Account;
