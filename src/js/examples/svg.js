/*
 */
define(['knockout',
        'ojs/ojcomposite',
        'ojs/ojknockout'],
    function (ko, Composite) {

        function valueToPoint(value, index, total) {
            var x     = 0;
            var y     = -value * 0.8;
            var angle = Math.PI * 2 / total * index;
            var cos   = Math.cos(angle);
            var sin   = Math.sin(angle);
            var tx    = x * cos - y * sin + 100;
            var ty    = x * sin + y * cos + 100;
            return {
                x: tx,
                y: ty
            };
        }

        // function SvgAxisLabelVM(context) {
        //     this.stat =context.properties.stat;
        //     this.index =context.properties.index;
        //     this.total =context.properties.total;
        //
        //     this.point = ko.computed(function () {
        //         return valueToPoint(
        //             +this.stat.value + 10,
        //             this.index,
        //             this.total
        //         )
        //     }, this);
        // }

        function SvgPolygraphVM(context) {
            console.log(context);
            // a computed property for the polygon's points
            // this.points = ko.computed(function () {
            //     var stats = context.properties.stats;
            //     var total = stats.length;
            //     return stats.map(function (stat, i) {
            //         var point = valueToPoint(stat.value, i, total);
            //         return point.x + ',' + point.y
            //     }).join(' ');
            // }, this);
        }

        function ViewModel() {
            this.stats = [
                { label: 'A', value: 100 },
                { label: 'B', value: 100 },
                { label: 'C', value: 100 },
                { label: 'D', value: 100 },
                { label: 'E', value: 100 },
                { label: 'F', value: 100 }
            ];
            // this.statsObsArray = ko.observableArray(this.stats);
            // this.newLabel = ko.observable('');
            // this.statsJsonText = ko.computed(()=> {
            //     return JSON.stringify(this.statsObsArray(), null, 2);
            // });
            //
            // this.add = (e) => {
            //     e.preventDefault();
            //     if (!this.newLabel) return;
            //     this.stats.push({
            //         label: this.newLabel,
            //         value: 100
            //     });
            //     this.newLabel = '';
            // };
            //
            // this.remove = (stat) => {
            //     if (this.stats.length > 3) {
            //         this.stats.splice(this.stats.indexOf(stat), 1);
            //     } else {
            //         alert('Can\'t delete more!');
            //     }
            // };

            // metadata: {
            //     properties: {
            //         stats: { type: "array" }
            //     }
            // }

            this.connected = () => {
                Composite.register("svg-polygraph", {
                    viewModel: SvgPolygraphVM,
                    view: document.getElementById("svg-polygraph-template").innerHTML,

                });

                // Composite.register("svg-axis-label", {
                //     viewModel: SvgAxisLabelVM,
                //     view: document.getElementById("svg-axis-label-template").innerHTML,
                //     metadata: {
                //         properties: {
                //             stats: { type: "array" }
                //         }
                //     }
                // });
            };
        }

        return new ViewModel();
    }
);
