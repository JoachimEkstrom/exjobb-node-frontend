<template>
<div class="app">
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/OPC">OPC</router-link> |
    <router-link to="/influxdb">InfluxDb</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</div>
</template>

<style>
body{
  background-color: rgb(233, 233, 233);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app{
  background-color: rgb(233, 233, 233);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #415c77;
  font-size: 26px;
}

#nav a.router-link-exact-active {
  color: rgb(90, 166, 253);;
}
</style>
