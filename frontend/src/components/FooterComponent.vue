<template>
    <div class="footer">
        <h1>Website created  by: <a href="https://legion-blog.netlify.app/#/" target="_blank">Tomasz Legion Kaczmarek</a></h1>
    </div>
</template>
<script>
export default {
    name: 'FooterComponent'
}
</script>
<style scoped>
.footer{
    display: grid;
    width: 90%;
    height: 50px;
    text-align: center;
    background-color: #050041;
    color: #9D79BC;
    box-shadow: 0 0 50px #e6e6e6;
    border-radius: 30px;
    margin: 20px;
    justify-self: center;
    align-items: end;
}

h1{
    font-size: 18px;
}

a{
    text-decoration: none;
    font-size: 20px;
}

@media screen and (max-width: 970px){
    .footer{
        width: 60%;
    }
}

@media screen and (max-width: 660px){
    .footer{
        width: 30%;
        height: 100px;
    }
}
</style>