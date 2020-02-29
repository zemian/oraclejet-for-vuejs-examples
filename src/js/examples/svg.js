/*
The OJET/KO will not render 'svg' element using nested component.
For one the container of custom element is always rendered. (though KO
can use comment container-less render of the component, but it
still not able to redraw svg nested content without a custom
template render loader.) For this reason, we will implement this
demo using single model and bind all svg data directly.

NOTE: There are more experiments work done on this topic in the
svg-component branch of this project.

To make closely UI and control similar to original work as possible,
we choose to use couple of direct KO binding instead of OJET version
so the looks and feel of the control input will look the same.
 */
define(['knockout',
        'ojs/ojknockout'],
    function (ko) {

        function ExampleViewModel() {
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
                    let e_ = Object.assign({}, e);
                    e_.value = e.value();
                    return e_;
                });
                return JSON.stringify(stat_, null, 2);
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

            this.pointLabels = ko.computed(function() {
                var total = this.stats().length;
                var valueToPoint = this.valueToPoint;
                return this.stats().map(function (stat, i) {
                    var point = valueToPoint(stat.value(), i, total);
                    return {point: point, label: stat.label}
                });
            }, this);

            this.add = (e) => {
                e.preventDefault();
                if (!this.newLabel()) {
                    return;
                }
                this.stats.push({
                    label: this.newLabel(),
                    value: ko.observable(100)
                });
                this.newLabel('');
            };

            this.remove = (stat) => {
                if (this.stats().length > 3) {
                    this.stats.splice(this.stats.indexOf(stat), 1);
                } else {
                    alert('Can\'t delete more!');
                }
            };
        }

        return new ExampleViewModel();
    }
);
