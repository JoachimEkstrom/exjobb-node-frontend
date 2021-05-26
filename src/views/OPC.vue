<template>
    <div>
        
        <BrowsingOPCServer v-bind:hostname= host />
    </div>
</template>

<script>

import AddToInfluxDB from '../components/AddToInfluxDB.vue'
import BrowsingOPCServer from '../components/BrowsingOPCServer.vue'

export default {
    name: 'OPC',
    components: {
        AddToInfluxDB,
        BrowsingOPCServer,
    },
    props: {
        host: {
            type: String,
            default: ''
        },
    },
}
</script>

<style scoped>


</style>