(function(root) {

	/*** Helper functions ***/
	var util = {
		//Returns number of todos, and number with completed: true
		countTodos: function() {
			var numberOfOutstandingTodos = app.model.todos.filter(function(todo) {
				return !todo.completed;
			}).length;

			return {todos: app.model.todos.length,
					outstanding: numberOfOutstandingTodos};
		},

		//Finds the index number of a todo in app.model.todos from the event's parent element's ID property.
		findIndexFromParentID: function(e) {
			var matchingIndex,
				$targetElParentId = $(e.target).parent().attr('id');

			app.model.todos.forEach(function(element, index) {
				if(element.id === $targetElParentId) {
					matchingIndex = index;
				}
			});
			return matchingIndex;
		},

		//Generates unique ID to be attached to todo objects.
		generateID: function() {
			var randomNum = Number(Math.round(Math.random() + 'e7'));
			return 'uid' + randomNum;
		},

		//Updates or retrieves todos array from localStorage
		storage: function(nameSpace, data) {
			if (arguments.length === 2) {
				localStorage.setItem(nameSpace, JSON.stringify(data));
			} else {
				return JSON.parse(localStorage.getItem(nameSpace)) || [];
			}
		}
	};

	/*** Core app ***/
	var app = {
		//Model with core methods for manipulating todos array.
		model: {

			addTodo: function(todoText) {
				this.todos.push({
					todoText: todoText,
					completed: false,
					id: util.generateID()
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
				//If all todos are completed, make all completed === false.
				if(util.countTodos().outstanding === 0) {
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
				app.view.render();
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

			deleteTodo: function(e) {
				
				if ($(e.target).hasClass('deletetodobutton')) {
					var deleteTodoIndexNumber = util.findIndexFromParentID(e);

						app.model.deleteTodo(deleteTodoIndexNumber);
						app.view.render();
				}
			},			

			editTodoText: function(e) {
				var $targetEl = $(e.target);
				
					if ($targetEl.hasClass('todotextfield')) {
						var editTodoIndexNumber = util.findIndexFromParentID(e),
							$targetTextVal = $targetEl.val();

						app.model.editTodoText(editTodoIndexNumber, $targetTextVal);
						app.view.render();
					}
			},

			editTodoKeyEval: function(e) {
				var pressedKey = e.which,
					enter_key = 13,
					escape_key = 27;

				if(pressedKey === enter_key) {
					this.editTodoText(e);
					$(e.target).blur();
				//Esc: Revert text field value back to pre-existing todo text
				} else if (pressedKey === escape_key) {
					var editTodoIndexNumber = util.findIndexFromParentID(e);
					$(e.target).val(app.model.todos[editTodoIndexNumber].todoText).blur();	
				}				

			},

			//initiated using onclick property on the HTML button.
			removeCompleted: function() {
				app.model.removeCompleted();
				app.view.render();
			},

			startUp: function() {
				app.model.todos = util.storage('todo_mvc');
				this.setUpEventListeners();
				app.view.render();
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
				app.view.render();
			},						

			toggleCompleted: function(e) {
				
				if ($(e.target).hasClass('togglecompletedcheckbox')) {
					var toggleCompletedIndexNumber = util.findIndexFromParentID(e);

					app.model.toggleCompleted(toggleCompletedIndexNumber);
					app.view.render();
				}
			}
		},

		//Methods for rendering todo list in index.html
		view: {
			//Utilises Handlebars.js
			displayStatus: function() {
				var $todoStatusEl = $('#todostatus'),
					$handlebarsTemplate = Handlebars.compile($('#status-template').html()),
					todoStatusHTML = $handlebarsTemplate(util.countTodos());

				$todoStatusEl.html('');
				$todoStatusEl.append(todoStatusHTML);
			},
			//Utilises Handlebars.js to compile LI templates based on data from each todo.
			displayTodos: function() {
				var $todoListULelement = $('#todolist'),
					$handlebarsTemplate = Handlebars.compile($('#todo-template').html());

				$todoListULelement.html('');
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
			},

			render: function() {
				util.storage('todo_mvc', app.model.todos);
				this.displayTodos();
				this.displayStatus();
			}			
		}

	};
	//Run startup function to initialise event listeners etc.
	app.control.startUp();

	//provides access from global object for console use
	root.todoApp = app;

})(this);