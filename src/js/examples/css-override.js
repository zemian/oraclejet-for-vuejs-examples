/**
 * The requireJS method of loading CSS can not have same name
 * or the last style loaded will override previous one and
 * does not refresh!
 *
 * This happens even if you use OJET component. One way to
 * avoid is ensure you prefix the css style with unique name!
 *
 * In this DEMO, notice the original RED color will be overridden
 * and lost as you used other views then come back.
 */
define(['knockout', 'css-override-comp/loader'],
    function (ko) {
        function ExampleViewModel() {
            this.message = ko.observable("CSS TEST");
        }
        return new ExampleViewModel();
    }
);
