<template>
    <div class="con" v-for="(item, _id) in items" :key="_id">
        <h1 class="nameGuild">{{ item.nameGuild }}</h1>
        <h2 class="position">{{ item.position }}</h2>
        <div class="ourPlayer">
            <h3 class="ourNick">{{ item.ourNick }}</h3>
            <img :src="item.ourHero" alt="dsa" class="ourHero">
            <p class="ourPower">{{ item.ourPower }}</p>
        </div>
        <h4 class="score">+{{ item.score }}</h4>
        <div class="enemyPlayer">
            <h3 class="enemyNick">{{ item.enemyNick }}</h3>
            <img :src="item.enemyHero" alt="dsa" class="enemyHero">
            <p class="enemyPower">{{ item.enemyPower }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'WarTemplate',
    props: ['items']
}
</script>
<style scoped>
.con{
    display: grid;
    grid-template-areas:
    "nameGuild position ."
    "ourPlayer score enemyPlayer";
}

.nameGuild{
    grid-area: nameGuild;
}

.position{
    grid-area: position;
}

.ourPlayer{
    grid-area: ourPlayer;
}

.enemyPlayer{
    grid-area: enemyPlayer;
}

.score{
    grid-area: score;
    align-self: center;
    font-size: 25px;
}
</style>