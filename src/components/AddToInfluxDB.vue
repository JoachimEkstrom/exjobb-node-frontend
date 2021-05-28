<template>
    <div>
        <div class="buttons">
            <Button text="Read InfluxDB String" eventId="readOPC" @clicked="readDataForInfluxDb(hostname)"></Button>
            <Button text="Start continuous query" eventId="startQuery" @click="startContinuousQuery(hostname, time)"/>
            <Button text="Stop continuous query" eventId="stopQuery" @click="stopContinuousQuery()" />
        </div>
        <div v-if="InfluxDBResponse === 1">
            <h2>Response from InfluxDb</h2>
            <p> </p>
            <p> </p>
        </div>
        <div v-else-if="InfluxDBResponse.status === 204">
            <h2>Response from InfluxDb</h2>
            <p>Data string sent to to InfluxDB with status 204</p>
            <p>{{InfluxDBResponse.data}}</p>
        </div>
        <div v-else>
            <h2>Response from InfluxDb</h2>
            <p>{{InfluxDBResponse}}</p>
            <p> </p>
        </div>   
    </div>
</template>

<script>
import Button from '../components/Button.vue'
import { mapState, mapActions } from "vuex"
export default {
    name: 'AddToInfluxDB',
    components: {
        Button,
    },
    props: {
        hostname: {
            type: String,
            default: ''
        },
    },
    data() { 
        return {
            isContinuousQuery : false,
            interval : "",
            time : 1000,
        } 
    },
    computed: {
        ...mapState(['InfluxDBResponse']),
    },
     methods: {
         ...mapActions(['startSingleQuery']),

        readDataForInfluxDb(hostname){
            this.startSingleQuery({hostname: hostname})
        },
        startContinuousQuery(hostname, time){
            this.interval = setInterval(()=> {
                this.startSingleQuery({hostname: hostname})
            }, time)
            
        },
        stopContinuousQuery(){
            clearInterval(this.interval)
        },
     }
}
</script>

<style scoped>
.buttons{
    display: flex;
    margin: auto;
    justify-content: center;
}
</style>