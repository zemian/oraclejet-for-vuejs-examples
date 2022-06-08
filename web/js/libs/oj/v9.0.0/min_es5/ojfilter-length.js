/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["ojs/ojcore","ojs/ojfilter"],function(n,t){"use strict";function o(n,t){for(var o=0;o<t.length;o++){var e=t[o];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}return function(){function n(t){if(function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.options=t,!t.max)throw new Error("length filter's max option cannot be less than 1. max option is "+t.max);if(isNaN(t.max))throw new Error("length filter's max option is not a number. max option is "+t.max);if(null!==t.max&&t.max<1)throw new Error("length filter's max option cannot be less than 1. max option is "+t.max);t.countBy=void 0===t.countBy?"codePoint":t.countBy}var t,e,i;return t=n,(e=[{key:"filter",value:function(n,t){return this.calcLength(t)<=this.options.max?t:n.slice(0,this.options.max)}},{key:"calcLength",value:function(n){var t=this.options.countBy;if(""==n||null==n||null==n)return 0;var o,e=n.length,i=0;switch(t){case"codePoint":for(var r=0;r<e;r++)55296==(63488&n.charCodeAt(r))&&(i+=1);o=e-i/2;break;case"codeUnit":default:o=e}return o}}])&&o(t.prototype,e),i&&o(t,i),n}()});