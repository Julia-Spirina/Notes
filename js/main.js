Vue.component('notes', {
    template: `
<div class="notes">
<note-add></note-add>
   <div class="all-cards">
       <div class="note">
       <h2>one</h2>
       </div>
       <div class="note">
       <h2>two</h2>
       </div>
       <div class="note">
       <h2>three</h2>
       </div>
   </div>
  </div>
 `,
    data() {
        return {
            noteOne:[],
            noteTwo:[],
            noteTree:[],
        }
    },
    methods: {
        // тут будут методы
    },
    computed: {
        // тут будут вычисляемые свойства
    }
})


Vue.component('note-add', {
    template: `
        <div>
            <form class="note-form">
            <label for="name" class="label-form">Name</label>
            <input class="input-form" id="task" v-model="name" maxlength="50" required>
<!--            <div class="name-column">-->
<!--                <label for="name" class="label-form">Name</label>-->
<!--                <input class="input-form" id="task1" v-model="task1" maxlength="50" required>-->
<!--            </div>-->
         
</form>
        </div>
    `
    ,
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
