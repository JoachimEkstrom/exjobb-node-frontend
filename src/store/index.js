import { createStore } from "vuex"

const store = createStore({
    state() {
        return {
            browsedData: [],
        }
    },
    mutations: {
        updateBrowsedData(state, data) {
            state.browsedData = data
        },
    },
    actions: {
        async updBrowsedData(context, { uri: uri }) {
            fetch("http://localhost:3005/browse", {
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
    },
    modules: {},
})

export default store
