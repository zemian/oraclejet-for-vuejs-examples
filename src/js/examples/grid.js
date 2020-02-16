/*
In OJET, we can easily create Web component and use a custom HTML element.
OJET actually allow you to organize the web component in a structure with
sub folder etc. In this example, we will do it inline version and register
the component manually, just so we can easily match to VueJS example for
comparision.

NOTE That the OJET component properties can accept KO observable, but you must
access it using 'context.properties.<varName>', and not use a field variable.
As soon as you access it, it's no longer a observable!

Compare to VueJS, 'searchQuery' seems to be pass in and access seamlessly.
The value seems to be observable inside the component without have to treat it
in special form other than declare as 'data'.

OJET does not have a nice 'click' event binding, so we need to use KO version
here.
 */
define(['knockout',
    'ojs/ojcomposite',
    'ojs/ojknockout',
    'ojs/ojinputtext'],
    function(ko, Composite) {
     function DemoGridViewModel(context) {
         //console.log("DemoGridViewModel context: ", context);
         this.columns = context.properties.columns;
         this.data = context.properties.data;

         var sortOrders = {};
         this.columns.forEach(function (key) {
             sortOrders[key] = ko.observable(1);
         });

         this.sortKey = ko.observable('');
         this.sortOrders = sortOrders;

         this.filteredData = ko.computed(function() {
             var filterKey_ = context.properties.filterKey; // input is an observable!
             var sortKey = this.sortKey();
             var filterKey = filterKey_ && filterKey_.toLowerCase();
             var order = this.sortOrders[sortKey] && this.sortOrders[sortKey]() || 1;
             var data = this.data;
             if (filterKey) {
                 data = data.filter(function (row) {
                     return Object.keys(row).some(function (key) {
                         return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
                     });
                 });
             }
             if (sortKey) {
                 data = data.slice().sort(function (a, b) {
                     a = a[sortKey];
                     b = b[sortKey];
                     return (a === b ? 0 : a > b ? 1 : -1) * order;
                 });
             }
             return data;
         }, this);

         this.capitalize = function (str) {
             return str.charAt(0).toUpperCase() + str.slice(1);
         };

         this.sortBy = (key) => {
             // console.log("sortBy event", key);
             this.sortKey(key);
             this.sortOrders[key](this.sortOrders[key]() * -1);
         };
     }

     function ExampleViewModel() {
         this.searchQuery = ko.observable('');
         this.gridColumns = ['name', 'power'];
         this.gridData = [
             { name: 'Chuck Norris', power: Infinity },
             { name: 'Bruce Lee', power: 9000 },
             { name: 'Jackie Chan', power: 7000 },
             { name: 'Jet Li', power: 8000 }
         ];

         this.connected = () => {
             Composite.register("demo-grid", {
                 viewModel: DemoGridViewModel,
                 view: document.getElementById("grid-template").innerHTML,
                 metadata: {
                     properties: {
                         data: { type: "array" },
                         columns: { type: "array" },
                         filterKey: { type: "string", writeback: true }
                     }
                 }
             });
         };
     }

     return new ExampleViewModel();
  }
);
