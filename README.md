# Practice_Todo_MVC
I'm just learning GIT whilst creating JS todoMVC type app.

Move along, nothing interesting here!!

# File Structure

  -App usable within index.html
  -Core JS all within js/todo_mvc.js
  -Utilises the following frameworks:
  	libs/handlebars-v4.0.js   (http://handlebarsjs.com/)
  	libs/jquery-3.2.1.js      (http://jquery.com/)

# Version log
V0.01 Begin model creation:
  -The following functions added:
    -addTodo
    -editTodoText
    -deleteTodo
    -toggleCompleted
    -displayTodos
    
V0.02 
  -Added toggleAll function to toggle all todos' completed property.
  
V0.03
  -Migrated the displayTodos function to display todos as list elements in the HTML rather than in the console.

V0.04
  -Added 'delete all completed' function to delete all todos with completed: true.
  
V0.05
  -Added controls for the model in index.html
  
V0.06
  -Added control methods in JS, linked to fields/buttons in index.html, which trigger model and view methods.

V0.07
  -Added delete todo and toggle completed buttons onto HTML li items.

V0.08
  -Delete todo and toggle completed buttons on li items now work.

V0.09
  -Implemented Handlebars.js to use templating for li item creation.

V0.1
  -Subsituted in jQuery for all dom selection and manipulation.

V0.11
  -Replaced toggle complete button with checkbox on each todo. Checkbox also displays completed status.

V0.12
  -Now displays todo text in a text input field on each li item. User can edit todo text via this field.

V0.13
  -Add todo and edit todo text fields now respond to Enter and Esc keyboard keys.

V0.14
  -Addded todos/outstanding todos counter.
