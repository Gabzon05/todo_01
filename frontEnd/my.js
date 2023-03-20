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
      urlAuth: "http://localhost:4000",
      errorMessage: null,
      userName: null,
      password: null,
      accessToken: null,
      refreshToken: null,
      userId: 0,
      number: 0,
      loginSuccess: 0,
      loginError: 0,
      loginErrorMessage: null,
    };
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    async login(){
      const loginUrl = `${this.urlAuth}/login`
      const user = {
        userName: this.userName,
        password: this.password
      };
      const param = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      try {
        this.errorMessage = null;
        const response = await fetch(loginUrl, param);
        if (!response.ok) {
          this.errorMessage = "#1 Szerver hiba, próbálkozzon később!";
          return;
        }
        const data = await response.json();
        this.loginSuccess = data.success;
        if (!data.success) {
          this.loginErrorMessageShow("Rossz usernév, vagy jelszó");
          return;
        }

        this.accessToken = data.data.accessToken;
        this.refreshToken = data.data.refreshToken;
        this.userId = data.data.userId;
        this.number = data.data.number;

        this.getTodos();
      } catch (error) {
        this.errorMessage = "#0 Szerver hiba, próbálkozzon később!";
      }
    },
    loginErrorMessageShow(message){
      this.loginErrorMessage = message;
      setTimeout(()=>{
        this.loginErrorMessage = null
      }, 3000);
    },
    logout(){
      this.loginSuccess = 0;
    },
    async getTodos() {
      const url = `${this.url}/${this.userId}`;
      try {
        this.errorMessage = null;
        const response = await fetch(url);
        if (!response.ok) {
          this.errorMessage = "#1 Szerver hiba, próbálkozzon később!";
          return;
        }
        const todos = await response.json();
        console.log(todos.data);
        if (!todos.success) {
          this.errorMessage = "#2 Szerver hiba, próbálkozzon később!";
          return;
        }
        const t = todos.data.map((d) => {
          d.completed = d.completed ? true : false;
          return d;
        });
        this.todoCollection = t;
      } catch (error) {
        this.errorMessage = "#0 Szerver hiba, próbálkozzon később!";
      }
    },
    async postTodo() {
      const newTodo = {
        name: this.newTodoName,
        userId: this.userId
      };
      const param = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      };
      try {
        this.errorMessage = null;
        const response = await fetch(this.url, param);
        if (!response.ok) {
          this.errorMessage = "#1 Szerver hiba, próbálkozzon később!";
          return;
        }
        this.getTodos();
      } catch (error) {
        this.errorMessage = "#0 Szerver hiba, próbálkozzon később!";
      }
    },
    async putTodo(todo) {
      const id = todo.id;
      const newTodo = {
        name: todo.name,
        completed: todo.completed ? 1 : 0,
        userId: this.userId
      };
      const param = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      };
      const url = `${this.url}/${id}`;

      console.log("param", param);
      try {
        this.errorMessage = null;
        const response = await fetch(url, param);
        if (!response.ok) {
          this.errorMessage = "#1 Szerver hiba, próbálkozzon később!";
          return;
        }
        this.getTodos();
      } catch (error) {
        this.errorMessage = "#0 Szerver hiba, próbálkozzon később!";
      }
    },
    async deleteCompleted() {
      const url = `${this.url}/${this.userId}`
      const param = {
        method: "DELETE",
      };
      try {
        this.errorMessage = null;
        const response = await fetch(url, param);
        if (!response.ok) {
          this.errorMessage = "#1 Szerver hiba, próbálkozzon később!";
          return;
        }
        this.getTodos();
      } catch (error) {
        this.errorMessage = "#0 Szerver hiba, próbálkozzon később!";
      }
    },
    onClickCompleted(index) {
      const todo = this.todoCollection[index];
      this.putTodo(todo);
    },
    nameView(completed) {
      return completed ? "my-line-through my-green" : "my-red";
    },
    onEnterTodoName(todo) {
      todo.editing = false;
      if (this.editingTodoName.trim()) {
        todo.name = this.editingTodoName;
        this.putTodo(todo);
      }
      editingTodoName = null;
    },
    onEscapeTodoName(todo) {
      todo.editing = false;
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
    onClickRemoveCompleted() {
      this.deleteCompleted();
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
