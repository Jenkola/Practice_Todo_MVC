//todo mvc core JS file

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

			startUp: function() {
				this.setUpEventListeners();
			},

			//initiated using onclick property on the HTML button.
			addTodo: function() {
				var $addTodoTextInput = $('#addtodotextinput');

				app.model.addTodo($addTodoTextInput.val());

				$addTodoTextInput.val('');
				app.view.displayTodos();
			},

			editTodoText: function(idValue) {
				var editTodoIndexNumber = findIndexFromID(idValue);
				var cssSelector = 'li#' + idValue + ' input.todotextfield';
				var	$editTodoTextInput = $(cssSelector);

				app.model.editTodoText(editTodoIndexNumber,
					$editTodoTextInput.val());
				app.view.displayTodos();
			},

			deleteTodo: function(idValue) {
				var deleteTodoIndexNumber = findIndexFromID(idValue);

				app.model.deleteTodo(deleteTodoIndexNumber);
				app.view.displayTodos();
			},

			//initiated using onclick property on the HTML button.
			removeCompleted: function() {

				app.model.removeCompleted();
				app.view.displayTodos();
			},

			toggleCompleted: function(idValue) {
				var toggleCompletedIndexNumber = findIndexFromID(idValue);

				app.model.toggleCompleted(toggleCompletedIndexNumber);
				app.view.displayTodos();
			},

			//initiated using onclick property on the HTML button.
			toggleAll: function() {

				app.model.toggleAll();
				app.view.displayTodos();
			},

			setUpEventListeners: function() {
				//Listener for toggle completed and delete todo
				$('#todolist').on('click', function(e) {
					var $targetElClass = $(e.target).attr('class'),
						$targetElParentId = $(e.target).parent().attr('id');

					if ($targetElClass === 'togglecompletedcheckbox') {
						app.control.toggleCompleted($targetElParentId);
					} else if ($targetElClass === 'deletetodobutton') {
						app.control.deleteTodo($targetElParentId);
					}	
				});
				//Listener for edit todo text
				$('#todolist').on('focusout', function(e) {
						var $targetElClass = $(e.target).attr('class'),
						$targetElParentId = $(e.target).parent().attr('id');

					if($targetElClass === "todotextfield") {
						app.control.editTodoText($targetElParentId);
					}
				});

			}
		},

		//Methods for rendering todo list in index.html
		view: {

			displayTodos: function() {
				//Clear UL todolist section of HTML of all content
				var $todoListULelement = $('#todolist');
				$todoListULelement.html('');

				//Create LI template for Handlebars.js
				var $handlebarsTemplate = Handlebars.compile($('#todo-template').html());

				//Create LI elements for each todo
				app.model.todos.forEach(function(todo) {
					//Create object to pass into Handlebars template
					var templateContext = {uid: todo.id, todotext: todo.todoText};
					if (todo.completed) {
						templateContext.completed = 'checked';
					}
					var	listItemHtml = $handlebarsTemplate(templateContext);
					$todoListULelement.append(listItemHtml);
				});
			}
		}

	};
	//Run startup function to initialise event listeners etc.
	app.control.startUp();

	//provides access from global object for console use
	root.todoApp = app;

})(this);