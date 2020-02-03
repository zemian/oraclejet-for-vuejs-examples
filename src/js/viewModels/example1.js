define([
    'knockout',
    'marked',
    'loadash',
    'ojs/ojknockout',
    'ojs/ojinputtext'],
    function(ko, marked, _) {

     function ViewModel() {
         this.editorInput = ko.observable("# Hello");
         this.compiledMarkdown = ko.computed(function(){
             let result = marked(this.editorInput(), { sanitize: true });
             //console.log("Markdown:", result);
             return result;
         }, this);

         this.onEditorRawInputChanged = _.debounce(function (event, vm) {
             //console.log("onEditorInputChanged", event, vm);
             vm.editorInput(event.detail.value);
         }, 300);
     }

     return new ViewModel();
  }
);
