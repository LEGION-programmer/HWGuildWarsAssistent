import { defineStore } from 'pinia'


export const useWarStore = defineStore('warStore', {
    state: () => ({
        wars: [],
        filterWars: [],
        filters: {
            guildName: '',
            position: '',
            ourNick: '',
            enemyNick: ''
        },
        idToEdit: '',
        dataToEdit: []
    }),

    actions: {
        addWar(war){
            this.wars.push(war)
        },

        deleteWar(id){
            const newWar = [...this.wars].filter(t => t._id !== id)
            this.wars = newWar
        },

        clearFilters(){
            this.filterWars = []
        },

        filterByGuildName(guildName){
            this.wars.forEach((el) => {
                if(el.nameGuild === guildName){
                    this.filterWars.push(el)
                }
                this.filters.guildName = guildName
                return this.filterWars
            })
        },

        filterWarsByOtherProperties(){
            const firstSort = []
            const secendSort = []
            this.wars.forEach((el)=>{
                if(el.position === this.filters.position){
                    firstSort.push(el)
                }
            }) 
            if(this.filters.ourNick !== '' || this.filters.enemyNick !== ''){
                this.wars.forEach((el)=>{
                    if(el.ourNick.indexOf(this.filters.ourNick) === 0 || el.enemyNick.indexOf(this.filters.enemyNick) === 0 && el.guildName === this.filters.guildName){
                        secendSort.push(el)
                    }
                })
                return this.filterWars = secendSort
            }
            return this.filterWars = firstSort
        },
    },
    getters: {
        getAllGuildOneTime(){
            const unikalneWartosci = new Set();
            const unikalneNazwyGuild = [];
          
            this.wars.forEach((element) => {
              if (!unikalneWartosci.has(element.nameGuild)) {
                unikalneWartosci.add(element.nameGuild);
                unikalneNazwyGuild.push(element.nameGuild);
              }
            });
          
            return unikalneNazwyGuild;
        }
    }
})