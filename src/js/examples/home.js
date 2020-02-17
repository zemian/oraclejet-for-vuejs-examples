define(['knockout'],
    function (ko) {
        function ExampleViewModel() {
            this.serverTime = ko.observable(new Date());

            this.connected = () => {
                let updateServerTime = () => {
                    this.serverTime(new Date());
                    setTimeout(updateServerTime, 1000);
                };
                updateServerTime();
            };
        }
        return new ExampleViewModel();
    }
);
