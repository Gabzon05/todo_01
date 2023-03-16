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
      errorMessage: null,
    };
  },
  mounted(){
    this.getTodos();
  },
  methods: {
    async getTodos(){
        try {
          this.errorMessage = null;
          const response = await fetch(this.url);
          if (!response.ok) {
            this.errorMessage="#1 Szerver hiba, próbálkozzon később!";
            return;
          }
          const todos = await response.json();
          console.log(todos.data);
          if (!todos.success) {
            this.errorMessage="#2 Szerver hiba, próbálkozzon később!";
            return;
          }
          this.todoCollection = todos.data;
        } catch (error) {
          this.errorMessage="#0 Szerver hiba, próbálkozzon később!";
        }
    },
    postTodo(){},
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
      todo.editing =false;
      this.editingTodoName = null;
    },
    onDblClickTodoName(todo) {
      todo.editing = true;
      this.editingTodoName = todo.name;
    },
    onEnterAddTodo() {
      if (this.newTodoName.trim()) {
        //this.todoCollection.push(new Todo(this.newTodoName));
        this.postTodo();
      }
      this.newTodoName = null;
    },
    setFilter(filter) {
      this.filter = filter;
    },
    getFilterButtonClass(filter) {
      return {
        "btn-outline-secondary": filter != this.filter,
        "btn-secondary": filter == this.filter,
      };
    },
    onClickRemoveCompleted(){
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
          case "all":
            return true;
          case "active":
            return !todo.completed;
          case "completed":
            return todo.completed;
        }
      });
    },
    counter() {
      return this.todoCollection.length;
    },
    items() {
      return this.counter > 1 ? "items" : "item";
    },
  },
}).mount("#app");
