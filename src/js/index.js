require(['text!nav-links.json',
        'ojs/ojbootstrap',
        'knockout',
        'ojs/ojarraydataprovider',
        'ojs/ojmodule-element-utils',
        'ojs/ojmodule-element',
        'ojs/ojknockout',
        'ojs/ojnavigationlist'],
    function (navLinksJsonText, Bootstrap, ko, ArrayDataProvider, ModuleUtils) {

        function AppViewModel() {
            // == Data
            this.moduleConfig = ko.observable({"view": [], "viewModel": null});
            this.currentNavLink = ko.observable();
            this.navLinks = null;
            this.navLinksDP = null;

            // === Event Handlers
            this.onNavLinkChanged = function (event) {
                //console.log("Changing menu nav", event);
                let name = event.detail.value;
                let navLink = this.navLinks.find(e => e.id === name);
                this.currentNavLink(navLink);
                this.loadModuleConfig(navLink.id);
            }.bind(this);

            // === Support Methods
            this.loadModuleConfig = function (name) {
                let path = "examples";
                let viewPath = `${path}/${name}.html`;
                let modelPath = `${path}/${name}`;
                let cssPromise = new Promise(function (resolve, reject) {
                    require([`css!${path}/${name}.css`], resolve, reject);
                });
                let masterPromise = Promise.all([
                    ModuleUtils.createView({"viewPath": viewPath}),
                    ModuleUtils.createViewModel({"viewModelPath": modelPath}),
                    cssPromise
                ]);
                masterPromise.then((values) => {
                    console.log("Switching to module: " + viewPath);
                    this.moduleConfig({"view": values[0], "viewModel": values[1]});
                });
            };

            this.init = function () {
                // Initialize model data
                this.navLinks = JSON.parse(navLinksJsonText);
                this.navLinksDP = new ArrayDataProvider(this.navLinks, {keyAttributes: "id"});

                // Parse query string to see if navLink is give
                let params = new URLSearchParams(window.location.search);
                if (params.has("example")) {
                    let name = params.get("example");
                    let navLink = this.navLinks.find(e => e.id === name);
                    if (!navLink) {
                        navLink = {id: name, pageTitle: name};
                    }
                    this.currentNavLink(navLink);
                    this.loadModuleConfig(navLink.id);
                } else {
                    let navLink = this.navLinks.find(e => e.isDefault);
                    this.currentNavLink(navLink);
                    this.loadModuleConfig(navLink.id);
                }
            };

            // Init ViewModel
            this.init();
        }

        Bootstrap.whenDocumentReady().then(function () {
            let app = new AppViewModel();
            ko.applyBindings(app, document.getElementById('app'));
        });
    }
);
