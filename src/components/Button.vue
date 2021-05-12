<template>
    <div>
        <button @click="clicked">{{text}}</button>
    </div>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: {
            type: String,
            default: 'My Button'
        },
        eventId: {
            type: String,
            default: ''
        }
    },
    methods: {
        clicked(){
            this.$emit('clicked', this.eventId)
        }
    },
    
}
</script>