/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

requirejs.config(
  {
    baseUrl: 'js',

    // Path mappings for the logical module names
    // Update the main-release-paths.json for release mode when updating the mappings
    paths:
    //injector:mainReleasePaths
    {
      'knockout': 'libs/knockout/knockout-3.5.0.debug',
      'jquery': 'libs/jquery/jquery-3.4.1',
      'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.1',
      'promise': 'libs/es6-promise/es6-promise',
      'hammerjs': 'libs/hammer/hammer-2.0.8',
      'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
      'ojs': 'libs/oj/v7.2.0/debug',
      'ojL10n': 'libs/oj/v7.2.0/ojL10n',
      'ojtranslations': 'libs/oj/v7.2.0/resources',
      'text': 'libs/require/text',
      'signals': 'libs/js-signals/signals',
      'customElements': 'libs/webcomponents/custom-elements.min',
      'proj4': 'libs/proj4js/dist/proj4-src',
      'css': 'libs/require-css/css',
      'touchr': 'libs/touchr/touchr'
    }
    //endinjector
  }
  );

// Extra Examples Dependencies
require.config({
    paths: {
        'marked': 'https://unpkg.com/marked@0.3.6/lib/marked',
        'loadash': 'https://unpkg.com/lodash@4.16.0/lodash'
    }
});

require(['ojs/ojbootstrap',
        'knockout',
        'ojs/ojarraydataprovider',
        'ojs/ojmodule-element-utils',
        'ojs/ojkeyset',
        'ojs/ojmodule-element',
        'ojs/ojknockout',
        'ojs/ojlistview'],
  function (Bootstrap, ko, ArrayDataProvider, ModuleUtils, KeySet) {
    Bootstrap.whenDocumentReady().then(
      function () {
        function init() {
            function ViewModel () {
                // === Setup default module router
                this.moduleConfig = ko.observable({"view": [], "viewModel": null});

                this.loadModuleConfig = function (name) {
                    let modName = "examples";
                    let viewPath = `${modName}/${name}.html`;
                    let modelPath = `${modName}/${name}`;
                    let cssPromise = new Promise(function(resolve, reject) {
                        require([`css!${modName}/${name}.css`], resolve, reject);
                    });
                    let masterPromise = Promise.all([
                        ModuleUtils.createView({"viewPath": viewPath}),
                        ModuleUtils.createViewModel({"viewModelPath": modelPath}),
                        cssPromise
                    ]);
                    masterPromise.then((values) => {
                        this.moduleConfig({"view": values[0],"viewModel": values[1]});
                    });
                };

                // === Setup Nav Links
                this.pageTitle = ko.observable();
                this.navLinks = {
                    'home': {label: 'Home', pageTitle: 'OracleJET Examples', isDefault: true},
                    'markdown': {label: 'Markdown Editor', pageTitle: 'Markdown Editor Example'},
                    'commits': {label: 'Github Commits', pageTitle: 'GitHub Commits Example'},
                    'grid': {label: 'Grid Component', pageTitle: 'Grid Component Example'},
                    'tree': {label: 'Tree View', pageTitle: 'Tree View Example'},
                };

                // Build array from the object with key as the 'value' property
                let navLinksArray = Object.entries(this.navLinks).map(([k, v]) => {
                    v.value = k;
                    return v;
                });
                this.navLinksDP = new ArrayDataProvider(navLinksArray, {keyAttributes: "value"});
                this.onNavLinkChanged = function(event) {
                    //console.log("Changing menu nav", event);
                    // event.detail.value type=KeySetImpl
                    let keyArrays = Array.from(event.detail.value.values());
                    let key = keyArrays[0]; // since we handle single select, we care only first element
                    //console.log("Selected key", key);

                    this.pageTitle(this.navLinks[key].pageTitle);

                    this.loadModuleConfig(key);
                }.bind(this);

                // === Setup default navLink selection & load module
                let selectedLink = Object.values(this.navLinks).find(e => e.isDefault);
                if (!selectedLink) {
                    selectedLink = this.navLinks['home'];
                }
                this.selectedNavLink = new KeySet.KeySetImpl([selectedLink.value]);
                this.pageTitle(selectedLink.pageTitle);
                this.loadModuleConfig(selectedLink.value);
            }

            let app = new ViewModel();

            // Bind your ViewModel for the content of the whole page body.
            ko.applyBindings(app, document.getElementById('app'));
        }

        // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready
        // event before executing any code that might interact with Cordova APIs or plugins.
        if (document.body.classList.contains('oj-hybrid')) {
          document.addEventListener('deviceready', init);
        } else {
          init();
        }
      });
  }
);
