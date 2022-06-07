'use strict';
var header = header || {};
header.title = function (elem, data) {
    let pageTitles = {
        "main": 'List of TODOS',
        "todoEdit": 'Edit TODO',
        "todoAdd": 'Add a new TODO',
    }
    elem.textContent = pageTitles[core.getCurrentElement()]
}
header.home = function (elem, data) {
    elem.addEventListener("click", function () {
        core.render('main');
    });
    elem.style.display = core.getCurrentElement() == 'main' ? 'none' : "inline";
}