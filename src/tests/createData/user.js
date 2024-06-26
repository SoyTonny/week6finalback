const User = require("../../models/User")

const user = async () => {
  const body = {
    firstName: "Andy",
    lastName: "toy",
    email: "andoy@email.com",
    password: "andy1234",
    phone: "333"
  }

  await User.create(body)
}

module.exports = user