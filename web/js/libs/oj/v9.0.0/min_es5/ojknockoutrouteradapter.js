/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["knockout","ojs/ojlogger"],function(t,e){"use strict";function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(){function n(r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n);var o=t.observable();this._observableState=t.pureComputed({read:function(){return o()},write:function(){throw Error('"state" observable cannot be written to')}}),this._observablePath=t.pureComputed({read:function(){return o()&&o().path},write:function(t){r.go({path:t}).catch(function(t){e.info("KnockoutRouterAdapter router.go() failed with: "+t),o.valueHasMutated()})}}),this._observablePath.equalityComparer=null,this._stateSubscription=r.currentState.subscribe(function(t){o(t.state)})}var o,a,u;return o=n,(a=[{key:"destroy",value:function(){this._stateSubscription.unsubscribe()}},{key:"state",get:function(){return this._observableState}},{key:"path",get:function(){return this._observablePath}}])&&r(o.prototype,a),u&&r(o,u),n}()});