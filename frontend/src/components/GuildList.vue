<template>
  <div class="container">
    <h1 @click="showHide = !showHide">Guild List</h1>
    <div class="guilds" v-show="showHide">
      <ul>
        <li v-for="(item, index) in warStore.getAllGuildOneTime" 
        :key="index"
        @click="$emit('getGuildName', item)"
        >
        {{ item }}
      </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useWarStore } from '@/stores/warStore'
import { ref } from 'vue'

export default {
  name: 'GuildList',
  setup(){
    const warStore = useWarStore()
    let showHide = ref(false)
    return { warStore, showHide }
  },

}
</script>

<style scoped>
.container{
  position: absolute;
  right: 30px;
  background-color: #050041;
  color: #9D79BC;
  width: 200px;
  height: auto;
  border-radius: 50px;
  text-align: center;
  box-shadow: 0 0 50px #e6e6e6;
}

.guilds{
  width: 95%;
  height: 300px;
  overflow-y: scroll;
}

.guilds::-webkit-scrollbar{
  background-color: #050041;
  border: 2px solid #A14DA0;
  border-radius: 10px;
}

.guilds::-webkit-scrollbar-thumb{
  background-color: #9D79BC;
}

h1{
  font-size: 18px;
}

ul{
  list-style: none;

}

@media screen and (max-width: 1000px){
  .container{
    position: relative;
  }
}
</style>
