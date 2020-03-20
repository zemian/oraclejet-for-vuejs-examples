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
        //injector:mainReleasePaths
            {
                'knockout': 'libs/knockout/knockout-3.5.0.debug',
                'jquery': 'libs/jquery/jquery-3.4.1',
                'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.1',
                'hammerjs': 'libs/hammer/hammer-2.0.8',
                'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.1',
                'ojs': 'libs/oj/v8.1.0/debug' + (_ojNeedsES5 ? '_es5' : ''),
                'ojL10n': 'libs/oj/v8.1.0/ojL10n',
                'ojtranslations': 'libs/oj/v8.1.0/resources',
                'text': 'libs/require/text',
                'signals': 'libs/js-signals/signals',
                'customElements': 'libs/webcomponents/custom-elements.min',
                'proj4': 'libs/proj4js/dist/proj4-src',
                'css': 'libs/require-css/css',
                'touchr': 'libs/touchr/touchr',
                'corejs': 'libs/corejs/shim',
                'regenerator-runtime': 'libs/regenerator-runtime/runtime'
            }
        //endinjector
    });
}());

// Extra Dependencies
// NOTE: Latest dynamics.js is only served from http, and causing issue
//       in live DEMO, so we made a copy in 'src/js/lib' folder.
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
