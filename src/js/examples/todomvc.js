/*
Made this popular Todo MVC app to work with OJET. The CSS is actually need
to rework by combining todomvc/index.css version 2.3.0 and 2.0.4 to get it
to work properly.

Note also that VueJS has nice key binding that we need to manually detect
ENTER and ESC to process them here.

Note the localStorage is not working on local testing?
 */
define(['knockout',
    'ojs/ojknockout',
    'director'
    ], function(ko) {

    function ExampleViewModel() {
        let self = this;

        // localStorage persistence
        var STORAGE_KEY = 'todos-vuejs-2.0';
        self.todoStorage = {
            fetch: function () {
                var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
                todos.forEach(function (todo, index) {
                    todo.id = index;
                });
                self.todoStorage.uid = todos.length;
                return todos;
            },
            save: function (todos) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
            }
        };

        // visibility filters
        self.filters = {
            all: function (todos) {
                return todos;
            },
            active: function (todos) {
                return todos.filter(function (todo) {
                    return !todo.completed();
                });
            },
            completed: function (todos) {
                return todos.filter(function (todo) {
                    return todo.completed();
                });
            }
        };

        // ViewModel implementation
        this.todos = ko.observableArray(this.todoStorage.fetch());
        this.visibility = ko.observable('all');
        this.newTodo = ko.observable();
        this.beforeEditCache = null;
        this.editedTodo = ko.observable();
        this.allDone = ko.observable(false);

        this.remaining = ko.computed(function(){
            return this.filters.active(this.todos()).length;
        }, this);

        this.allDoneClicked = () => {
            this.todos().forEach((todo) => {
                todo.completed(this.allDone());
            });
            this.todos.valueHasMutated();
            // Ensure click bubbles up for the check box click to work.
            return true;
        };

        this.pluralize =(n) => {
            return n === 1 ? 'item' : 'items';
        };

        this.filteredTodos = ko.computed(function() {
            return self.filters[this.visibility()](this.todos());
        }, this);

        this.addTodo = (data, event) => {
            let key = event.which || event.keyCode;
            // Take action only if user press ENTER key
            if (key == 13) {
                var value = this.newTodo() && this.newTodo().trim();
                if (!value) {
                    return false;
                }
                this.todos.push({
                    id: self.todoStorage.uid++,
                    title: ko.observable(value),
                    completed: ko.observable(false)
                });
                //console.log("New todo added.", this.newTodo());
                this.newTodo('');
                return false;
            }
            // Return true so it capture input text
            return true;
        };

        this.removeTodo = (todo) => {
            this.todos.splice(this.todos().indexOf(todo), 1);
        };

        this.editTodo = (todo) => {
            this.beforeEditCache = todo.title();
            this.editedTodo(todo);
        };

        this.keydownEdit = (event, todo) => {
            let key = event.which || event.keyCode;
            if (key == 13) {
                // Enter key
                this.doneEdit(todo);
                return false;
            } else if (key == 27) {
                // ESC key
                this.cancelEdit(todo);
                return false;
            } else {
                // Return true so it capture input text
                return true;
            }
        };

        this.doneEdit = (todo) => {
            if (!this.editedTodo()) {
                return;
            }
            this.editedTodo(null);
            todo.title(todo.title().trim());
            if (!todo.title()) {
                this.removeTodo(todo);
            }
        };

        this.cancelEdit = (todo) => {
            console.log(todo);
            this.editedTodo(null);
            todo.title(this.beforeEditCache);
        };

        this.removeCompleted = () => {
            this.todos(self.filters.active(this.todos()));
        };

        this.connected = () => {
            // handle routing - using director library
            function onHashChange () {
                var visibility = window.location.hash.replace(/#\/?/, '');
                if (self.filters[visibility]) {
                    self.visibility(visibility);
                } else {
                    window.location.hash = '';
                    self.visibility('all');
                }
            }

            window.addEventListener('hashchange', onHashChange);
            onHashChange();
        }
    }

    return new ExampleViewModel();
});
