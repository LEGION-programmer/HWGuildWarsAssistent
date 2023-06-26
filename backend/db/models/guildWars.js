const mongoose  = require('mongoose')

const guildWarsSchema = new mongoose.Schema({
    guildOwner: {
        type: String
    },
    nameGuild: {
        type: String
    },
    position: {
        type: String,
    },
    ourNick: {
        type: String,
    },
    ourPower: {
        type: Number,
    },
    score: {
        type: Number,
    },
    enemyNick: {
        type: String,
    },
    enemyPower: {
        type: Number,
    },
    ourHero: {
        type: String
    },
    enemyHero: {
        type: String
    }
})

const GuildWars = mongoose.model('GuildWars', guildWarsSchema)

module.exports = GuildWars

