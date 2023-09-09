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
                axios.put(`https://localhost:3000/wars/${this.warInfo._id}`, this.warInfo)
                .then(()=>{this.router.push({name: 'mainPage'})})
            }catch(err){
                console.log(err)
            }
        }
    },
    created: 
        async function(){
            try{
                let res = await axios.get(`https://localhost:3000/${this.warStore.idToEdit}`)
                this.warInfo = res.data
            }catch(e){
                console.log(e)
            }
        }
}
</script>
<style scoped>
.con{
    display: grid;
    background-color: #050041;
    color: #9D79BC;
    width: 70%;
    height: 500px;
    border-radius: 50px;
    text-align: center;
    box-shadow: 0 0 50px #e6e6e6;
    justify-items: center;
    align-items: center;
}

ul{
    list-style: none;
    text-align: left;
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
        left: 180px;
        opacity: 0;
    }
    to{
        left: 120px;
        opacity: 1;
    }
}

@keyframes animateAfterNotHover{
    from{
        left: 120px;
        opacity: 0;
    }
    to{
        left: 180px;
        opacity: 1;
    }
}

@keyframes animateBeforeHover{
    from{
        left: -15px;
        opacity: 0;
    }
    to{
        left: 40px;
        opacity: 1;
    }
}

@keyframes animateBeforeNotHover{
    from{
        left: 40px;
        opacity: 1;
    }
    to{
        left: -15px;
        opacity: 0;
    }
}
</style>