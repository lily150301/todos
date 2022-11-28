import data from './data/data.js'

const init = {

    todos: data.get(),
    filter:'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    editIndex: null,


}

const actions = {
    add({todos}, title ){
        if (title) 
        {
            todos.push({title, completed: false})
            data.set(todos)
        }
    },
    toggle({todos}, index) {
        const todo = todos[index]
        todo.completed = !todo.completed
        data.set(todos)
    },
    toggleAll({todos }, completed) {
        todos.forEach(todo => todo.completed = completed );
        data.set(todos)

    },
    destroy({todos}, index) {
        todos.splice(index, 1)
        data.set(todos)
    },
    filter(state, filter) {
        state.filter = filter
    },
    clearCompleted(state, filter) {
        state.todos = state.todos.filter(state.filters.active)
        data.set(state.todos)
    },
    startEditing(state, index){
        state.editIndex = index
    },
    endEdit(state, title){
        if (state.editIndex !== null ) {
            if (title) {
                state.todos[state.editIndex].title = title
                
                 data.set(state.todos)
            } else {
                this.destroy(state, state.editIndex)
            }
            state.editIndex = null
        }
    }

}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args)
    return state
        
   
    }
