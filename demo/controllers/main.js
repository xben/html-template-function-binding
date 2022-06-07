'use strict';
var main = main || {};
main.gotoTodoAdd = function (elem, data) {
    elem.addEventListener("click", function () {
        visualsData.todoAdd = {}
        core.render('todoAdd');
    });
}
main.toggleDoneTodos = function (elem, data) {
    elem.addEventListener("click", function () {
        appState.showDoneTODOs = !appState.showDoneTODOs;
        refreshTodoData();
        core.rerender();
    });
}