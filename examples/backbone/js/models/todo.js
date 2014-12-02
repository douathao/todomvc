/*global Backbone, _ */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.Todo = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			completed: false,
			subTodo: []
		},

		// Toggle the `completed` state of this todo item.
		toggle: function () {
			var subTodo = this.get('subTodo');

			if (subTodo.length > 0) {
				this.save({
					completed: this.allSubTodoComplete() ? true : false
				});
			} else {
				this.save({
					completed: !this.get('completed')
				});
			}
		},

		toggleSub: function (index) {
			var subTodo = this.get('subTodo')[index];

			subTodo.completed = !subTodo.completed;

			this.allSubTodoComplete();
		},

		allSubTodoComplete: function () {
			var subTodo = this.get('subTodo'),
				isComplete = true;

			if (subTodo.length > 0) {
				_.each(subTodo, function (todo) {
					if (todo.completed === false) {
						isComplete = false;
					}
				});
			} else {
				isComplete = false;
			}

			this.save({
				completed: isComplete ? true : false
			});

			return isComplete;
		},

		addSubTodo: function () {
			this.get('subTodo').push({
				title: ' ',
				completed: false
			});
			this.set({'completed': false, silent: true});
			this.save();
			this.trigger('change');
		},

		removeSub: function (index) {
			this.get('subTodo').splice(index, 1);
			this.allSubTodoComplete();
			this.trigger('change');
		},

		updateSubTitle: function (index, value) {
			this.get('subTodo')[index].title = value;
			this.save();
			this.trigger('change');
		}
	});
})();
