<template>
    <div id="container">
        <AddToInfluxDB v-bind:hostname= host />

        <iframe id="iframe" src='http://localhost:3000/d-solo/QCmeK93Mk/examensarbete?orgId=1&refresh=5s&panelId=2'></iframe>
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
    height: 400px;
}

</style>