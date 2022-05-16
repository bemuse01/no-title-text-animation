const createUuid = (l = undefined, hex = '0123456789abcdef') => {
    const len = l ? l : ~~(Math.random() * 4)
    const rand = Array.from({length: len}, () => 'xxxx').join('-')
    return `${rand}${len === 0 ? '' : '-'}xxxxxxxx`.replace(/[x]/g, () => hex[~~(Math.random() * hex.length)]).toUpperCase()
}

export default {
    template: `
        <div class="text-container">
            <div 
                class="text"
                v-for="i in lists"
                :key="i.key"
                :style="i.style"
            >
                <span>{{i.text}}</span>
            </div>
        </div>
    `,
    setup(){
        const {onMounted, ref} = Vue



        // variables
        const len = 7
        const lists = ref(Array.from({length: len}, (_, i) => ({
            key: i,
            text: '\xa0',
            // text: '',
            style: {
                opacity: 1 - 1 / len * i,
            }
        })))

        let timer = Math.random() * 500 + 500
        let auth = createUuid()
        let currentTime = window.performance.now()
        let oldTime = window.performance.now()

        const iter = 6
        const load = [
            Array.from({length: iter}, () => '-'), 
            Array.from({length: iter}, () => '\\'), 
            Array.from({length: iter}, () => '|'), 
            Array.from({length: iter}, () => '/'), 
        ].flat()
        let loadIdx = 0



        // methods

        // interval
        const logTexts = () => {
            timer = Math.random() * 500 + 500
            auth = createUuid()

            const temp = lists.value.map((item, i) => i === 0 ? item.text.slice(0, item.text.length - 1) + 'ok' : item.text)
            
            for(let i = 1; i < len; i++){
                lists.value[i].text = temp[i - 1]
            }
        }
        const setInterval = () => {
            currentTime = window.performance.now()
            if(currentTime - oldTime > timer){
                logTexts()
                oldTime = currentTime
            }
        }

        // animate
        const animateText = () => {
            lists.value[0].text = `${auth}... ${load[loadIdx]}`

            loadIdx = (loadIdx + 1) % load.length
        }
        const animate = () => {
            animateText()
            setInterval()
            requestAnimationFrame(() => animate())
        }



        // life cycle
        onMounted(() => {
            animate()
        })

        return{
            lists
        }
    }
}