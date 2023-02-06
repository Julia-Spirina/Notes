let eventBus = new Vue()
Vue.component('notes', {
    template: `
<div class="notes">
<note-add></note-add>
   <div class="all-cards">
       <div class="note">
       <h2>one</h2>
       <columnOne :noteOne="noteOne"></columnOne>
       </div>
       <div class="note">
       <h2>two</h2>
       <columnTwo :noteTwo="noteTwo"></columnTwo>
       </div>
       <div class="note">
       <h2>three</h2>
       <columnTree :noteTree="noteTree"></columnTree>
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
    mounted() {
        eventBus.$on('firstColumn', noteCard =>{
            if(this.noteOne.length<3){
                this.noteOne.push(noteCard)
                console.log(this.noteOne)
            }
        })
        eventBus.$on('secondColumn', noteCard =>{
            if(this.noteTwo.length<5){
                this.noteTwo.push(noteCard)
                this.noteOne.splice(this.noteOne.indexOf(noteCard),1)
                console.log(this.noteTwo)
            }
        })
        eventBus.$on('thirdColumn', noteCard =>{
            this.noteTree.push(noteCard)
            this.noteTwo.splice(this.noteTwo.indexOf(noteCard),1)
            console.log(this.noteTwo)
            console.log(this.noteTree)

        })
        eventBus.$on('fromFirstColumnToThird', noteCard => {
            this.noteTree.push(noteCard)
            this.noteOne.splice(this.noteOne.indexOf(noteCard),1)
        })
    }

})


Vue.component('note-add', {
    props:{
        noteOne:{
            type:Array,
            required:false,
        }
},
    template: `
        <div>
            <form class="note-form">
            <label for="name" class="label-form">Name</label>
            <input class="input-form" id="task" v-model="name" maxlength="50" required>
            <div class="name-column">
                <label for="name" class="label-form">Add note</label>
                <input class="input-form" id="task1" v-model="task1" maxlength="50" required>
            </div>
            <div class="name-column">
                <label for="name" class="label-form">Add note</label>
                <input class="input-form" id="task2" v-model="task2" maxlength="50" required>
            </div>
            <div class="name-column">
                <label for="name" class="label-form">Add note</label>
                <input class="input-form" id="task3" v-model="task3" maxlength="50" required>
            </div>
            <div class="name-column">
                <label for="name" class="label-form">Add note</label>
                <input class="input-form" id="task4" v-model="task4" maxlength="50" required>
            </div>
            <div class="name-column">
                <label for="name" class="label-form">Add note</label>
                <input class="input-form" id="task5" v-model="task5" maxlength="50" required>
            </div>
         
</form>
        </div>
    `
    ,
    data() {
        return {
            name:null,
            task1:null,
            task2:null,
            task3:null,
            task4:null,
            task5:null,
        }
    },
    methods: {
        // тут будут методы
    },
})

Vue.component('columnOne', {
    props: {
        noteOne: {
            type: Array,
            required: false,
        }
    },
    template: `
        <div class="column">
            <div class="column-one" v-for="column in noteOne">
                <h3>{{column.name}}</h3>
                <span>
                    <li v-for="task in column.arrayOfTasks">
                        <strong></strong>
                        <input type="checkbox"
                        v-on:change="task.completed=true"
                        :disabled="task.completed"
                        v-on:change='column.status +=1'
                        @change.prevent="changeCol(column)">
                        <span :class="{done: task,completed}" >{{task.title}}</span>
                    </li>
                </span>
            </div>
        </div>
    `,
    methods: {
        changeCol(noteCard){
            let allNotes = 0
            for(let i = 0; i <5; i++){
                if (noteCard.arrayOfTasks[i].title !=null){
                    allNotes++
                }
            }
            if(((noteCard.status/allNotes) * 100 >= 50) && (noteCard.status/allNotes)*100 !=100){
                eventBus.$emit('secondColumn' noteCard)
            }
            if(((noteCard.status/allNotes) * 100 === 50) {
                noteCard.date = new Date().toLocaleString()
                eventBus.$emit('fromFirstColumnToThird' noteCard)
            }
        }
    },
})

Vue.component('columnTwo', {
    props: {
        noteTwo: {
            type: Array,
            required: false,
        }
    },
    template:`
       <div class="column">
            <div class="column-one" v-for="column in noteOne">
                <h3>{{column.name}}</h3>
                <span>
                    <li v-for="task in column.arrayOfTasks">
                        <strong></strong>
                        <input type="checkbox"
                        v-on:change="task.completed=true"
                        :disabled="task.completed"
                        v-on:change='column.status +=1'
                        @change.prevent="changeCol(column)">
                        <span :class="{done: task,completed}" >{{task.title}}</span>
                    </li>
                </span>
            </div>
        </div>
    `,
    methods: {
        changeColTwo(noteCard) {
            let allNotes = 0
            for(let i = 0; i < 5; i++){
                if (noteCard.arrayOfTasks[i].title !=null){
                    allNotes++
                }
            }
            if ((noteCard.status/allNotes)*100===100){
                noteCard.date=new Date().toLocaleString()
                eventBus.$emit('thirdColumn',noteCard)
            }
        }
    }
})
Vue.component('columnTree')

let app = new Vue({
    el: '#app',
    data: {
        product: "Notes"
    }
})
