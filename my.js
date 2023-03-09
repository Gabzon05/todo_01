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
      ]
    };
  },
}).mount("#app");
