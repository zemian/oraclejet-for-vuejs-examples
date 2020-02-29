define(['knockout', 'css-override-comp3/loader'],
    function (ko) {
        function ExampleViewModel() {
            this.message = ko.observable("CSS TEST 2");
        }
        return new ExampleViewModel();
    }
);
