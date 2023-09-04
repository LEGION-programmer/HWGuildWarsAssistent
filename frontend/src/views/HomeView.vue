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
    <FooterComponent />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import axios from 'axios'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'HomeView',
  components: {
    FooterComponent
  },
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
        const res = await axios.post('https://hw-wars-assistant.onrender.com/register', this.registerData)
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
        const res = await axios.post('https://hw-wars-assistant.onrender.com/login', this.loginData)
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
.home{
  display: grid;
  height: 800px;
  justify-items: center;
  align-items: center;
  justify-items: center;
  align-items: center;
  text-align: center;
}

.login{
  width: 500px;
  height: 350px;
  background-color: #050041;
  color: #9D79BC;
  border-radius: 50px;
  margin: 50px;
  padding: 20px;
  box-shadow: 0 0 50px #e6e6e6
}

.register{
  width: 500px;
  height: 350px;
  background-color: #050041;
  color: #9D79BC;
  border-radius: 50px;
  box-shadow: 0 0 50px #e6e6e6
}

ul{
  list-style: none;
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

button{
    display: inline-block;
    position: relative;
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
        left: 115px;
        opacity: 1;
    }
}

@keyframes animateAfterNotHover{
    from{
        left: 115px;
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
