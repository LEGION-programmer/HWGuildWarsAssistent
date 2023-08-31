<template>
    <div class="content">
        <button @click="logout" class="logout">Logout</button>
        <AddWar class="addWar"/>
        <GuildList class="menu" @get-guild-name="updateGuildName"/>
        <PositionList @get-position="updatePosition"/>
        <SelectPlayer :textInInput="'Our player: '" @get-player="updateOurPlayer"/>
        <div class="guild">
            <WarTemplate :items="dataToRender" />
        </div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { useWarStore } from '../stores/warStore'
import { ref } from 'vue'
import axios from 'axios'
import GuildList from '@/components/GuildList.vue'
import WarTemplate from '../components/WarTemplate.vue'
import AddWar from '../components/AddWar.vue'
import PositionList from '@/components/PositionList.vue'
import SelectPlayer from './SelectPlayer.vue'

export default{
    name: 'MainPage',
    components: {
        GuildList,
        WarTemplate,
        AddWar,
        PositionList,
        SelectPlayer
    },
    data(){
        return {
            warStore: useWarStore(),
            router: useRouter(),
            dataToRender: ref([])
        }
    },

    methods: {
        updateGuildName(filter){
            this.dataToRender = []
            this.warStore.clearFilters()
            this.warStore.filterByGuildName(filter)
            this.dataToRender = [...this.warStore.filterWars]
        },

        updatePosition(position){
            this.warStore.filters.position = position
            this.warStore.filterWarsByOtherProperties()
            this.dataToRender = [...this.warStore.filterWars]
        },

        updateOurPlayer(player){
            this.warStore.filters.ourNick = player
            this.warStore.filterWarsByOtherProperties()
            this.dataToRender = [...this.warStore.filterWars]
        },

        logout(){
            localStorage.removeItem('user')
            this.router.push({ name: 'home'})
        }
    },

    created: 
        // get all information about wars
        async function(){
            try{
                let res = await axios.get(`https://hw-wars-assistant.onrender.com/wars`)
                
                res.data[0].forEach(element => {
                    this.warStore.wars.push(element)
                });
            }catch(e){
                console.log(e)
            }
        },    
}
    
</script>
<style>
.content{
    display: grid;
    grid-template-areas: 
    "addWar . logout"
    "guildList guildList wars"
    ;
}

.logout{
    width: 15%;
    height: 50px;
    grid-area: logout;
    justify-self: end;
}

.addWar{
    grid-area: addWar;
}

.menu{
    grid-area: guildList;
}

.guild{
    background-color: #F5B700;
    color: #DC0073;
    width: 100%;
    border-radius: 50px;
    text-align: center;
    grid-area: wars;
    justify-self: end;
}

.info{
    background-color: #89FC00;
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-template-areas: 
    "myHero myNick score enemyNick enemyHero"
    ". myPower . enemyPower ."
    ;
    border: 2px solid #00A1E4;
    border-radius: 50px;
    margin: 10px;
    padding: 5px;
    justify-items: center;
    align-items: center;
}
</style>