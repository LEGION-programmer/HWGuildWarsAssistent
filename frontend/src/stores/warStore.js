import { defineStore } from 'pinia'


export const useWarStore = defineStore('warStore', {
    state: () => ({
        wars: [],
        filterWars: [],
        idToEdit: '',
        dataToEdit: []
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

        
    },
})