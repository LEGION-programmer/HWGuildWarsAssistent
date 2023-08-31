<template>
    <div class="con">
        <form v-on:submit.prevent="editData()">
            <ul>
                <li>
                    <label for="nameGuild">Enemy guild name: </label>
                    <input type="text" id="nameGuild" v-model="warInfo.nameGuild">
                </li>
                <li>
                    <label for="position">Position: </label>
                    <input type="text" id="position" v-model="warInfo.position">
                </li>
                <li>
                    <label for="ourNick">Our nick: </label>
                    <input type="text" id="ourNick" v-model="warInfo.ourNick">
                </li>
                <li>
                    <label for="ourPower">Our power: </label>
                    <input type="number" id="ourPower" v-model="warInfo.ourPower">
                </li>
                <li>
                    <label for="score">Score: </label>
                    <input type="number" id="score" v-model="warInfo.score">
                </li>
                <li>
                    <label for="enemyNick">Enemy Nikc: </label>
                    <input type="text" id="enemyNick" v-model="warInfo.enemyNick">
                </li>
                <li>
                    <label for="enemyPower">Enemy Power: </label>
                    <input type="text" id="enemyPower" v-model="warInfo.enemyPower">
                </li>
                <li>
                    <label for="enemyHeros">Enemy Heros: </label>
                    <input type="file" accept="image/*" id="enemyHeros" @change="uploadEnemyHeros">
                </li>
                <li>
                    <label for="ourHeros">Our Heros: </label>
                    <input type="file" accept="image/*" id="ourHeros" @change="uploadOurHeros">
                </li>
                <li>
                    <button>Edit</button>
                </li>
            </ul>
        </form>
        WARNING: PHOTOS MUST BE ADDED AGAIN OR THEY WILL NOT BE SAVED
    </div>
</template>
<script>
import { useWarStore } from '@/stores/warStore'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
    name: 'EditWar',
    props: ['item'],
    data(){
        return { 
            router: useRouter(),
            warStore: useWarStore(),
            warInfo: {
            guildOwner: '',
            nameGuild: '',
            position: '',
            ourNick: '',
            ourPower: '',
            score: '',
            enemyNick: '',
            enemyPower: '',
            ourHero: '',
            enemyHero: ''
        }
        }
    },
    methods: {
        uploadEnemyHeros(event){
            const file = event.target.files[0]

            if(file) {
                const reader = new FileReader()
                reader.onload = () => {
                    this.warInfo.ourHero = reader.result
                }
                reader.readAsDataURL(file)
            }
        },

        uploadOurHeros(event){
            const file = event.target.files[0]

            if(file) {
                const reader = new FileReader()
                reader.onload = () => {
                    this.warInfo.enemyHero = reader.result
                }
                reader.readAsDataURL(file)
            }
        },

        editData(){
            try{
                axios.put(`http://localhost:3000/wars/${this.warInfo._id}`, this.warInfo)
                .then(()=>{this.router.push({name: 'mainPage'})})
            }catch(err){
                console.log(err)
            }
        }
    },
    created: 
        async function(){
            try{
                let res = await axios.get(`http://localhost:3000/wars/${this.warStore.idToEdit}`)
                this.warInfo = res.data
            }catch(e){
                console.log(e)
            }
        }
}
</script>
<style scoped>
.con{
    background-color: #F5B700;
    color: #DC0073;
    width: 80%;
    border-radius: 50px;
    text-align: center;
    height: 450px;
}

ul{
    list-style: none;
    text-align: left;
}
</style>