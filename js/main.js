let eventBus = new Vue()

Vue.component('notes', {
    props: {
        check: {
            type: Boolean
        }
    },
    data() {
        return {
            noteOne:[],
            noteTwo:[],
            noteThree:[],
            count: 0,
            num: 0,
        }
    },
    template: `
       <div class="Notes">
           <note-add :check="check"></note-add>

           <div class="all-cards">
                <div class="note">
                    <h2>1 столбец</h2>
                    <columnOne :noteOne="noteOne" :ChangeNote="ChangeNote"></columnOne>
                </div>
                <div class="note">
                    <h2>2 столбец</h2>
                    <columnOne :noteOne="noteTwo" :ChangeNote="ChangeNote"></columnOne>
                </div>
                <div class="note">
                    <h2>3 столбец</h2>
                    <columnOne :noteOne="noteThree" :ChangeNote="ChangeNote"></columnOne>
                </div>
           </div>
       </div>`,

    mounted() {
        eventBus.$on('firstColumn', noteCard => {
            if(this.noteOne.length < 3){
                this.noteOne.push(noteCard)
                if(this.noteOne.length == 3){
                    this.check = false
                }
            }
        })

    },
    methods: {
        ChangeNote(columnOne, task){
            this.count = this.countNotes(columnOne);
            this.num = this.numNotes(columnOne, task);

            this.checkFirstColumn(columnOne);
            this.checkSecondColumn(columnOne);
            if(this.noteOne[0]) {
                this.count = this.countNotes(this.noteOne[0]);
                this.num = this.numNotes(this.noteOne[0], task);
                this.checkFirstColumn(this.noteOne[0]);
                return;
            }
            if(this.noteOne[1]) {
                this.count = this.countNotes(this.noteOne[1]);
                this.num = this.numNotes(this.noteOne[1], task);
                this.checkFirstColumn(this.noteOne[1]);
                return;
            }
            if(this.noteOne[2]) {
                this.count = this.countNotes(this.noteOne[2]);
                this.num = this.numNotes(this.noteOne[2], task);
                this.checkFirstColumn(this.noteOne[2]);
                return;
            }


            if (this.noteThree.indexOf(columnOne) >= 0) {
                columnOne.status -= 1;
                return;
            }
        },
        countNotes(columnOne) {
            let count = 0
            for (let i in columnOne.arrayOfTasks) {
                if (columnOne.arrayOfTasks[i].title != null)
                    count++;
            }
            return count;
        },
        numNotes(columnOne, task) {
            let num = 0
            for (let i in columnOne.arrayOfTasks) {
                if (columnOne.arrayOfTasks[i].title == task)
                    num = i;
            }
            return num;
        },
        checkFirstColumn(columnOne) {
            if (this.noteOne.indexOf(columnOne) >= 0) {
                if (this.noteTwo.length < 5) {
                    if ((100 / this.count) * columnOne.status > 50) {
                        this.noteTwo.push(columnOne);
                        this.noteOne.splice(this.noteOne.indexOf(columnOne), 1)

                        if (this.check == false && this.noteOne.length != 3)
                            this.check = true;
                    }
                } else {
                    columnOne.arrayOfTasks[this.num].completed = false;
                    columnOne.status -= 1;
                }
            }
        },
        checkSecondColumn(columnOne) {
            if (this.noteTwo.indexOf(columnOne) >= 0) {
                if ((100 / this.count) * columnOne.status == 100) {
                    columnOne.date = new Date().toLocaleString();
                    this.noteThree.push(columnOne);
                    this.noteTwo.splice(this.noteTwo.indexOf(columnOne), 1);
                }
            }
        }
    }


})
Vue.component('columnOne', {
    template: `
       <div class="column">
                <div v-for="column in noteOne">  

   
                    
                <div>
                <p>{{column.name}}</p>
                    <ul>
                        <li class="container" v-for="task in column.arrayOfTasks" >
                        
                        <div  @click="column.status = Check(task.completed, column.status),
                      task.completed = true,
                      ChangeNote(column, task.title)">
                            {{task.title}}
                        </div>                           
                                <div v-if="task.title != null && task.completed === false"></div >
                                <div v-else-if="task.completed == true">✔️</div>
                        </li>
                    </ul>
                    <div v-if="column.date != null">
                        {{column.date}}
                    </div>
                </div>
           </div>
       </div>`,
    methods: {
        Check(stat, status){
            if(stat == false){
                status++;
                return status;
            }
            return status;
        }
    },
    props: {
        column:{
            type: Object
            // type: Array,
            // required: false
        },
        noteOne: [],
        ChangeNote:{
            type: Function
        },

    },

})

Vue.component('note-add', {
    props: {
        check:{
            type: Boolean

        }
    },
    template: `
       <div>
       <form class="note-form">
            <label for="name" class="form-label">Название</label>
           <input class="form-input" id="name" v-model="name" type="text" maxlength="50" required>
            <div>
                <label for="name" class="form-label">Задача 1</label>
                <input class="form-input" id="task1" v-model="task1" maxlength="50" required>
            </div>
            <div>
                <label for="name" class="form-label">Задача 2</label>
                <input class="form-input" id="task2" v-model="task2" maxlength="50" required>
            </div>
            <div>
                <label for="name" class="form-label">Задача 3</label>
                <input class="form-input" id="task3" v-model="task3" maxlength="50" required >
            </div>
            <div>
                <label for="name" class="form-label">Задача 4</label>
                <input class="form-input" id="task4" v-model="task4" maxlength="50">
            </div>
            <div>
                <label for="name" class="form-label">Задача 5</label>
                <input class="form-input" id="task5" v-model="task5" maxlength="50">
            </div>
            <input type="submit" @click="onSubmit" class="btn" :disabled = "!check" value="Создать" >
                <p v-if="errors.length">
             <ul>
               <li v-for="error in errors">{{ error }}</li>
             </ul>
            </p>
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
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if(this.task1 && this.task2 && this.task3){
                let noteCard = {
                    name: this.name,
                    arrayOfTasks: [ {title: this.task1, completed: false},
                        {title: this.task2, completed: false},
                        {title: this.task3, completed: false},
                        {title: this.task4, completed: false},
                        {title: this.task5, completed: false},
                    ],
                    date: null,
                    status: 0

                }

                eventBus.$emit('firstColumn', noteCard),
                    this.name = null,
                    this.arrayOfTasks = null,
                    this.task1 = null,
                    this.task2 = null,
                    this.task3 = null,
                    this.task4 = null,
                    this.task5 = null
            }else{
                if(!this.task1) this.errors.push('Напишите 1 задачу')
                if(!this.task2) this.errors.push('Напишите 2 задачу')
                if(!this.task3) this.errors.push('Напишите 3 задачу')
            }

        },

    },

})

let app = new Vue({
    el: '#app',
    data() {
        return{
            check: true,
            name: "Заметки"
        }
    }
})
