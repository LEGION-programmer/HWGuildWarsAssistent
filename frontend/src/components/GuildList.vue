<template>
  <div class="container">
    <ul v-for="(item, index) in list" :key="index">
      <li>{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { useWarStore } from '@/stores/warStore';

export default {
  name: 'GuildHeader',
  setup(){
    const warStore = useWarStore()
    const list = []
    warStore.wars[0].forEach(element => {
      if(!list.includes(element.nameGuild)){
        list.push(element.nameGuild)
      }
    })
    return { list }
  }
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
