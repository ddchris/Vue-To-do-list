var app = new Vue({
    el: '#app',
    data: {
      todo: '',
      todos: [],
      visibility: 'all',
      cacheTodo:{},
      cacheTitle:''
    },
    methods:{
      addTodo(){
        let text = this.todo.trim()
        if(text && text.length > 0){
          this.todos.push({
            id: (Date.now()),
            title: text,
            completed: false
          });
          this.todo='';
        }
      },
      removeTodo(item){
        this.todos.every((key,index) => {
          if (key.id === item.id){
            this.todos.splice(index,1)
            return false
          } 
          return true
        });
      },
      clearAll(){
        this.todos = []
      },
      editTodo(item){
        this.cacheTodo = item
        this.cacheTitle = item.title
        console.log('cacheTodo: ', this.cacheTodo);
        console.log('this.cacheTitle: ', this.cacheTitle);
      },
      cancelEdit(){
        this.cacheTodo = {}
      },
      updateTitle(item){
        item.title = this.cacheTitle 
        this.cacheTodo = {}
      }
    },
    computed:{
      filterTodos () {
        console.log('compute');
        if(this.visibility === 'all'){
          return this.todos
        } else if (this.visibility === 'finished') 
        {
          let newTodos = []
          newTodos = this.todos.filter( item =>　item.completed === true )
          return newTodos
        } else 
        {
          let newTodos = []
          newTodos = this.todos.filter( item =>　item.completed === false )
          return newTodos
        }
      },
      uncompletedNum (){
        let newTodos = []
        newTodos = this.todos.filter( item =>　item.completed === false )
        return newTodos.length
      }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    },
  });