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

			toggleCompleted: function(index) {

				this.todos[index].completed = !this.todos[index].completed;

				todoApp.view.displayTodos();
			}
			
		},





		control: {},

		view: {

			displayTodos: function() {

				var todos = todoApp.model.todos;

				for(var i = 0; i < todos.length; i++) {

					if (todos[i].completed) {
						console.log('(x) ' + todos[i].todoText);	
					} else {
						console.log('( ) ' + todos[i].todoText);
					}				
				}
			}
		}

	};

	//provides access from global object for console use
	root.todoApp = app;

})(this);