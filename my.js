const { createApp } = Vue;
class Todo {
    constructor(name){
        this.name = name,
        this.completed = false,
        this.editing = false;
    }
}


createApp({
  data() {
    return {
      message: "Szia!",
      x: 5
    };
  },
}).mount("#app");
