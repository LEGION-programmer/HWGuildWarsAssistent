import { defineStore } from 'pinia'


export const useWarStore = defineStore('warStore', {
    state: () => ({
        wars: [],
        filterWars: []
    }),

    actions: {
        async getAllWars(wars){
            this.wars.push(wars)
            this.filterWars = wars
        },

        addWar(war){
            this.wars.push(war)
        },

        deleteWar(id){
            const newWar = [...this.wars].filter(t => t._id !== id)
            this.wars = newWar
        },

        editWar(id, war){       
            const newValues = {
                _id: war._id,
                nameGuild: war.nameGuild,
                position: war.position,
                ourHero: war.ourHero,
                ourNick: war.ourNick,
                ourPower: war.ourPower,
                score: war.score,
                enemyNick: war.enemyNick,
                enemyPower: war.enemyPower,
                enemyHero: war.enemyHero,
            }
            localStorage.removeItem(id)
            localStorage.setItem(id, JSON.stringify(newValues))
     
        }
    },
    
})