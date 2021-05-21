<template>
    <div>
        <Button text="Browse Root folder on OPC Server" eventId="browseOPC" @click="browseOPCServer(hostname, OPCNodeId)"></Button>
        <div >
            <div v-for="(data, index) in browsedData" :key="index">
                <div v-if="data.nodeClass === 2">
                    <p> Variable: {{data.name}} </p>
                    <Button text="Read Variable" eventId="readVar" @click="readVar(hostname, data)"></Button>
                    <p> {{data.result}} </p>
                </div>
                <div v-else-if="data.nodeClass === 4" >
                    <p @click="callMethod(hostname, data.id)">Method: {{data.name}} </p>
                    <Button text="Get arguments" eventId="getArguments" @click="getArguments(hostname, data)"></Button>
                    <div v-for="(args, index) in methodArguments[0]" :key="index">
                        <p>{{args.name}} : <input v-model="methodArgs[index]" type="number"></p>                        
                    </div>
                    <Button text="Call Method" eventId="callMethod" @click="callMethod(hostname, data, methodArgs)"></Button>
                    <p> {{data.result}} </p>
                </div>
                <p v-else @click="browseOPCServer(hostname, data.id)"> {{data.name}} </p>
            </div>    
        </div>
    </div>
</template>

<script>
import Button from '../components/Button.vue'
import { mapState, mapActions } from "vuex"
export default {
    name: 'BrowsingOPCServer',
    components: {
        Button,
    },
    computed: {
        ...mapState(['browsedData', 'methodArguments']),
    },
    props: {
        hostname: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            OPCNodeId : "RootFolder",
            clickedOPCNodeId : "",
            methodResponse: "",
            methodArgs : [],
        }

    },
     methods: {

        ...mapActions(['updBrowsedData', 'updMethodArguments']),

        callMethod(hostname, nodeData, arg){
            fetch(`${hostname}/callMethod`, {
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
        getArguments(hostname, nodeData){

            this.updMethodArguments({hostname: hostname, nodeData: nodeData})  
             
       },
        readDataForInfluxDb(hostname){
            fetch(`${hostname}/addToInfluxDb`, {
                method: 'GET',
                headers: {"Access-Control-Allow-Origin" : '*', 'Content-Type': 'application/json'},
            })
            .then(response => response.json())
            .then(data => console.log(data));
             
            
        },
        readVar(hostname, nodeData){
            fetch(`${hostname}/readvariable`, {
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
        browseOPCServer(hostname, uri){
            console.log(hostname)
            this.updBrowsedData({hostname: hostname, uri: uri})   
        }
     }
}
</script>

<style scoped>

</style>