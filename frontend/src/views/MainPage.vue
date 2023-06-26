<template>
    <div class="content">
        <button @click="logout" class="logout">Logout</button>
        <AddWar />
        <GuildList class="menu"/>
        <div class="guild">
            <WarTemplate :items="warStore.filterWars"/>
        </div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { useWarStore } from '../stores/warStore'
import axios from 'axios'
import GuildList from '@/components/GuildList.vue'
import WarTemplate from '../components/WarTemplate.vue'
import AddWar from '../components/AddWar.vue'

export default{
    name: 'BurgSchreckenfels',
    components: {
        GuildList,
        WarTemplate,
        AddWar
    },
    setup(){
        const warStore = useWarStore()
        const router = useRouter()

        return {warStore, router}
    },

    methods: {
        logout(){
            localStorage.removeItem('user')
            this.router.push({ name: 'home'})
        }
    },

    created: 
        // get all information about wars
        async function(){
            try{
                let res = await axios.get(`http://localhost:3000/wars`)
                this.warStore.getAllWars(res.data)
            }catch(e){
                console.log(e)
            }
        },    
}
    
    

</script>
<style>
.content{
    display: flex;
    flex-direction: row;
}

.logout{
    height: 50px;
}

.guild{
    background-color: #F5B700;
    color: #DC0073;
    width: 80%;
    border-radius: 50px;
    text-align: center;
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