<template>
  <div class="container">
    <h1>Guild List</h1>
    <ul>
      <li v-for="(item, index) in warStore.getAllGuildOneTime" 
      :key="index"
      @click="$emit('getGuildName', item)"
      >
      {{ item }}
    </li>
    </ul>
  </div>
</template>

<script>
import { useWarStore } from '@/stores/warStore';

export default {
  name: 'GuildList',
  setup(){
    const warStore = useWarStore()
    return { warStore }
  },

}
</script>

<style scoped>
.container{
  background-color: #F5B700;
  display: grid;
  width: 15%;
  border-radius: 50px;
  justify-items: center;
  align-content: start;
  margin: 20px;
  padding: 5px;
  height: auto;
}

.container>span{
  width: 100px;
  height: 50px;
  background-color: #89FC00;
  color: #DC0073;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 5px;
  padding: 5px;
  border: 2px solid #00A1E4;
  border-radius: 50px;
  cursor: pointer;
}
</style>
