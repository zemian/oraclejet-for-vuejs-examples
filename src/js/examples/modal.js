define(['knockout', 'ojs/ojcomposite', 'ojs/ojknockout'], function (ko, Composite) {
    function DemoModalViewModel(context) {
        this.onCloseModal = (event) => {
            let closeEvent = new CustomEvent('demo-modal-close', {bubbles: true});
            context.element.dispatchEvent(closeEvent);
        };
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
