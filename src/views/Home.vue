<template>
  <div class="home">
    <h1>JavaScript and IoT</h1>
    <h3>-Node.js and the protocol OPC UA</h3>
    <img alt="Vue logo" src="../assets/OPCUASysmap.jpg">

  </div>
</template>

<script>

import OPC from '../views/OPC'

export default {
  name: 'Home',
  components: {
    OPC,
  }
}
</script>
<style scoped>
img {
  padding-top: 50px;
  width : 60%;

}
h1 {
  font-size: 72px;
  font-weight: 900;
  margin-bottom: 0px;
}

h3 {
  margin-top: 0px;
  padding-left : 200px;
  font-size: 30px;
  font-weight: 200;
  font-style: italic;
}
</style>
