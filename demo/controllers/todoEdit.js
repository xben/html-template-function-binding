'use strict';
var todoEdit = todoEdit || {};
todoEdit.text = function (elem, data) {
    elem.value = data.text
    elem.addEventListener("keyup", function () {
        visualsData.todoEdit.text = elem.value;
    });
}
todoEdit.submit = function (elem, data) {
    elem.addEventListener("click", function () {
        appState.todo.find(todo => todo.id == data.id).text = visualsData.todoEdit.text;
        refreshTodoData();
        core.render('main');
    });
}