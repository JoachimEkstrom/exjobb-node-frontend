<template>
    <div>
        <Button text="Read InfluxDB String" eventId="readOPC" @clicked="readDataForInfluxDb(hostname)"></Button>

        <div v-if="InfluxDBResponse.status === 204">
            <h2>Response from InfluxDb</h2>
            <p>Data string sent to to InfluxDB with status 204</p>
            <p>{{InfluxDBResponse.data}}</p>
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
    computed: {
        ...mapState(['InfluxDBResponse']),
    },
     methods: {
         ...mapActions(['updInfluxDBResponse']),

        readDataForInfluxDb(hostname){
            fetch(`${hostname}/addToInfluxDb`, {
                method: 'GET',
                headers: {"Access-Control-Allow-Origin" : '*', 'Content-Type': 'application/json'},
            })
            .then(response => response.json())
            .then(data => {
                this.updInfluxDBResponse({res: data})   
                }); 
        },
     }
}
</script>

<style scoped>

</style>