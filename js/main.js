Vue.component('product', {
    template: `
<div>
   <div class="column">
   </div>
   <div class="column">
   </div>
   <div class="column">
   </div>
  </div>
 `,
    data() {
        return {
            // тут будут данные
        }
    },
    methods: {
        // тут будут методы
    },
    computed: {
        // тут будут вычисляемые свойства
    }
})

let app = new Vue({
    el: '#app',
    data: {
        product: "Notes"
    }
})
