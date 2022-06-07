'use strict';
var todoAdd = todoAdd || {};
todoAdd.text = function (elem, data) {
    elem.value = '';
    elem.addEventListener("keyup", function () {
        visualsData.todoAdd.text = elem.value;
    });
}
todoAdd.submit = function (elem, data) {
    elem.addEventListener("click", function () {
        appState.todo.push({'text': visualsData.todoAdd.text, 'id': visualsData.todo.length + 1})
        refreshTodoData();
        visualsData.todoAdd.text = '';
        core.render('main');
    });
}