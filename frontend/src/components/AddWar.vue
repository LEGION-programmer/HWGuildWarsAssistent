<template>
    <div class="con">
        <h1 @click="showHide = !showHide">Add new War</h1>
        <form v-on:submit.prevent="sendDatas()">
            <ul v-show="showHide">
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
                    <label for="enemyHeros" class="input-file">Enemy Heros: 
                        <input type="file" accept="image/*" id="enemyHeros" @change="uploadEnemyHeros">
                    </label>
                </li>
                <li>
                    <label for="ourHeros"  class="input-file">Our Heros: 
                        <input type="file" accept="image/*" id="ourHeros" @change="uploadOurHeros">
                    </label>
                </li>
                <li>
                    <button type="submit">Add</button>
                    {{ resMessage }}
                </li>
            </ul>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
import { useWarStore } from '@/stores/warStore'
import { ref } from 'vue'

export default {
    name: 'AddWar',
    setup(){
        const warStore = useWarStore()
        let showHide = ref(false)
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

        return { warInfo, resMessage, showHide, uploadEnemyHeros, uploadOurHeros, sendDatas }
    }
}
</script>
<style scoped>
.con{
    display: grid;
    background-color: #050041;
    color: #9D79BC;
    width: 450px;
    height: auto;
    border-radius: 50px;
    text-align: center;
    box-shadow: 0 0 50px #e6e6e6;
}

h1{
    cursor: pointer;
}

ul{
    list-style: none;
    text-align: left;
}

label{
    font-size: 12px;
}

input{
    background-color: #0A0079;
    margin: 5px;
    border: 2px solid #A14DA0;
    border-radius: 30px;
    color: #8CA0D7;
    width: 50%;
}

select{
    background-color: #0A0079;
    border: 2px solid #A14DA0;
    border-radius: 30px;
    color: #8CA0D7;
}

input[type=file]::file-selector-button{
    background-color: #050041;
    border: 2px solid #A14DA0;
    border-radius: 30px;
    color: #8CA0D7;
}

button{
    display: inline-block;
    position: relative;
    margin-left: 25%;
    font-size: 15px;
    text-align: center;
    padding: 5px;
    border-radius: 50px;
    overflow: hidden;
    transition: all 0.5s;
    font-size: 15px;
    text-align: center;
    width: 30%;
    height: 40px;
    background-color: #0A0079;
    border: 2px solid #A14DA0;
    border-radius: 30px;
    color: #8CA0D7;
}

button:hover{
    cursor: pointer;
    box-shadow: 0 0 30px #e6e6e6;
    border: 2px solid #9D79BC;
}

button::after{
    content: "<<";
    position: absolute;
    left: 140px;
    opacity: 1;
}

button:hover::after{
    animation: animateAfterHover 0.3s forwards;
}

button:not(hover)::after{
    animation: animateAfterNotHover 0.3s forwards;
}

button::before{ 
    content: ">>";
    position: absolute;
    left: 15px;
    opacity: 0;
}

button:hover::before{
    animation: animateBeforeHover 0.3s forwards;
}

button:not(hover)::before{
    animation: animateBeforeNotHover 0.3s forwards;
}

@keyframes animateAfterHover{
    from{
        left: 120px;
        opacity: 0;
    }
    to{
        left: 90px;
        opacity: 1;
    }
}

@keyframes animateAfterNotHover{
    from{
        left: 90px;
        opacity: 0;
    }
    to{
        left: 120px;
        opacity: 1;
    }
}

@keyframes animateBeforeHover{
    from{
        left: -15px;
        opacity: 0;
    }
    to{
        left: 10px;
        opacity: 1;
    }
}

@keyframes animateBeforeNotHover{
    from{
        left: 10px;
        opacity: 1;
    }
    to{
        left: -15px;
        opacity: 0;
    }
}
</style>