define([
    'knockout',
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

     function ViewModel() {
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

     return new ViewModel();
  }
);
