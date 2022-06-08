/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["ojs/ojcore","ojs/ojtranslation","ojs/ojvalidator","ojs/ojvalidation-error"],function(t,e,o){"use strict";var i=function(t){this.Init(t)};return t.Object.createSubclass(i,o,"oj.RequiredValidator"),i._BUNDLE_KEY_DETAIL="oj-validator.required.detail",i._BUNDLE_KEY_SUMMARY="oj-validator.required.summary",i.prototype.Init=function(t){i.superclass.Init.call(this),this._options=t},i.prototype.validate=function(o){var i,r,a,n,s,l="";if(!("number"==typeof o&&0===o||o&&0!==o.length))throw this._options&&(i=this._options.messageDetail||this._options.message||null,n=this._options.messageSummary||null,l=this._options.label||""),s={label:l},a=n?e.applyParameters(n,s):e.getTranslatedString(this._getSummaryKey(),s),r=i?e.applyParameters(i,s):e.getTranslatedString(this._getDetailKey(),s),new t.ValidatorError(a,r)},i.prototype.getHint=function(){var t="";return this._options&&this._options.hint&&(t=e.getTranslatedString(this._options.hint)),t},i.prototype._getSummaryKey=function(){return i._BUNDLE_KEY_SUMMARY},i.prototype._getDetailKey=function(){return i._BUNDLE_KEY_DETAIL},i});