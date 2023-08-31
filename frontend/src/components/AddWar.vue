<template>
    <div class="con">
        <h1>Add new War</h1>
        <form v-on:submit.prevent="sendDatas()">
            <ul>
                <li>
                    <label for="nameGuild">Enemy guild name: </label>
                    <input type="text" id="nameGuild" placeholder="The Guild" v-model="warInfo.nameGuild">
                </li>
                <li>
                    <label for="position">Position: </label>
                    <select name="selectPosition" id="selectPosition" v-model="warInfo.position" @change="$emit('getPosition', selectedValue)">
                        <option value="Barracks">Barracks</option>
                        <option value="Mage Academy">Mage Academy</option>
                        <option value="Lantern">Lantern</option>
                        <option value="Bridge">Bridge</option>
                        <option value="Spring of elements">Spring of elements</option>
                        <option value="Ice Bastion">Ice Bastion</option>
                        <option value="Fire Bastion">Fire Bastion</option>
                        <option value="Gate of Nature">Gate of Nature</option>
                        <option value="Foundry">Foundry</option>
                        <option value="Citadel">Citadel</option>
                    </select>
                </li>
                <li>
                    <label for="ourNick">Our nick: </label>
                    <input type="text" id="ourNick" placeholder="awsome player" v-model="warInfo.ourNick">
                </li>
                <li>
                    <label for="ourPower">Our power: </label>
                    <input type="number" id="ourPower" placeholder="123123" v-model="warInfo.ourPower">
                </li>
                <li>
                    <label for="score">Score: </label>
                    <input type="number" id="score" placeholder="20" v-model="warInfo.score">
                </li>
                <li>
                    <label for="enemyNick">Enemy Nikc: </label>
                    <input type="text" id="enemyNick" placeholder="noob player" v-model="warInfo.enemyNick">
                </li>
                <li>
                    <label for="enemyPower">Enemy Power: </label>
                    <input type="text" id="enemyPower" placeholder="321321" v-model="warInfo.enemyPower">
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
                    <button>Add</button>
                    {{ resMessage }}
                </li>
            </ul>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
import { useWarStore } from '@/stores/warStore'


export default {
    name: 'AddWar',
    setup(){
        const warStore = useWarStore()

        let warInfo = {
            guildOwner: localStorage.getItem('userid'),
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
        let resMessage

        const uploadEnemyHeros = (event) => {
            const file = event.target.files[0]

            if(file) {
                const reader = new FileReader()
                reader.onload = () => {
                    warInfo.ourHero = reader.result
                }
                reader.readAsDataURL(file)
            }
        }

        const uploadOurHeros = (event) => {
            const file = event.target.files[0]

            if(file) {
                const reader = new FileReader()
                reader.onload = () => {
                    warInfo.enemyHero = reader.result
                }
                reader.readAsDataURL(file)
            }
        }

        const sendDatas = async() =>{
            try{
                await axios.post('https://hw-wars-assistant.onrender.com/wars', warInfo)
                warStore.addWar(warInfo)
                window.location.reload()
            }catch(err){
                resMessage = err
            }
        }

        return { warInfo, resMessage, uploadEnemyHeros, uploadOurHeros, sendDatas }
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