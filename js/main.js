
Vue.component('notes', {
    template: `
       <div class="Notes">
           <note-add></note-add>
           <div class="all-cards">
                <div class="note">
                    <h2>1 столбец</h2>
                    <columnOne :noteOne="noteOne"></columnOne>
                </div>
                <div class="note">
                    <h2>2 столбец</h2>
                    <columnTwo :noteTwo="noteTwo"></columnTwo>
                </div>
                <div class="note">
                    <h2>3 столбец</h2>
                    <columnThree :noteThree="noteThree"></columnThree>
                </div>
           </div>
       </div>`,
    data() {
        return {
            noteOne:[],
            noteTwo:[],
            noteThree:[],
        }
    },



})
Vue.component('columnOne', {
    template: `
       <div class="column">
                <div class="column-one" v-for="column in noteOne">
                <h3>{{column.name}}</h3>
                    <span>
                        <li v-for="task in column.arrayOfTasks" v-if="task.title != null" >
                                <strong>{{task.id}}</strong>
                                <input type="checkbox" 
                                v-on:change="task.completed = true" 
                                :disabled="task.completed" 
                                v-on:change='column.status += 1'
                                @change.prevent="changeCol(column)">
                                <span :class="{done: task.completed}" >{{task.title}}</span>
                        </li>
                    </span>
                </div>
       </div>`,
    methods: {

    },
    props: {
        noteOne:{
            type: Array,
            required: false

        },
    },

})
Vue.component('columnTwo', {
    template: `
       <div class="column">
            <div class="column-one" v-for="column in noteTwo">
            <h3>{{column.name}}</h3>
                <span>
                    <li v-for="task in column.arrayOfTasks" v-if="task.title != null" >
                            <strong>{{task.id}}</strong>
                            <input type="checkbox" 
                            v-on:change="task.completed = true" 
                            :disabled="task.completed" 
                            v-on:change='column.status += 1'
                            @change.prevent="changeColTwo(column)"
                            >
                            <span :class="{done: task.completed}" >{{task.title}}</span>
                    </li>
                </span>
            </div>
       </div>`,
    props: {
        noteTwo:{
            type: Array,
            required: false

        }

    },


})
Vue.component('columnThree', {
    template: `
       <div class="column-one">
            <div class="column-one" v-for="column in noteThree">
            <h3>{{column.name}}</h3>
                <span>
                    <li v-for="task in column.arrayOfTasks" v-if="task.title != null" >
                            <strong>{{task.id}}</strong>
                            <input type="checkbox" 
                            :disabled="task.completed" 
                            >
                            <span :class="{done: task.completed}" >{{task.title}}</span>
                    </li>
                    <p>Дата выполнения: <br>{{column.date}}</p>
                </span>
            </div>
       </div>`,
    props: {
        noteThree:{
            type: Array,
            required: false

        }

    },

})
Vue.component('note-add', {
    template: `
       
       <div>
       <form class="note-form">
            <label for="name" class="form-label">Название</label>
           <input class="form-input" id="task" v-model="name" maxlength="50" required>
            <div class="name-column">
                <label for="name" class="form-label">Задача</label>
                <input class="form-input" id="task1" v-model="task1" maxlength="50" required>
            </div>
            <div class="name-column">
                <label for="name" class="form-label">Задача</label>
                <input class="form-input" id="task2" v-model="task2" maxlength="50" required>
            </div>
            <div class="name-column">
                <label for="name" class="form-label">Задача</label>
                <input class="form-input" id="task3" v-model="task3" maxlength="50" required >
            </div>
            <div class="name-column">
                <label for="name" class="form-label">Задача</label>
                <input class="form-input" id="task4" v-model="task4" maxlength="50">
            </div>
            <div class="name-column">
                <label for="name" class="form-label">Задача</label>
                <input class="form-input" id="task5" v-model="task5" maxlength="50">
            </div>
            <input @click="onSubmit" class="btn" type="button" value="Создать"> 
       </form>
       </div>`,

    data() {
        return {
            name: null,
            task1:null,
            task2:null,
            task3:null,
            task4:null,
            task5:null,
        }
    },
    methods: {
        onSubmit() {
            let noteCard = {
                name: this.name,
                arrayOfTasks: [ {id: 1, title: this.task1, completed: false},
                    {id: 2, title: this.task2, completed: false},
                    {id: 3, title: this.task3, completed: false},
                    {id: 4, title: this.task4, completed: false},
                    {id: 5, title: this.task5, completed: false},
                ],
                date: null,
                status: 0

            }


        },

    },

    props: {
        noteOne:{
            type: Array,
            required: false

        }
    },

})

let app = new Vue({
    el: '#app',
    data: {
        name: "Заметки"
    },

})
