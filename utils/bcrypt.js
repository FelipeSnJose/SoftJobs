const bcrypt = require('bcryptjs')

const SALT_ROUNDS = 10

const encrypt = (password) => bcrypt.hashSync(password, SALT_ROUNDS)

const compareSync = (password, encryptedPassword) => bcrypt.compareSync(password, encryptedPassword)

module.exports = {
  encrypt,
  compareSync
}
