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
:root {
     --var-bg-color: rgb(233, 233, 233);
     --var-primary: #91ccff;
     --var-secondary: #9195ff;
     --var-bg-colordark: rgb(202, 202, 202);
     --var-bg-buttondark: rgb(209, 209, 209);
  }

body{
  background-color: var(--var-bg-color);
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app{
  background-color: var(--var-bg-color);
}

#nav {
  padding: 30px 0px;
  background-color: var(--var-bg-color);
}

#nav a {
  font-weight: bold;
  color: var(--var-primary);
  font-size: 26px;
}

#nav a.router-link-exact-active {
  color: var(--var-secondary);
}
</style>
