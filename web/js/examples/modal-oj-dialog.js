define(['knockout',
    'ojs/ojbutton',
    'ojs/ojdialog',
    'ojs/ojknockout'
], function () {
    function ExampleViewModal() {
        this.onOpenModal = (event) => {
            document.getElementById('demo-modal-oj-dialog-1').open();
        };

        this.onCloseModal = (event) => {
            document.getElementById('demo-modal-oj-dialog-1').close();
        };
    }

    return ExampleViewModal;
});
