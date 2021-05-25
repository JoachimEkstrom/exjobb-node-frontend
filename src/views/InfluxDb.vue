<template>
    <div id="container">
        <AddToInfluxDB v-bind:hostname= host />

        <iframe id="iframe" src='http://localhost:3000/d-solo/_Ehr2dfMz/nodejs?orgId=1&refresh=5s&from=1620282173011&to=1620303773012&panelId=2'></iframe>
    </div>
</template>

<script>
import Button from '../components/Button.vue'
import AddToInfluxDB from '../components/AddToInfluxDB.vue'
import { mapState, mapActions } from "vuex"

export default {
    name: 'InfluxDb',
    components: {
        AddToInfluxDB,
        Button,
    },
    props: {
        host: {
            type: String,
            default: ''
        },
    },
    computed: {
        ...mapState(['browsedData', 'methodArguments']),
        
    },
    methods: {

        ...mapActions(['updBrowsedData', 'updMethodArguments']),
    },
}
</script>

<style scoped>
#container {
    width: 100%;
    height: 100%;
}

#iframe {
    width: 800px;
    height: 800px;
}

</style>