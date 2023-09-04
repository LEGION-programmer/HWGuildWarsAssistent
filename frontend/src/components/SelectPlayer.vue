<template>
    <div class="findPlayer">
        <label for="player">Find player: </label>
        <input type="text" id="player" v-model="player">
        <h1 @click="$emit('getPlayer', player)">Accept</h1>
    </div>
</template>
<script>
export default {
    name: 'SelectPlayer',
    setup(){
        const player = ''

        return { player }
    }
}
</script>
<style scoped>
.findPlayer{
    display: grid;
    justify-items: center;
}

label{
    font-size: 15px;
    color: #9D79BC;
}

input{
    background-color: #0A0079;
    border: 2px solid #A14DA0;
    border-radius: 30px;
    color: #8CA0D7;
    width: 80%;
    height: 25px;
}

h1{
    display: inline-block;
    position: relative;
    font-size: 15px;
    text-align: center;
    padding: 5px;
    border-radius: 50px;
    overflow: hidden;
    font-size: 15px;
    text-align: center;
    width: 70%;
    height: 20px;
    background-color: #0A0079;
    border: 2px solid #A14DA0;
    border-radius: 30px;
    color: #8CA0D7;
    transition: all 0.5s;
}

h1:hover{
    cursor: pointer;
    box-shadow: 0 0 30px #e6e6e6;
    border: 2px solid #9D79BC;
}

h1::after{
    content: "<<";
    position: absolute;
    left: 150px;
    opacity: 1;
}

h1:hover::after{
    animation: animateAfterHover 0.3s forwards;
}

h1:not(hover)::after{
    animation: animateAfterNotHover 0.3s forwards;
}

h1::before{ 
    content: ">>";
    position: absolute;
    left: 15px;
    opacity: 0;
}

h1:hover::before{
    animation: animateBeforeHover 0.3s forwards;
}

h1:not(hover)::before{
    animation: animateBeforeNotHover 0.3s forwards;
}

@keyframes animateAfterHover{
    from{
        left: 180px;
        opacity: 0;
    }
    to{
        left: 130px;
        opacity: 1;
    }
}

@keyframes animateAfterNotHover{
    from{
        left: 130px;
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
        left: 15px;
        opacity: 1;
    }
}

@keyframes animateBeforeNotHover{
    from{
        left: 15px;
        opacity: 1;
    }
    to{
        left: -15px;
        opacity: 0;
    }
}
</style>