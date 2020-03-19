/**
 * The VueJS modal in this example is done by using custom css. We simply just
 * need to implements the component to render the html elements.
 *
 * In this example, we use OJET "oj-bind-slot" instead of VueJS "slot" for content insertion.
 * We also used the OJET AnimationUtils to apply modal effect instead of the VueJS transition.
 */
define(['knockout',
    'ojs/ojcomposite',
    'ojs/ojanimation',
    'ojs/ojknockout'
], function (ko, Composite, AnimationUtils) {
    function DemoModalViewModel(context) {
        this.onCloseModal = (event) => {
            let closeEvent = new CustomEvent('demo-modal-close', {bubbles: true});
            context.element.dispatchEvent(closeEvent);
        };

        this.connected = function (context) {
            // We can "transition" or "animate" our modal appearance
            let el = document.getElementsByClassName("modal-container")[0];
            AnimationUtils.expand(el, {duration: "1s"});
        }
    }

    function ExampleViewModal() {
        this.showModal = ko.observable(false);

        this.onOpenModal = (event) => {
            this.showModal(true);
        };

        this.connected = () => {
            Composite.register("demo-modal", {
                viewModel: DemoModalViewModel,
                view: document.getElementById("demo-modal-template").innerHTML,
                metadata: {
                    "slots" : {
                        "header": {
                            "description": "Header"
                        },
                        "body": {
                            "description": "Body"
                        },
                        "footer": {
                            "description": "Footer"
                        }
                    }
                }
            });

            let el = document.getElementById("demo-modal");
            el.addEventListener("demo-modal-close", () => {
                this.showModal(false);
            });
        };
    }

    return ExampleViewModal;
});
