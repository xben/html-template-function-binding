HTML Template Rendering with function-binding
- no build tools:  ~~nodejs~~ ~~npm~~ ~~npx~~ ~~grunt~~
- no dependencies
- runs completely in the browser

Each HTML-Tag in the templates can have data-attributes
data-func: will execute the defined function
data-temp: will include the defined template

Potential improvements
- lazy loading of templates and scripts
- only rerender partials where state changes, not full page 
- allow multiple same data-temp with different data# html-rendering-function-binding
