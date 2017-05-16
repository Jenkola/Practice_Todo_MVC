//todo mvc core JS file

(function(root) {

	/*** Helper functions ***/

	//Generates unique ID to be attached to todo objects.
	function generateID() {
		var randomNum = Number(Math.round(Math.random() + 'e7'));
		return 'uid' + randomNum;
	}

	//Finds the index number of a todo in the todos array from the event's parent element's ID property.
	function findIndexFromParentID(e) {
		var matchingIndex,
			$targetElParentId = $(e.target).parent().attr('id');

		app.model.todos.forEach(function(element, index) {
			if(element.id === $targetElParentId) {
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

			deleteTodo: function(index) {

				this.todos.splice(index, 1);
			},			

			editTodoText: function(index, updatedText) {

				this.todos[index].todoText = updatedText;
			},

			removeCompleted: function() {
				
				for (var i = this.todos.length - 1; i >= 0; i--) {
					if (this.todos[i].completed) {
						this.deleteTodo(i);
					}
				}
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
			},

			toggleCompleted: function(index) {

				this.todos[index].completed = !this.todos[index].completed;
			}
		},

		control: {
			//initiated using onclick property on the HTML button.
			addTodo: function() {
				var $addTodoTextInput = $('#addtodotextinput');

				app.model.addTodo($addTodoTextInput.val());
				$addTodoTextInput.val('');
				app.view.displayTodos();
			},

			addTodoKeyEval: function(e) {
				var pressedKey = e.which,
					enter_key = 13,
					escape_key = 27;

				if(pressedKey === enter_key) {
					this.addTodo();
					
				} else if (pressedKey === escape_key) {
					$(e.target).val('').blur();	
				}
			},

			editTodoText: function(e) {
				var $targetEl = $(e.target);
				
					if ($targetEl.hasClass('todotextfield')) {
						var editTodoIndexNumber = findIndexFromParentID(e),
							$targetTextVal = $targetEl.val();

						app.model.editTodoText(editTodoIndexNumber, $targetTextVal);
						app.view.displayTodos();
					}
			},

			editTodoKeyEval: function(e) {
				var pressedKey = e.which,
					enter_key = 13,
					escape_key = 27;

				if(pressedKey === enter_key) {
					this.editTodoText(e);
					$(e.target).blur();
					
				} else if (pressedKey === escape_key) {
					var editTodoIndexNumber = findIndexFromParentID(e);

					$(e.target).val(app.model.todos[editTodoIndexNumber].todoText).blur();	
				}				

			},

			deleteTodo: function(e) {
				
				if ($(e.target).hasClass('deletetodobutton')) {
					var deleteTodoIndexNumber = findIndexFromParentID(e);

						app.model.deleteTodo(deleteTodoIndexNumber);
						app.view.displayTodos();
				}
			},

			//initiated using onclick property on the HTML button.
			removeCompleted: function() {

				app.model.removeCompleted();
				app.view.displayTodos();
			},

			startUp: function() {
				this.setUpEventListeners();
			},

			setUpEventListeners: function() {
				
				$('#todolist').on('click', this.deleteTodo.bind(this))
					.on('change', this.toggleCompleted.bind(this))
					.on('focusout', this.editTodoText.bind(this))
					.on('keyup', this.editTodoKeyEval.bind(this));

				$('#addtodotextinput').on('keyup', this.addTodoKeyEval.bind(this));
			},

			//initiated using onclick property on the HTML button.
			toggleAll: function() {

				app.model.toggleAll();
				app.view.displayTodos();
			},						

			toggleCompleted: function(e) {
				
				if ($(e.target).hasClass('togglecompletedcheckbox')) {
					var toggleCompletedIndexNumber = findIndexFromParentID(e);

					app.model.toggleCompleted(toggleCompletedIndexNumber);
					app.view.displayTodos();
				}
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