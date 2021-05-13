import { createStore } from "vuex"

const store = createStore({
    state() {
        return {
            browsedData: [],
            InfluxDBResponse: {},
        }
    },
    mutations: {
        updateBrowsedData(state, data) {
            state.browsedData = data
        },
        updateInfluxDBResponse(state, data) {
            state.InfluxDBResponse = data
        },
    },
    actions: {
        async updBrowsedData(context, { uri: uri }) {
            fetch("http://localhost:3005/browseOPCServer", {
                method: "POST",
                headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
                body: JSON.stringify({ uri: uri }), //"ns=7;s=MAIN"
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    context.commit("updateBrowsedData", data)
                })
        },
        async updInfluxDBResponse(context, { res: res }) {
            context.commit("updateInfluxDBResponse", res)
        },
    },
    modules: {},
})

export default store
