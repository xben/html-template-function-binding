'use strict';
var core = core || {
    _currentElement: '',
    _outputDiv: null,
    _visualsData: {},
    _callback: null
};
/**
 * Whenever an element with a data-func attribute was found, a callback with the user defined function will be called.
 */
core._handleFunctionElement = function (tempId, element, data) {
    let dataRef = element.dataset.func;
    if (dataRef) {
        core._callback(tempId, element, data, dataRef)
    }
}
/**
 * Whenever an element with a data-temp attribute was found, the referenced template will be included/appended.
 */
core._handleTemplateElement = function (tempId, element) {
    let dataTemp = element.dataset.temp;
    if (dataTemp) {
        let content = core._getContent(document.getElementById(dataTemp))
        content.map(content => element.appendChild(content))
    }
}
/**
 * Every element of a template will be scanned for data-func or data-temp attributes.
 */
core._handleTemplateContent = function (templateId, templateContent, data) {
    for (let i = 0; i < templateContent.children.length; i++) {
        let element = templateContent.children[i];
        if (element.children.length) {
            core._handleTemplateContent(templateId, element, data)
        }
        core._handleFunctionElement(templateId, element, data);
        core._handleTemplateElement(templateId, element);
    }
}
/**
 * Collects the template contents
 */
core._getContent = function (templateElement) {
    let templateContent = templateElement.content.children[0]
    let data = core._visualsData[templateElement.id] || {}
    if (data.length === undefined) {
        data = [data]
    }
    let contentResolved = [];
    for (let i = 0; i < data.length; i++) {
        let copyTemplateContent = document.importNode(templateContent, true);
        core._handleTemplateContent(templateElement.id, copyTemplateContent, data[i])
        contentResolved.push(copyTemplateContent)
    }
    return contentResolved;
}

/**
 * Load all scripts and templates
 * Renders the first element
 * @param controllersPath path to the controller js files
 * @param visualsPath path to the template html files
 * @param elements list of templates/controllers to include
 * @param currentElement the element to start with
 * @param outputDiv were the content should be appended
 * @param visualsData data of the rendered visuals
 * @param callback handles the data-func calls
 */
core.init = async function (controllersPath, visualsPath, elements, currentElement, outputDiv, visualsData, callback) {
    await Promise.all(elements.map(function (id) {
        let script = document.createElement('script');
        script.src = `${controllersPath}${id}.js`;
        document.body.appendChild(script);
    }))
    await Promise.all(elements.map(id =>
        fetch(`${visualsPath}${id}.html`).then(resp => resp.text()))).then(function (texts) {
            let templateContainer = document.createElement('div');
            document.body.appendChild(templateContainer)
            texts.map(text => templateContainer.innerHTML += text)
        }
    )
    core._currentElement = currentElement;
    core._outputDiv = outputDiv;
    core._visualsData = visualsData;
    core._callback = callback
    core.render(core._currentElement);
}
/**
 * renders the current element again
 */
core.rerender = function () {
    core.render(core._currentElement)
}
/**
 * renders the element
 */
core.render = function (templateId) {
    core._currentElement = templateId;
    let content = core._getContent(document.getElementById(core._currentElement));
    core._outputDiv.innerHTML = "";
    content.map(content => core._outputDiv.appendChild(content))
}
/**
 * Returns the name of the current element
 */
core.getCurrentElement = function () {
    return core._currentElement
}