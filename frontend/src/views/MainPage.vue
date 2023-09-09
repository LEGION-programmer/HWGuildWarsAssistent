<template>
    <div class="content">
        <div class="options">
            <h1 @click="logout" class="logout">Logout</h1>
            <AddWar class="addWar"/>
            <div class="filters">
                <PositionList @get-position="updatePosition"/>
                <SelectPlayer @get-player="updateOurPlayer"/>
            </div>
            <GuildList class="guildList" @get-guild-name="updateGuildName"/>
        </div>
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
import SelectPlayer from '@/components/SelectPlayer.vue'

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
<style scoped>
.content{
    display: grid;
    grid-template-areas: 
    "options"
    "guildTemplate"
    "footer"
    ;
    grid-template-rows: 475px 500px;
}

.options{
    display: grid;
    grid-area: options;
    grid-template-columns: 90px 500px 200px 200px;
    grid-template-areas: 
    "logout addWar filters guildList"
    ;
    align-items: start;
    justify-items: center;
    margin: 10px;
}

.logout{
    width: 90px;
    height: 20px;
    grid-area: logout;
}

.logout{
    background-color: #0A0079;
    color: #ff0202;
    font-size: 15px;
    padding: 3px;
    border-radius: 30px;
    border: 2px solid #A14DA0;
    transition: all 0.4s;
    text-align: center;
}

.logout:hover{
    cursor: pointer;
    box-shadow: 0 0 30px #ff0202;
}

.addWar{
    grid-area: addWar;
    justify-self: start;
    margin-left: 30px;
}

.filters{
    grid-area: filters;
    justify-self: center;
    background-color: #050041;
    color: #9D79BC;
    box-shadow: 0 0 50px #e6e6e6;
    border-radius: 30px;
    padding: 7px;
    margin-left: 110px;
}

.guildList{
    grid-area: guildList;
    justify-self: stretch;
}

.guild{
    grid-area: guildTemplate;
}

@media screen and (max-width: 1000px){
    .options{
        grid-template-areas: 
        "logout"
        "addWar"
        "filters"
        "guildList"
        ;
        justify-items: stretch;
    }
}
</style>