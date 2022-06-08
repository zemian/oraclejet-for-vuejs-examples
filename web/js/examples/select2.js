/**
 * This demo is trying to wrap a jQuery plugin "select2" into a custom component.
 *
 * OJET component is not able to wrap "select2" and treat it as native wrapper component
 * for jquery plugin. The best it can do is wrap it and handle attributes passing
 * and even with write back (see the selected value). This is fine for most cases anyway.
 *
 * This means that inside the component, we can't just use jQuery $(component-element) to
 * perform changes. We need to use $(context.element).find("select") instead.
 *
 * Note that we can not default slot with "<option>" into the component! Hence the default
 * <option> is actually manually added inside the component.
 */
define([
    'knockout',
    'ojs/ojcomposite',
    'jquery',
    'select2',
    'css!select2_css',
    'ojs/ojknockout'
], function (ko, Composite, $) {

    function DemoSelect2ViewModel(context) {

        this.connected = () => {
            let options = context.properties.options;
            let value = context.properties.selected;
            $(context.element).find("select")
                .val(value)
                // init select2
                .select2({data: options})
                .on('change', function (event) {
                    let newValue = $(this).children("option:selected").val();
                    context.properties.selected = newValue;
                });
        };
    }

    function ExampleViewModel() {
        this.selected = ko.observable(0);
        this.options = [
            {id: 1, text: 'Hello'},
            {id: 2, text: 'World'}
        ];

        this.connected = function () {
            //$('#states').select2();

            Composite.register("demo-select2", {
                viewModel: DemoSelect2ViewModel,
                view: document.getElementById("demo-select2-template").innerHTML,
                metadata: {
                    properties: {
                        options: {type: "array"},
                        selected: {type: "number", writeback: true}
                    }
                }
            });
        };
    }

    return ExampleViewModel;
});
