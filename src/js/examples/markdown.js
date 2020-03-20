/**
 * OJET can bind to UI with JS model using KnockoutJS binding. What OJET provide
 * on top is a very nice set of UI widget sets.
 *
 * OJET also use RequireJS to load up third party libraries. Matching to VueJS
 * example, we will load a Markdown and the LoDash libraries (added in main.js
 * under 'require.config')
 *
 * NOTE that OJET comes with its own styling and theme as well. Hence
 * the textarea input is not able to pick up the VueJS example styling. But
 * functionality it's working fine. To have a exact looks matching, we need
 * to play with OJET flex/grid container to maximize the textarea input.
 */
define(['knockout',
    'marked',
    'loadash',
    'ojs/ojhtmlutils',
    'ojs/ojknockout',
    'ojs/ojbinddom'
], function (ko, marked, _, HtmlUtils) {

    function ExampleViewModel() {
        this.editorInput = ko.observable("# Hello");
        this.compiledMarkdown = ko.computed(function () {
            let result = marked(this.editorInput(), {sanitize: true});
            //console.log("Markdown:", result);
            return {view: HtmlUtils.stringToNodeArray(result)};
        }, this);

        this.onEditorRawInputChanged = _.debounce(function (event, vm) {
            //console.log("onEditorInputChanged", event, vm);
            vm.editorInput(event.detail.value);
        }, 300);
    }

    return ExampleViewModel;
});
