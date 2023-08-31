<template>
    <div>
        <label for="player">{{ textInInput }}</label>
        <input type="text" id="player" v-model="player">
        <button @click="$emit('getPlayer', player)">Accept</button>
    </div>
</template>
<script>
export default {
    name: 'SelectPlayer',
    props: {
        textInInput: String
    },
    setup(){
        const player = ''

        return { player }
    }
}
</script>
<style scoped>
    
</style>