'use strict';
let appState = {
    "showDoneTODOs": true,
    "todo": [
        {'id': 1, 'text': 'This is the text of TODO 1'},
        {'id': 2, 'text': 'This is the text of TODO 2', 'isDone': true},
        {'id': 3, 'text': 'This is the text of TODO 3'}
    ]
}
// the visuals data of the todos will be calculated based on appState
let refreshTodoData = function () {
    visualsData.todo = JSON.parse(JSON.stringify(appState.todo))
    visualsData.todo = visualsData.todo.filter(todo => !todo.isDone || todo.isDone == appState.showDoneTODOs);
}

// data of the rendered visuals
let visualsData = {}
refreshTodoData()

window.onload = function () {
    core.init(
        'demo/controllers/',
        'demo/visuals/',
        ["main", "header", 'todo', 'todoEdit', 'todoAdd'],
        'main',
        document.getElementById("output"),
        visualsData,
        function (tempId, elem, data, dataRef) {
            if (window[tempId][dataRef]) {
                window[tempId][dataRef](elem, data);
            }
        }
    );
}
