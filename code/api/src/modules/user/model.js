'use strict'

// User Model
// Attributes include: name, email, password, role
// roles are defined in params.json (ADMIN & USER)
// User will need to have a style attribute added to the model
// Model will need to be updated with a style attribute

module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}
