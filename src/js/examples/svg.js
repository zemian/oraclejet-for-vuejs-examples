/*
 */
define(['knockout',
        'ojs/ojcomposite',
        'ojs/ojknockout'],
    function (ko, Composite) {

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

        function ViewModel() {
            this.stats = ko.observableArray([
                { label: 'A', value: ko.observable(100) },
                { label: 'B', value: ko.observable(100) },
                { label: 'C', value: ko.observable(100) },
                { label: 'D', value: ko.observable(100) },
                { label: 'E', value: ko.observable(100) },
                { label: 'F', value: ko.observable(100) }
            ]);
            this.newLabel = ko.observable('');
            this.statsJsonText = ko.computed(()=> {
                let stat_ = this.stats().map(e => {
                    e.value_ = e.value();
                    return e;
                });
                return JSON.stringify(this.stats(), null, 2);
            });

            this.valueToPoint = function(value, index, total) {
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
            };

            this.points = ko.computed(function() {
                var total = this.stats().length;
                var valueToPoint = this.valueToPoint;
                return this.stats().map(function (stat, i) {
                    var point = valueToPoint(stat.value(), i, total);
                    return point.x + ',' + point.y
                }).join(' ');
            }, this);

            this.add = (e) => {
                e.preventDefault();
                if (!this.newLabel) return;
                this.stats.push({
                    label: this.newLabel,
                    value: ko.observable(100)
                });
                this.newLabel = '';
            };

            this.remove = (stat) => {
                if (this.stats().length > 3) {
                    this.stats.splice(this.stats.indexOf(stat), 1);
                } else {
                    alert('Can\'t delete more!');
                }
            };
        }

        return new ViewModel();
    }
);
