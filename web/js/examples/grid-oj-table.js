/**
 * The grid demo works more like KnockoutJS application than OJET.
 * So this version of grid will use OJET table component to implements
 * the same behavior. Notice the html is much simpler thanks
 * to the OJET rich component.
 */
define(['knockout',
    'ojs/ojcomposite',
    'ojs/ojarraydataprovider',
    'ojs/ojknockout',
    'ojs/ojinputtext',
    'ojs/ojtable'
], function (ko, Composite, ArrayDataProvider) {
    function ExampleViewModel() {
        this.searchQuery = ko.observable();
        this.gridData = [
            {name: 'Chuck Norris', power: Infinity},
            {name: 'Bruce Lee', power: 9000},
            {name: 'Jackie Chan', power: 7000},
            {name: 'Jet Li', power: 8000}
        ];
        this.gridDataObsAry = ko.observableArray(this.gridData);
        this.gridDataProvider = new ArrayDataProvider(this.gridDataObsAry);

        this.filter = () => {
            let search = this.searchQuery().toLowerCase();
            let filteredData = this.gridData.filter(item => {
                return Object.keys(item).some(k => {
                    return String(item[k]).toLowerCase().indexOf(search) >= 0;
                });
            });
            this.gridDataObsAry(filteredData);
        };
    }

    return ExampleViewModel;
});
