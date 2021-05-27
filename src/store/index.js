import { createStore } from "vuex"

const store = createStore({
    state() {
        return {
            browsedData: [],
            InfluxDBResponse: 1,
            methodArguments: [],
            isContinuousQuering: false,
            lastOPCNodeId: [],
            topLevel: true,
        }
    },
    mutations: {
        updateBrowsedData(state, data) {
            state.browsedData = data
        },
        updateInfluxDBResponse(state, data) {
            state.InfluxDBResponse = data
        },
        updateMethodArguments(state, data) {
            state.methodArguments = data
        },
        updateQuering(state, data) {
            state.isContinuousQuering = data
        },
        pushLastOPCNodeId(state, data) {
            state.lastOPCNodeId.push(data)
        },
        popLastOPCNodeId(state, data) {
            state.lastOPCNodeId.pop()
        },
        setTopLevel(state, data) {
            state.topLevel = true
        },
        resetTopLevel(state, data) {
            state.topLevel = false
        },
    },
    actions: {
        async updBrowsedData(context, { hostname: hostname, uri: uri }) {
            fetch(`${hostname}/browseOPCServer`, {
                method: "POST",
                headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
                body: JSON.stringify({ uri: uri }), //"ns=7;s=MAIN"
            })
                .then((response) => response.json())
                .then((data) => {
                    context.commit("updateBrowsedData", data)
                })
        },
        async updInfluxDBResponse(context, { res: res }) {
            context.commit("updateInfluxDBResponse", res)
        },
        async updMethodArguments(context, { hostname: hostname, nodeData: nodeData }) {
            fetch(`${hostname}/getMethodArguments`, {
                method: "POST",
                headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
                body: JSON.stringify({ uri: nodeData.id }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    context.commit("updateMethodArguments", data)
                })
        },
        async startSingleQuery(context, { hostname: hostname }) {
            fetch(`${hostname}/addToInfluxDb`, {
                method: "GET",
                headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    context.commit("updateInfluxDBResponse", data)
                })
        },
    },
    modules: {},
})

export default store
