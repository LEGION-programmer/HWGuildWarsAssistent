const Guild = require('../db/models/guild')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

class GuildActions {
    // register
    async register(req, res) {
        try {
          const { guildName, server, password, cPassword } = req.body
          const findGuild = await Guild.findOne({ guildName: req.body.guildName })
          if (findGuild) {
            return res.json({ message: "This guild already has an account with this login" })
          }
      
          if (password && cPassword && password.trim() !== cPassword.trim()) {
            return res.json({ message: 'Passwords are not the same!' });
          }
      
          const guild = new Guild({ guildName, server, password })
          await guild.save()
          return res.status(200).json({ validationStatus: true, guildId: guild._id, guildName: guild.guildName})
        } catch (err) {
          return res.status(500).json({ message: err.message })
        }
      }

    // login
    async login(req, res){
        try {
            const guild = await Guild.findOne({guildName: req.body.guildName})
        
            if (!guild) {
                return res.json({message: "This guild doesn't exist"})
            }else{
                bcrypt.compare(req.body.password, guild.password, function(error, isMatch) {
                    if (error) {
                      throw error
                    } else if (!isMatch) {
                        return res.json({message: 'Wrong password'})
                    } else {
                        return res.json({validationStatus: true, guildId: guild._id, guildName: guild.guildName})
                    }
                  })
            }
          } catch (err) {
            return res.status(500).json({message: err.message})
          }
        
    }
    
}


module.exports = new GuildActions()