//JS file

(function(root) {

	/*** Helper functions ***/

	//Generates unique ID to be attached to todo objects.
	function generateID() {
		var randomNum = Number(Math.round(Math.random() + 'e7'));
		return 'uid' + randomNum;
	}

	//Finds the index number of a todo in the todos array based on it's ID property.
	function findIndexFromID(idValue) {
		var matchingIndex;

		app.model.todos.forEach(function(element, index) {
			if(element.id === idValue) {
				matchingIndex = index;
			}
		});
		return matchingIndex;
	}

	/*** Core app ***/
	var app = {
		//Model with core methods for manipulating todos array.
		model: {

			todos: [],

			addTodo: function(todoText) {

				this.todos.push({
					todoText: todoText,
					completed: false,
					id: generateID()
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
		//These methods are initiated using onclick properties in the HTML?

			startUp: function() {
				this.setUpEventListeners();
			},

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

			deleteTodo: function(idValue) {
				var deleteTodoIndexNumber = findIndexFromID(idValue);

				app.model.deleteTodo(deleteTodoIndexNumber);

				deleteTodoIndexNumber.value = '';
				app.view.displayTodos();
			},

			removeCompleted: function() {

				app.model.removeCompleted();
				app.view.displayTodos();
			},

			toggleCompleted: function(idValue) {
				var toggleCompletedIndexNumber = findIndexFromID(idValue);

				app.model.toggleCompleted(toggleCompletedIndexNumber);

				toggleCompletedIndexNumber.value = '';
				app.view.displayTodos();
			},

			toggleAll: function() {

				app.model.toggleAll();
				app.view.displayTodos();
			},

			setUpEventListeners: function() {
				var todolistULelement = document.getElementById('todolist');

				todolistULelement.addEventListener('click', function(e) {
					var targetEl = e.target,
						targetElClass = targetEl.getAttribute('class'),
						targetElParentId = targetEl.parentNode.getAttribute('ID');
					
					if (targetElClass === 'togglecompletedbutton') {
						app.control.toggleCompleted(targetElParentId);
					} else if (targetElClass === 'deletetodobutton') {
						app.control.deleteTodo(targetElParentId);
					}
				});
			}
		},

		//Methods for rendering todo list in index.html
		view: {

			displayTodos: function() {
				//Clear UL todolist section of HTML of all content
				var todolistULelement = document.getElementById('todolist');
				todolistULelement.innerHTML = '';

				//Create LI elements for each todo
				app.model.todos.forEach(function(todo) {
					var todolistLIelement = document.createElement('LI'),
						todolistTextElement = document.createElement('P');

					todolistLIelement.setAttribute('id', todo.id);
					todolistLIelement.innerHTML = '<button class=\"togglecompletedbutton\">Toggle completed</button><button class=\"deletetodobutton\">Delete todo</button>';

					if (todo.completed) {
						todolistTextElement.textContent = '(x) ' + todo.todoText;	
					} else {
						todolistTextElement.textContent = '( ) ' + todo.todoText;					
					}
					//Add text element as child of li element, then append li to UL
					todolistLIelement.insertBefore(todolistTextElement, todolistLIelement.firstChild);
					todolistULelement.appendChild(todolistLIelement);
				});
			}
		}

	};
	//Run startup function to initialise event listeners etc.
	app.control.startUp();

	//provides access from global object for console use
	root.todoApp = app;

})(this);