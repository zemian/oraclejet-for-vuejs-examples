/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';
/**
 * RequireJS config for OJET
 */
(function () {
    function _ojIsIE11() {
        var nAgt = navigator.userAgent;
        return nAgt.indexOf('MSIE') !== -1 || !!nAgt.match(/Trident.*rv:11./);
    }

    var _ojNeedsES5 = _ojIsIE11();
    requirejs.config({
        baseUrl: 'js',

        // Path mappings for the logical module names
        // Update the main-release-paths.json for release mode when updating the mappings
        paths:

        /* DO NOT MODIFY
        ** All paths are dynamicaly generated from the path_mappings.json file.
        ** Add any new library dependencies in path_mappings json file
        */
// injector:mainReleasePaths

{
  "knockout":"libs/knockout/knockout-3.5.1.debug",
  "jquery":"libs/jquery/jquery-3.5.1",
  "jqueryui-amd":"libs/jquery/jqueryui-amd-1.12.1",
  "promise":"libs/es6-promise/es6-promise",
  "hammerjs":"libs/hammer/hammer-2.0.8",
  "ojdnd":"libs/dnd-polyfill/dnd-polyfill-1.0.2",
  "ojs":"libs/oj/v9.0.0/debug" + (_ojNeedsES5 ? "_es5" : ""),
  "ojL10n":"libs/oj/v9.0.0/ojL10n",
  "ojtranslations":"libs/oj/v9.0.0/resources",
  "persist":"libs/persist/debug",
  "text":"libs/require/text",
  "signals":"libs/js-signals/signals",
  "touchr":"libs/touchr/touchr",
  "regenerator-runtime":"libs/regenerator-runtime/runtime",
  "corejs":"libs/corejs/shim",
  "customElements":"libs/webcomponents/custom-elements.min",
  "proj4":"libs/proj4js/dist/proj4-src",
  "css":"libs/require-css/css",
  "css-builder":"libs/require-css/css-builder",
  "normalize":"libs/require-css/normalize"
}

// endinjector
    });
}());

// Extra Dependencies
// NOTE: The Latest dynamics.js served from http is causing issue during loading
//       in live DEMO. Making a copy in 'src/js/lib' folder seems to fixed the problem.
require.config({
    paths: {
        'marked': 'https://unpkg.com/marked@0.3.6/lib/marked',
        'loadash': 'https://unpkg.com/lodash@4.16.0/lodash',
        'director': 'https://unpkg.com/director@1.2.8/build/director',
        'dynamics': 'lib/dynamicjs/dynamics',
        'select2': 'https://unpkg.com/select2@4.0.3/dist/js/select2',
        'select2_css': 'https://unpkg.com/select2@4.0.3/dist/css/select2.min'
    }
});
