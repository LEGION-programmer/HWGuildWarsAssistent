const GuildWars = require('../db/models/guildWars')


class WarsController{
    async getAllInformation(req, res){
        let war
        try{
            war = await GuildWars.find({})
            return res.status(200).json(war)
        }catch(err){
            return res.status(500).json({message: err.message})
        }    
    }

    async getOneWar(req, res){
        try{
            const obiekt = await GuildWars.findById(req.params.id);

            if (!obiekt) {
              return res.status(404).json({ message: 'Nie znaleziono obiektu o podanym ID' });
            }
        
            return res.status(200).json(obiekt);
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }

    async addNewWar(req, res){
        try{
            const newWar = new GuildWars({
                guildOwner: req.body.guildOwner,
                nameGuild: req.body.nameGuild, 
                position: req.body.position, 
                ourNick: req.body.ourNick, 
                ourPower: req.body.ourPower,
                score: req.body.score, 
                enemyNick: req.body.enemyNick, 
                enemyPower: req.body.enemyPower, 
                ourHero: req.body.ourHero,
                enemyHero: req.body.enemyHero
            })
            await newWar.save()
            return res.status(200).json({message: 'Dodano'}) 

        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }

    async deleteWar(req, res){
        try{
            const id = req.params.id
            await GuildWars.deleteOne({_id: id})
            return res.status(200).json({message: 'War was delete'})
        }catch(err){
            return res.status(500).json({message: err.message})
        }          
    }

     async updateWar(req, res){  
        try{
            const id = req.params.id
            await GuildWars.deleteOne({_id: id})
           
            const newWar = new GuildWars({
                guildOwner: req.body.guildOwner,
                nameGuild: req.body.nameGuild, 
                position: req.body.position, 
                ourNick: req.body.ourNick, 
                ourPower: req.body.ourPower,
                score: req.body.score, 
                enemyNick: req.body.enemyNick, 
                enemyPower: req.body.enemyPower, 
                ourHero: req.body.ourHero,
                enemyHero: req.body.enemyHero
            })
            await newWar.save()
            return res.status(200).json({message: 'Zaktualizowano'})
        }catch(err){
            return res.status(500).json({message: err.message})
        }           
    }
}

module.exports = new WarsController()