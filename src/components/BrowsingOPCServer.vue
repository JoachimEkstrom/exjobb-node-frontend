<template>
    <div class="contaniner">
        <div class="navigation">
            <Button text="Browse Root folder on OPC Server" eventId="browseOPC" @click="browseOPCServer(hostname, OPCNodeId)"></Button>
            <Button v-if="topLevel === false" text="Go up one level" eventId="goBack" @click="goBack(hostname, lastOPCNodeId)"></Button>
        </div>
        <div class="currentFolder">Current folder: {{ currentFolder[currentFolder.length -1] }}</div>

        <div id="browser">
            <div v-for="(data, index) in browsedData" :key="index" class="oneElement">
                <div v-if="data.nodeClass === 2">
                    <p class="varName"> Variable name: {{data.name}} </p>
                    <div class="readVar">
                        <Button class="buttonReadVar" text="Read this variable" eventId="readVar" @click="readVar(hostname, data)"></Button>
                        <p class="readResults"> {{data.result}} </p>
                    </div>

                    <div class="writeDiv" v-if="data.readOnly === false">
                        <p class="writeP">Enter value to write : <input v-model="data.newValue" type="number"></p> 
                        <Button class="buttonWriteVar" text="Write to this variable" eventId="writeVar" @click="writeVar(hostname, data, data.newValue)"></Button>
                    </div>
                    <p class="noWrite" v-else>This variable has the access specifier "read only"</p>
                    
                </div>
                <div class="method" v-else-if="data.nodeClass === 4" >
                    <p class="methodName" @click="callMethod(hostname, data.id)">Method name: {{data.name}} </p>
                    <Button class="methodButton" text="Get method arguments" eventId="getArguments" @click="getArguments(hostname, data)"></Button>
                    <div v-for="(args, index) in methodArguments[0]" :key="index">
                        <p>{{args.name}} : <input v-model="methodArgs[index]" type="number"></p>                        
                    </div>
                    <Button class="methodButton" text="Call Method" eventId="callMethod" @click="callMethod(hostname, data, methodArgs)"></Button>
                    <p> {{data.result}} </p>
                </div>
                <p class="viewNextLevel" v-else @click="browseOPCServer(hostname, data.id, data.name)">  View: {{data.name}} </p>
            </div>    
        </div>
    </div>
</template>

<script>
import Button from '../components/Button.vue'
import { mapState, mapActions, mapMutations } from "vuex"
export default {
    name: 'BrowsingOPCServer',
    components: {
        Button,
    },
    computed: {
        ...mapState(['browsedData', 'methodArguments','lastOPCNodeId', 'topLevel', 'currentFolder']),
        
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
            newValue: "",
        }

    },
     methods: {

        ...mapActions(['updBrowsedData', 'updMethodArguments']),
        ...mapMutations({   pushNodeId: 'pushLastOPCNodeId', popNodeId:'popLastOPCNodeId', 
                            setTopLevel : 'setTopLevel', resetTopLevel : 'resetTopLevel',
                            pushCurrentFolder: 'pushCurrentFolder', popCurrentFolder: 'popCurrentFolder' }),

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
        writeVar(hostname, nodeData, newValue){
            console.log(newValue)
            fetch(`${hostname}/writeVariable`, {
                method: 'POST',
                headers: {"Access-Control-Allow-Origin" : '*', 'Content-Type': 'application/json'},
                body: JSON.stringify({nodeId:nodeData.id, newValue: newValue}),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data){
                    nodeData.result = data;
                }
                
                });
            
        },
        browseOPCServer(hostname, uri, name){
            this.pushNodeId(uri)
            this.resetTopLevel()
            if (!name){ name = "RootFolder"}
            this.pushCurrentFolder(name)
            this.updBrowsedData({hostname: hostname, uri: uri})   
        },
        goBack(hostname){
            this.popCurrentFolder()
            this.popNodeId()
            let uri = this.lastOPCNodeId[this.lastOPCNodeId.length -1]
            if (this.lastOPCNodeId.length === 0) {
                this.setTopLevel()
            }
            this.updBrowsedData({hostname: hostname, uri: uri})  
        }
     }
}
</script>

<style scoped>

.container {
    display:flex;
    width: 500px;

}
p {
    padding: 13px 10px;
}
.navigation {
    margin: 0px;
    background-color: var(--var-bg-colordark);
}
.currentFolder{
    padding-top: 15px;
}
#browser {
    margin: auto;
    width: 50%;
    padding: 20px auto;
    margin: 20px auto;

}
.oneElement {
    background-color:var(--var-primary);
    margin:  20px;
    border-radius: 25px;

}
.oneElement p {
    margin: 10 auto;
    align-content: center;
    justify-content: center;
}
.readVar{
    width: 75%;
    display: inline-flex;
}
.readResults{
    width: 50%;
    align-content:flex-end;
    margin: auto;
}
.noWrite {
    margin: 5px auto;
    padding: 5px;
}
.buttonReadVar{
    margin: auto;
    justify-content: center;
    padding: 5px 10px;
}

.writeP {
    margin: 5px auto;
    padding: 0px;
}
.buttonWriteVar{
    padding: 5px 10px;
}
.varName{
    margin: 0px;
    padding-top: 10px;
    padding-bottom: 0px;
}
.viewNextLevel{
    cursor: pointer;
}
.methodName{
    padding: 13px 10px;
}
.methodButton{
    padding: 13px 10px;
}

</style>