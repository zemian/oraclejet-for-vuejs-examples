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
        'ojs/ojrouter',
        'ojs/ojmodule',
        'ojs/ojmodule-element',
        'ojs/ojknockout',
        'ojs/ojlistview'],
  function (Bootstrap, ko, ArrayDataProvider) {
    Bootstrap.whenDocumentReady().then(
      function () {
        function init() {
            function ViewModel () {
                this.pageTitle = "OracleJET Examples";
                this.navLinks = {
                    'home': {label: 'Home', value: 'home', isDefault: true},
                    'example1': {label: 'Markdown Editor', value: 'example1'},
                    'example2': {label: 'Github Commits', value: 'example2'}
                };

                // Change default URL adapter
                oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

                // Change the default location for the viewModel and view files
                oj.ModuleBinding.defaults.modelPath = 'app-module/models/';
                oj.ModuleBinding.defaults.viewPath = 'text!app-module/views/';

                // Retrieve the router static instance and configure the states
                this.router = oj.Router.rootInstance;
                this.router.configure(this.navLinks);

                this.navLinksDP = new ArrayDataProvider(Object.values(this.navLinks), {keyAttributes: "value"});
                this.selectedNavLinkId = ko.observable();
                this.onNavLinkChanged = function (event) {
                    //console.log("Changing menu nav", event);
                    // event.detail.value type=KeySetImpl
                    let keyArrays = Array.from(event.detail.value.values());
                    let key = keyArrays[0]; // since we handle single select, we care only first element
                    //console.log("Selected key", key);
                    this.selectedNavLinkId(key);

                    this.router.stateId(key);
                }.bind(this);
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
