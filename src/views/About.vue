<template>
  <div class="about">
    <h1>About the Frontend for my final thesis</h1>
    <p>So, this Vue application serves as the frontend for my thesis about Node.js and OPC UA. 
      Since the majority of my time has been dedicated to working with the backend, I haven´t had that much time to invest in the frontend in regard to design and UX.
      However, this app still uses a lot of good to now stuff like VUEX, VueRouter, Components and so on. 
    </p>
    <p>The main point here is the OPC and InfluxDb components. These two are handles the communication to the backend application, OPC UA server and Grafana.
      The thesis main objective has been to figure out a way to work with the npm packet node-OPCUA and setup a communication to a OPC UA server placed on an Beckhoff TwinCAT runtime.
      The OPC component then handles browsing of the variables and methods found on that server. The InfluxDb component calls for a set of variables from said OPC UA server and then
      adjust the response data to aling with InfluxDBs inline protocol. This string is then sent to InfluxDb to be saved. Grafana, which is constantly reading the Db, will then plot the
      newly added data in the graf.
      </p>
    <p>More information about this project are to be found in the thesis itself.</p>

    <img alt="Vue logo" src="../assets/SystemMap.png">
    
  </div>
</template>

<style scoped>
.about {
  display:block;
}
h1 {
  margin-top: 50px;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 0px;
}
p {
  display: flex;
  padding: 0px;
  font-size: 16px;
  font-weight: 200;
  width: 75%;
  align-content: center;
  justify-content: center;
  margin: 20px auto;

}
img {
  padding-top: 30px;
  width : 60%;

}
</style>