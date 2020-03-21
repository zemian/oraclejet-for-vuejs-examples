/**
 * Main ViewModel for the index.html, which is a Single Page Application.
 *
 * This ViewModel uses oj-module component to load different pages into the application
 * under "example" folder. Each example page contains their own html, viewModel and a css file.
 *
 * The module is loaded by using a "NavLink" object that uses "id" as the module name, and the
 * objects itself as options parameters. The following options are supported:
 *
 *  - pathPrefix - default to "examples" folder.
 *  - skipCss - default is undefined.
 *  - skipViewModel - default is undefined.
 *
 * So the module loader will load the following files by default:
 *  <options.pathPrefix>/<navLink.id>.html
 *  <options.pathPrefix>/<navLink.id>.js
 *  <options.pathPrefix>/<navLink.id>.css
 *
 * The navLink id and options can be overridden by URL query parameters. For example:
 *
 *   index.html?id=test
 *      Loads "examples/test.html", "js: and "css" files.
 *
 *   index.html?id=test&skipCss=true&skipViewModel=true
 *      Loads "examples/test.html" only.
 *
 *   index.html?id=test&pathPrefix=my-examples
 *      Loads "my-examples/test.html", "js: and "css" files.
 */
require(['text!nav-links.json',
    'ojs/ojbootstrap',
    'knockout',
    'ojs/ojarraydataprovider',
    'ojs/ojmodule-element-utils',
    'ojs/ojmodule-element',
    'ojs/ojknockout',
    'ojs/ojnavigationlist',
    'ojs/ojprogress'
], function (navLinksJsonText, Bootstrap, ko, ArrayDataProvider, ModuleUtils) {

    function AppViewModel() {
        // == Data
        this.moduleConfig = ko.observable({"view": [], "viewModel": null});
        this.currentNavLink = ko.observable();
        this.showProgress = ko.observable(false);

        this.navLinks = null;
        this.navLinksDP = null;

        // === Event Handlers
        this.onNavLinkChanged = function (event) {
            //console.log("Changing menu nav", event);
            let name = event.detail.value;
            let navLink = this.navLinks.find(e => e.id === name);
            this.currentNavLink(navLink);
            this.loadModuleConfig(navLink.id, navLink);
        }.bind(this);

        // === Support Methods
        this.loadModuleConfig = function (name, options) {
            console.log("Loading module: ", name, options);

            this.showProgress(true);

            // Setup default options
            options = Object.assign(options || {}, {pathPrefix: "examples"});

            let pathPrefix = options.pathPrefix;
            let viewPath = `${pathPrefix}/${name}.html`;
            let modelPath = `${pathPrefix}/${name}`;
            let promiseArray = [];

            let viewPromise = ModuleUtils.createView({"viewPath": viewPath});
            promiseArray.push(viewPromise);
            if (!options.skipViewModel) {
                let viewModelPromise = ModuleUtils.createViewModel({"viewModelPath": modelPath});
                promiseArray.push(viewModelPromise);
            }
            if (!options.skipCss) {
                let cssPromise = new Promise(function (resolve, reject) {
                    require([`css!${pathPrefix}/${name}.css`], resolve, reject);
                });
                promiseArray.push(cssPromise);
            }
            Promise.all(promiseArray).then((values) => {
                this.moduleConfig({"view": values[0], "viewModel": values[1]});
                this.showProgress(false);
            });
        };

        this.init = function () {
            // Initialize model data
            this.navLinks = JSON.parse(navLinksJsonText);
            this.navLinksDP = new ArrayDataProvider(this.navLinks, {keyAttributes: "id"});

            let navLink;

            // Parse query string to see if navLink is give
            let params = new URLSearchParams(window.location.search);
            if (params.has("id")) {
                let name = params.get("id");
                navLink = this.navLinks.find(e => e.id === name);
                if (!navLink) {
                    // If we don't find it in nav-links.json, we will manually create one
                    navLink = {id: name, pageTitle: name};
                    // Add rest of query params as module options
                    for (let pair of params.entries()) {
                        navLink[pair[0]] = pair[1];
                    }
                }
            } else {
                // Load navLink from nav-links.json
                // Note the navLink is also pass as the module options
                navLink = this.navLinks.find(e => e.isDefault);
            }
            this.currentNavLink(navLink);
            this.loadModuleConfig(navLink.id, navLink);
        };

        // Init ViewModel
        this.init();
    }

    Bootstrap.whenDocumentReady().then(function () {
        let app = new AppViewModel();
        ko.applyBindings(app, document.getElementById('app'));
    });
});
