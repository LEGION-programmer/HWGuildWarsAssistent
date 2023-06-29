const express = require('express')
const router = express.Router()
const WarsController = require('../controllers/WarsController')
const GuildController = require('../controllers/GuildController')

// wars api
router.get('/wars' ,WarsController.getAllInformation)
router.get('/wars/:id', WarsController.getOneWar)
router.post('/wars' ,WarsController.addNewWar)
router.delete('/wars/:id', WarsController.deleteWar)
router.put('/wars/:id', WarsController.updateWar)

// guild api
router.post('/register', GuildController.register)
router.post('/login', GuildController.login)

module.exports = router