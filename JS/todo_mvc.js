//JS file

(function(root) {

	var app = {
		//Model with core methods for manipulating todos array.
		model: {

			todos: [],

			addTodo: function(todoText) {

				this.todos.push({
					todoText: todoText,
					completed: false
				});
			},

			editTodoText: function(index, updatedText) {

				this.todos[index].todoText = updatedText;
			},

			deleteTodo: function(index) {

				this.todos.splice(index, 1);
			},

			removeCompleted: function() {
				
				for (var i = this.todos.length - 1; i >= 0; i--) {
					if (this.todos[i].completed) {
						this.deleteTodo(i);
					}
				}
			},

			toggleCompleted: function(index) {

				this.todos[index].completed = !this.todos[index].completed;
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
			}	
		},

		control: {
		//These methods are initiated using onclick properties in the HTML

			addTodo: function() {
				var addTodoTextInput = document.getElementById('addtodotextinput');
				
				app.model.addTodo(addTodoTextInput.value);

				addTodoTextInput.value = '';
				app.view.displayTodos();
			},

			editTodoText: function() {
				var editTodoIndexNumber = document.getElementById('edittodoindexnumber'),
					editTodoTextInput = document.getElementById('edittodotextinput');

				app.model.editTodoText(editTodoIndexNumber.value,
					editTodoTextInput.value);

				editTodoIndexNumber.value = '';
				editTodoTextInput.value = '';
				app.view.displayTodos();
			},

			deleteTodo: function() {
				var deleteTodoIndexNumber = document.getElementById('deletetodoindexnumber');

				app.model.deleteTodo(deleteTodoIndexNumber.value);

				deleteTodoIndexNumber.value = '';
				app.view.displayTodos();
			},

			removeCompleted: function() {

				app.model.removeCompleted();
				app.view.displayTodos();
			},

			toggleCompleted: function() {
				var toggleCompletedIndexNumber = document.getElementById('togglecompletedindexnumber');

				app.model.toggleCompleted(toggleCompletedIndexNumber.value);

				toggleCompletedIndexNumber.value = '';
				app.view.displayTodos();
			},

			toggleAll: function() {

				app.model.toggleAll();
				app.view.displayTodos();
			}
		},

		//Methods for rendering todo list in index.html
		view: {

			displayTodos: function() {
				var todolistULelement = document.getElementById('todolist');
				todolistULelement.innerHTML = '';

				app.model.todos.forEach(function(todo) {
					var todolistLIelement = document.createElement('LI');

					if (todo.completed) {
						todolistLIelement.textContent = '(x) ' + todo.todoText;	
					} else {
						todolistLIelement.textContent = '( ) ' + todo.todoText;					
					}
					todolistULelement.appendChild(todolistLIelement);
				});
			}
		}

	};

	//provides access from global object for console use
	root.todoApp = app;

})(this);