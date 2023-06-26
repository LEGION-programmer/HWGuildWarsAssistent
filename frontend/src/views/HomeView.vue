<template>
  <div class="home">
    <div class="register">
      <h1>Register</h1>
      <form v-on:submit.prevent="register">
        <ul>
          <li>
            <label for="guildName">GuildName:</label>
            <input type="text" id="guildName" v-model="registerData.guildName">
          </li>
          <li>
            <label for="server">Server:</label>
            <input type="number" id="server" v-model="registerData.server">
          </li>
          <li>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="registerData.password">
          </li>
          <li>
            <label for="cPassword">Confirm password:</label>
            <input type="password" id="cPassword" v-model="registerData.cPassword">
          </li>
        </ul>
        <button type="submit">Submit</button>
      </form>
      <p>{{ error }}</p>
    </div>
    <div class="login">
      <h1>Login</h1>
      <form v-on:submit.prevent="login">
        <ul>
          <li>
            <label for="loginGuildName">GuildName:</label>
            <input type="text" id="loginGuildName" v-model="loginData.guildName">
          </li>
          <li>
            <label for="loginServer">Server:</label>
            <input type="number" id="loginServer" v-model="loginData.server">
          </li>
          <li>
            <label for="loginPassword">Password:</label>
            <input type="password" id="loginPassword" v-model="loginData.password">
          </li>
        </ul>
        <button type="submit">Submit</button>
      </form>
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'HomeView',
  data(){
    return {
      loginData: {
        guildName: '',
        server: '',
        password: ''
      },
      registerData: {
        guildName: '',
        server: '',
        password: '',
        cPassword: ''
      },
      error: '',
      router: useRouter()
    }
  },
  methods: {
    async register(){
      try{
        const res = await axios.post('http://localhost:3000/register', this.registerData)
        this.error = res.data.message
            if(res.data.validationStatus == true){    
                window.localStorage.setItem('userid', res.data.guildId)
                window.localStorage.setItem('user', res.data.guildName)  
                this.router.push({ name: 'mainPage'})
            }
      }catch(e){
        console.log(e)
      }  
    },
    async login(){
      try{
        const res = await axios.post('http://localhost:3000/login', this.loginData)
        this.error = res.data.message
            if(res.data.validationStatus == true){    
                window.localStorage.setItem('userid', res.data.guildId)  
                window.localStorage.setItem('user', res.data.guildName)
                this.router.push({ name: 'mainPage'})
            }
      }catch(e){
        console.log(e)
      }
    }
  },
  created: 
    function(){
      if(localStorage.getItem('user')){
        this.router.push({ name: 'mainPage'})
      }
    }
}
</script>

<style scoped>
*{
  font-family: sans-serif;
}

.home{
  display: grid;
  height: 800px;
  justify-items: center;
  align-items: center;
  justify-content: center;
  align-content: center;
  text-align: center;
}

.login{
  width: 500px;
  height: 350px;
  background-color: #F5B700;
  border: 2px solid #00A1E4;
  border-radius: 50px;
  margin: 50px;
  padding: 20px;
}

.register{
  width: 500px;
  height: 350px;
  background-color: #F5B700;
  border: 2px solid #00A1E4;
  border-radius: 50px;
}

ul{
  list-style: none;
}
</style>
