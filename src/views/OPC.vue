<template>
    <div>
        <Button text="Read InfluxDB String" eventId="readOPC" @clicked="readDataForInfluxDb"></Button>
        <Button text="Browse Root folder on OPC Server" eventId="browseOPC" @click="browseOPC(OPCNodeId)"></Button>
        <div >
            <div v-for="(data, index) in browsedData" :key="index">
                <div v-if="data.nodeClass === 2">
                    <p> Variable: {{data.name}} </p>
                    <Button text="Read Variable" eventId="readVar" @click="readVar(data)"></Button>
                    <p> {{data.result}} </p>
                </div>
                <div v-else-if="data.nodeClass === 4" >
                    <p @click="callMethod(data.id)">Method: {{data.name}} </p>
                    <input v-model="data.arguments[0]" type="number">
                    <input v-model="data.arguments[1]" type="number">
                    <Button text="Call Method" eventId="callMethod" @click="callMethod(data, data.arguments)"></Button>
                    <p> {{data.result}} </p>
                </div>
                <p v-else @click="browseOPC(data.id)"> {{data.name}} </p>
            </div>
            
        </div>

    </div>
</template>

<script>
import Button from '../components/Button.vue'
import { mapMutations, mapState, mapActions } from "vuex"

export default {
    name: 'Home',
    components: {
        Button,
    },
    computed: {
        ...mapState(['browsedData']),
    },
    data() {
        return {
            OPCNodeId : "RootFolder",
            clickedOPCNodeId : "",
            browsingData : [],
            methodResponse: "",
        }

    },
     methods: {

        ...mapMutations(['updateBrowsedData']),
        ...mapActions(['updBrowsedData']),

        callMethod(nodeData, arg){

            fetch('http://localhost:3005/callMethod', {
                method: 'POST',
                headers: {"Access-Control-Allow-Origin" : '*', 'Content-Type': 'application/json'},
                body: JSON.stringify({uri: nodeData.id, a: arg[0], b: arg[1]}) 
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                nodeData.result = data;
                });
             
            
        },
        readDataForInfluxDb(){
            fetch('http://localhost:3005/read', {
                method: 'GET',
                headers: {"Access-Control-Allow-Origin" : '*', 'Content-Type': 'application/json'},
            })
            .then(response => response.json())
            .then(data => console.log(data));
             
            
        },
        readVar(nodeData){
            fetch('http://localhost:3005/readvariable', {
                method: 'POST',
                headers: {"Access-Control-Allow-Origin" : '*', 'Content-Type': 'application/json'},
                body: JSON.stringify({nodeId:nodeData.id}),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                nodeData.result = data;
                });
             
            
        },
        browseOPC(uri){

            this.updBrowsedData({uri: uri})
             
            
        }
     }
}
</script>

<style scoped>


</style>