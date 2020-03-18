require(['text!navLinks.json',
        'ojs/ojbootstrap',
        'knockout',
        'ojs/ojarraydataprovider',
        'ojs/ojmodule-element-utils',
        'ojs/ojkeyset',
        'ojs/ojmodule-element',
        'ojs/ojknockout',
        'ojs/ojlistview'],
    function (navLinksJsonText, Bootstrap, ko, ArrayDataProvider, ModuleUtils, KeySet) {

        function AppViewModel() {
            // == Data for UI
            this.moduleConfig = ko.observable({"view": [], "viewModel": null});
            this.pageTitle = ko.observable();
            this.selectedNavLink = ko.observable();

            // == Service Data
            this.navLinks = JSON.parse(navLinksJsonText);

            this.loadModuleConfig = function (name) {
                let modName = "examples";
                let viewPath = `${modName}/${name}.html`;
                let modelPath = `${modName}/${name}`;
                let cssPromise = new Promise(function (resolve, reject) {
                    require([`css!${modName}/${name}.css`], resolve, reject);
                });
                let masterPromise = Promise.all([
                    ModuleUtils.createView({"viewPath": viewPath}),
                    ModuleUtils.createViewModel({"viewModelPath": modelPath}),
                    cssPromise
                ]);
                masterPromise.then((values) => {
                    this.moduleConfig({"view": values[0], "viewModel": values[1]});
                });
            };

            // === Setup Nav Links

            // Build array from the object with key as the 'value' property
            let navLinksArray = Object.entries(this.navLinks).map(([k, v]) => {
                v.value = k;
                return v;
            });
            this.navLinksDP = new ArrayDataProvider(navLinksArray, {keyAttributes: "value"});
            this.onNavLinkChanged = function (event) {
                //console.log("Changing menu nav", event);
                // event.detail.value type=KeySetImpl
                let keyArrays = Array.from(event.detail.value.values());
                let key = keyArrays[0]; // since we handle single select, we care only first element
                //console.log("Selected key", key);

                this.pageTitle(this.navLinks[key].pageTitle);
                this.loadModuleConfig(key);
            }.bind(this);

            // === Setup default navLink selection & load module
            this.init = function () {
                let selectedLink = Object.values(this.navLinks).find(e => e.isDefault);
                if (!selectedLink) {
                    selectedLink = this.navLinks['home'];
                }
                this.selectedNavLink(new KeySet.KeySetImpl([selectedLink.value]));
                this.pageTitle(selectedLink.pageTitle);
                this.loadModuleConfig(selectedLink.value);
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
