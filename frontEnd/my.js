const { createApp } = Vue;

class Todo {
  constructor(name) {
    this.name = name;
    this.completed = false;
    this.editing = false;
  }
}


createApp({
  data() {
    return {
      message: "sSzia!",
      todoCollection: [],
      editingTodoName: null,
      newTodoName: null,
      filter: "all",
      url: "http://localhost:3000/todos",
      Errormessage: null
    }

  },
  mounted(){
    console.log("betoltodtem");
    this.getTodos();
  },
  methods: {
     async getTodos(){
        const response = await fetch(this.url);
        const todos = await response.json();
        console.log(todos);
        this.todoCollection = todos.data;
    },
    nameView(completed) {
      return completed ? "my-line-through my-green" : "my-red";
    },
    onEnterTodoName(todo) {
      console.log("heló");
      if (!todo.name.trim()) {
        todo.name = this.editingTodoName;
      }
      todo.editing = false;
      
    },
    onEscapeTodoName(todo){
      todo.editing= false;
      this.editingTodoName= null;  
    },
    onDblClickTodoName(todo) {
      todo.editing = true;
      this.editingTodoName = todo.name;
    },
    onEnterAddTodo() {
      if (this.newTodoName.trim()) {
        this.todoCollection.push(new Todo(this.newTodoName));
      }
      this.newTodoName = null;
    },
    setFilter(filter) {
      this.filter = filter;
    },
    getFilterButtonClass(filter) {
      return {
        "btn-outline-secondary": filter != this.filter,
        "btn-secondary": filter == this.filter
      }
    },
    onClickREmoveCompleted(){
      this.todoCollection = this.todoCollection.filter((todo)=>{
        return !todo.completed;
      });
    },
  },
  computed: {
    filteredTodoCollection() {
      let vm = this;
      return this.todoCollection.filter(function (todo) {
        switch (vm.filter) {
          case 'all':
            return true;
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
        }
      })
    },
    counter() {
      return this.todoCollection.length;
    },
    items() {
      return this.counter > 1 ? "items" : "item";
    }
  }
}).mount("#app");
