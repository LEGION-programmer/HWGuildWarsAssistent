<template>
  <nav>
    <router-link to="/"></router-link>
    <router-link to="/mainPage"></router-link>
  </nav>
  <router-view/>
</template>
<style>
@font-face {
  font-family: ethnocentric; 
  src: url(ethnocentric.otf); 
}

*{
  font-family: ethnocentric;
}

body{
  background-color: #050041;
}
</style>
