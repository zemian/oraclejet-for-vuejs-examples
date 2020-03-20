/**
 * To see this demo in action, try press and hold while
 * dragging the blue header, and then release it. It should
 * animate and bounce back to normal shape.
 *
 * The most tricky part of this example is how to update the
 * "this.c" observable points using dynamic library. We have
 * to write a JS object with getter and setter properties wrapper
 * that invoke observable functions in order to get it to work.
 *
 * Another difference with this OJET example compare to VueJS
 * version is we did not use a component to render the header
 * animation, but use the top level KO view model instead.
 */
define(['knockout', 'dynamics'],
    function (ko, dynamics) {
        function ExampleViewModel() {
            this.dragging = ko.observable(false);

            // quadratic bezier control point
            this.c = { x: ko.observable(160), y: ko.observable(160) };

            // record drag start point
            this.start = { x: ko.observable(0), y: ko.observable(0) };

            this.headerPath = ko.computed(() => {
                return 'M0,0 L320,0 320,160' +
                    'Q' + this.c.x() + ',' + this.c.y() +
                    ' 0,160'
            });

            this.contentPosition = ko.computed(() => {
                var dy = this.c.y() - 160;
                var dampen = dy > 0 ? 2 : 4;
                return {
                    transform: 'translate3d(0,' + dy / dampen + 'px,0)'
                }
            });

            this.startDrag = (e) => {
                e = e.changedTouches ? e.changedTouches[0] : e;
                this.dragging(true);
                this.start.x(e.pageX);
                this.start.y(e.pageY);
            };
            this.onDrag = (e) => {
                e = e.changedTouches ? e.changedTouches[0] : e;
                if (this.dragging()) {
                    this.c.x(160 + (e.pageX - this.start.x()));
                    // dampen vertical drag by a factor
                    var dy = e.pageY - this.start.y();
                    var dampen = dy > 0 ? 1.5 : 4;
                    this.c.y(160 + dy / dampen);
                }
            };
            this.stopDrag = (e) => {
                if (this.dragging()) {
                    this.dragging(false);

                    let cPoint = this.c;
                    let animatePoint = {
                        get x() {
                            return cPoint.x();
                        },
                        set x(n) {
                            cPoint.x(n);
                        },
                        get y() {
                            return cPoint.y();
                        },
                        set y(n) {
                            cPoint.y(n);
                        }
                    };
                    dynamics.animate(animatePoint, {
                        x: 160,
                        y: 160
                    }, {
                        type: dynamics.spring,
                        duration: 700,
                        friction: 280
                    });
                }
            };
        }

        return ExampleViewModel;
    }
);
