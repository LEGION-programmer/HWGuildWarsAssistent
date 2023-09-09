<template>
    <div class="con" v-for="(item, _id) in items" :key="_id" @change="warStore.filterWars">
        <h1 class="nameGuild">{{ item.nameGuild }}</h1>
        <h2 class="position">{{ item.position }}</h2>
        <div class="options">
            <h6 @click="getDataToEdit(item._id)">Edit War</h6>
            <h6 @click="deleteWar(item._id)">Delete War</h6>
        </div>
        <div class="ourPlayer">
            <h3 class="ourNick">{{ item.ourNick }}</h3>
            <img :src="item.ourHero" alt="dsa" class="ourHero">
            <p class="ourPower">{{ item.ourPower }}</p>
        </div>
        <h4 class="score">+{{ item.score }}</h4>
        <div class="enemyPlayer">
            <h3 class="enemyNick">{{ item.enemyNick }}</h3>
            <img :src="item.enemyHero" alt="dsa" class="enemyHero">
            <p class="enemyPower">{{ item.enemyPower }}</p>
        </div>
    </div>
</template>
<script>
import { useWarStore } from '@/stores/warStore'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
    name: 'WarTemplate',
    props: ['items'],

    setup(){
        const warStore = useWarStore()
        const router = useRouter()

        const deleteWar = async(id) => {
            try{
                await axios.delete(`https://localhost:3000/wars/${id}`)
                warStore.deleteWar(id)
                window.location.reload()
            }catch(err){
                console.log(err)
            }
        }

        const getDataToEdit = (id) => {
            warStore.idToEdit = id
            router.push({name: 'editWar'})
        }

        return { deleteWar, getDataToEdit, warStore }
    }
}
</script>
<style scoped>
.con{
    display: grid;
    grid-template-areas:
    "nameGuild position options"
    "ourPlayer score enemyPlayer";
    margin: 20px;
    background-color: #050041;
    color: #9D79BC;
    border-radius: 50px;
    padding: 10px;
    box-shadow: 0 0 50px #e6e6e6;
    justify-items: center;
}

.nameGuild{
    grid-area: nameGuild;
}

.position{
    grid-area: position;
}

.options{
    grid-area: options;
    font-size: 18px;
}

.options>h6:hover{
    cursor: pointer;
}

.ourPlayer{
    grid-area: ourPlayer;
}

.enemyPlayer{
    grid-area: enemyPlayer;
}

.score{
    grid-area: score;
    align-self: center;
    font-size: 25px;
}
</style>