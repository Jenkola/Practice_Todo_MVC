//JS file

(function(root) {

	var app = {

		model: {

			todos: [],

			addTodo: function(todoText) {

				this.todos.push({
					todoText: todoText,
					completed: false
				});

				todoApp.view.displayTodos();
			},

			editTodoText: function(index, updatedText) {

				this.todos[index].todoText = updatedText;

				todoApp.view.displayTodos();
			},

			deleteTodo: function(index) {

				this.todos.splice(index, 1);

				todoApp.view.displayTodos();
			},

			removeCompleted: function() {
				//>>Loops through todos (from back to front?), 
				//if completed === true, call delete todo function on that index number.
				for (var i = this.todos.length - 1; i >= 0; i--) {
					if (this.todos[i].completed) {
						this.deleteTodo(i);
					}
				}
			},

			toggleCompleted: function(index) {

				this.todos[index].completed = !this.todos[index].completed;

				todoApp.view.displayTodos();
			},

			toggleAll: function() {

				//Find number of completed todos
				var numberOfCompletedTodos = 0;

				this.todos.forEach(function(todo) {
					if(todo.completed) {
						numberOfCompletedTodos++;
					}
				});

				//If all todos are completed, make all completed === false.
				if(numberOfCompletedTodos === this.todos.length) {
					this.todos.forEach(function(todo) {
						todo.completed = false;				
					});
				} else {
				//Otherwise, make all todos' completed === true.
					this.todos.forEach(function(todo) {
						todo.completed = true;				
					});
				}
				todoApp.view.displayTodos();
			}
			
		},





		control: {},

		view: {

			displayTodos: function() {

				var todolistULelement = document.getElementById('todolist');
				todolistULelement.innerHTML = '';

				todoApp.model.todos.forEach(function(todo) {
					//displayTodos should create LI elements, put in same 
					//text content as before, then append to the UL.
					var todolistLIelement = document.createElement('LI');

					if (todo.completed) {
						todolistLIelement.textContent = '(x) ' + todo.todoText;
						//console.log('(x) ' + todo.todoText);
					} else {
						todolistLIelement.textContent = '( ) ' + todo.todoText;
						//console.log('( ) ' + todo.todoText);
					}
					todolistULelement.appendChild(todolistLIelement);
				});
			}
		}

	};

	//provides access from global object for console use
	root.todoApp = app;

})(this);