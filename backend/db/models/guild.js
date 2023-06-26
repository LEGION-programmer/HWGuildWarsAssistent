const bcrypt = require("bcryptjs")
const mongoose = require('mongoose')

// definie guild schema
const guildSchema = new mongoose.Schema({
    guildName:{
        type: String,
    },
    server: {
        type: String,
    },
    password:{
        type: String,
    }
})

guildSchema.pre("save", function (next) {
    const guild = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(guild.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            guild.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })

const Guild = mongoose.model('Guild', guildSchema)

module.exports = Guild