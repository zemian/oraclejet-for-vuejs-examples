define(['knockout', 'css-override-comp2/loader'],
    function (ko) {
        function ExampleViewModel() {
            this.message = ko.observable("CSS TEST 2");
        }
        return new ExampleViewModel();
    }
);
