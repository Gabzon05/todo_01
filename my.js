const { createApp } = Vue;
class Todo {
    constructor(name){
        this.name = name;
        this.completed = false;
        this.editing = false;
    }
}


createApp({
  data() {
    return {
      message: "Szia!",
      todoCollection: [ 
        new Todo("reggeli"),
        new Todo("utazás"),
        new Todo("munka"),
        new Todo("mozi"),
      ],
      editingTodoName: null,
      newTodoName: null,
    }
  },
  methods: {
    nameView(completed){
      return completed ? "my-line-through my-green" : "my-red";
    },
    onEnterTodoName(todo){
      if (!todo.name.trim()) {
        todo.name = this.editingTodoName
      }
      todo.editing = false
      
    },
    onDblClickTodoName(todo){
      todo.editing = true;
      this.editingTodoName = todo.name;
    },
    onEnterAddTodo(){
      if (this.newTodoName.trim()) {
        this.todoCollection.push(new Todo(this.newTodoName));
        this.newTodoName = null;
      }
    },
  }
  
}).mount("#app");
