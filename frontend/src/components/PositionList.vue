<template>
    <div>
        <label for="selectPosition">Select Position</label>
        <select name="selectPosition" id="selectPosition" v-model="selectedValue" @change="$emit('getPosition', selectedValue)">
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
    </div>
</template>
<script>
export default {
    name: 'PositionList',
    setup(){
    const selectedValue = ''

    return { selectedValue }
    }
}
</script>
<style scoped>
    
</style>