<template>
    <div>
        <button class="button" @click="clicked">{{text}}</button>
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

<style scoped>
.button {
    cursor: pointer;
    border: none;
    color: rgb(0, 0, 0);
    padding: 10px 20px;
    margin: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    border-radius: 6px;
    border: 1px solid #000000;
    transition-duration: 0.1s;
}
.button:hover {
  background-color: var(--var-bg-buttondark);
}
</style>