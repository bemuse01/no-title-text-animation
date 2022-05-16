import TextContainer from "./textContainer.js"

const vueApp = Vue.createApp({
    components: {
        'text-container': TextContainer
    }
})

vueApp.mount('#wrap')