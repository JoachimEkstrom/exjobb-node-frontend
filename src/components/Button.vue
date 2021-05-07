<template>
    <div>
        <button @click="pushed">{{text}}</button>
        <button @click="readOPC">READ</button>
    </div>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: {
            type: String,
            default: 'My Button'
        }
    },
    methods: {
        pushed(){
            fetch('http://localhost:3005/call', {
                method: 'POST',
                headers: {"Access-Control-Allow-Origin" : '*', 'Content-Type': 'application/json'},
                body: JSON.stringify({a: 10.54, b: 30.54}) 
            })
            .then(response => response.json())
            .then(data => console.log(data));
             
            
        },
        readOPC(){
            fetch('http://localhost:3005/read', {
                method: 'GET',
                headers: {"Access-Control-Allow-Origin" : '*', 'Content-Type': 'application/json'},
            })
            .then(response => response.json())
            .then(data => console.log(data));
             
            
        }
    }
    
}
</script>