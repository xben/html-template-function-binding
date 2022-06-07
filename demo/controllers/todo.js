'use strict';
var todo = todo || {};
todo.text = function (elem, data) {
    elem.textContent = data.text;
    elem.addEventListener("click", function () {
        visualsData.todoEdit = {...data}
        core.render('todoEdit');
    });
}
todo.checkDone = function (elem, data) {
    elem.checked = data.isDone
    elem.addEventListener("click", function () {
        appState.todo.find(todo => todo.id == data.id).isDone = !appState.todo.find(todo => todo.id == data.id).isDone;
        refreshTodoData()
    });
}
