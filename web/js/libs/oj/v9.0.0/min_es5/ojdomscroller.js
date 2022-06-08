/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["ojs/ojcore-base","jquery"],function(e,t){"use strict";var r=function(e,r,i){i=i||{},this._data=r,this._asyncIterator=i.asyncIterator,this._element=t(e)[0],this._fetchSize=i.fetchSize,this._fetchSize=this._fetchSize>0?this._fetchSize:25,this._maxCount=i.maxCount,this._maxCount=this._maxCount>0?this._maxCount:500,this._rowCount=i.initialRowCount>0?i.initialRowCount:0,this._successCallback=i.success,this._requestCallback=i.request,this._errorCallback=i.error,this._beforeFetchCallback=i.beforeFetch,this._handleScrollTopCallback=i.onScrollTop,this._localKeyValidator=i.localKeyValidator,this._registerDataSourceEventListeners(),this._fetchTrigger=i.fetchTrigger,(null==this._fetchTrigger||isNaN(this._fetchTrigger))&&(this._fetchTrigger=0),this._initialScrollTop=this._element.scrollTop,this._lastFetchTrigger=0,this._isScrollTriggeredByMouseWheel=!1,t(this._getScrollEventElement()).on({"scroll.domscroller":function(){var e=this._element,t=this._getScrollTop(e),r=e.scrollHeight-e.clientHeight;r>0&&this._handleScrollerScrollTop(t,r)}.bind(this),"wheel.domscroller":function(){this._isScrollTriggeredByMouseWheel=!0}.bind(this),"mousedown.domscroller":function(){this._isScrollTriggeredByMouseWheel=!1}.bind(this)})};return r.prototype.setFetchTrigger=function(e){null!=e&&!isNaN(e)&&e>=0&&(this._fetchTrigger=e)},r.prototype._getScrollEventElement=function(){return this._element===document.body||this._element===document.documentElement?window:this._element},r.calculateOffsetTop=function(e,r){for(var i=0,o=r;o&&o!==e&&t.contains(e,o);)i+=o.offsetTop,o=o.offsetParent;return i},r.prototype._getScrollTop=function(e){var t=this._fetchTrigger;return e===document.documentElement&&(void 0===this._useBodyScrollTop&&(this._useBodyScrollTop=this._initialScrollTop===e.scrollTop),this._useBodyScrollTop)?t+document.body.scrollTop:t+e.scrollTop},r.prototype.destroy=function(){this._unregisterDataSourceEventListeners(),t(this._getScrollEventElement()).off(".domscroller")},r.prototype.checkViewport=function(){return this._asyncIterator&&this._element.clientHeight>0&&!this.isOverflow()?this._fetchMoreRows():Promise.resolve(null)},r.prototype._doFetch=function(e){var t=this;if(this._beforeFetchCallback(e-this._fetchTrigger)){this._lastFetchTrigger=e;var r=t._isScrollTriggeredByMouseWheel;this._fetchPromise=this._fetchMoreRows().then(function(e){t._successCallback&&(e.isMouseWheel=r,t._successCallback(e),t._fetchPromise=null,t._nextFetchTrigger=void 0)},function(e){t._errorCallback&&(t._errorCallback(e),t._fetchPromise=null,t._nextFetchTrigger=void 0)})}else this._nextFetchTrigger=void 0},r.prototype._handleScrollerScrollTop=function(e,t){this._handleScrollTopCallback&&this._handleScrollTopCallback(e),!this._fetchPromise&&this._asyncIterator&&(t!==this._lastMaxScrollTop&&(this._nextFetchTrigger=Math.max(0,(t-e)/2),this._lastMaxScrollTop=t),null!=this._nextFetchTrigger&&e-this._lastFetchTrigger>this._nextFetchTrigger)?this._doFetch(e):t-e<1&&e>this._fetchTrigger&&(this._fetchPromise?this._asyncIterator?null!=this._requestCallback&&this._requestCallback():null!=this._errorCallback&&this._errorCallback():this._asyncIterator&&this._doFetch(e))},r.prototype.isOverflow=function(){var t=this._element,r=t.scrollHeight-(t.clientHeight+this._fetchTrigger);return 1===r&&e.AgentUtils.getAgentInfo().browser===e.AgentUtils.BROWSER.EDGE&&(r=0),r>0},r.prototype._fetchMoreRows=function(){if(!this._fetchPromise){var e=this._maxCount-this._rowCount;if(e>0){var t=this;if(this._asyncIterator)return this._fetchPromise=this._asyncIterator.next().then(function(r){var i=r;return t._fetchPromise=null,null!=i&&null!=i.value&&(i.value.data.length>0&&(t._rowCount+=i.value.data.length,e<t._fetchSize&&(i.maxCount=t._maxCount,i.maxCountLimit=!0,i.value.data.length>e&&(i.value.data=i.value.data.slice(0,e),i.value.metadata=i.value.metadata.slice(0,e),null!=i.value.fetchParameters&&(i.value.fetchParameters.size=e)))),(i.done||i.maxCountLimit)&&(t._asyncIterator=null)),Promise.resolve(i)}),this._fetchPromise}return this._asyncIterator=null,Promise.resolve({maxCount:this._maxCount,maxCountLimit:!0})}return this._fetchPromise},r.prototype._handleDataRowMutateEvent=function(e){if(null!=this._asyncIterator){var t,r,i,o=this;null!=e.detail.add&&(null!=(t=e.detail.add).indexes?r=t.indexes:null!=t.addBeforeKeys?i=t.addBeforeKeys:null!=t.afterKeys&&(i=t.afterKeys),this._handleDataRowAddedOrRemoved(i,r,function(){o._rowCount+=1})),null!=e.detail.remove&&(null!=(t=e.detail.remove).indexes?r=t.indexes:null!=t.keys&&(i=t.keys),this._handleDataRowAddedOrRemoved(i,r,function(){o._rowCount-=1}))}},r.prototype._handleDataRowAddedOrRemoved=function(e,t,r){if(t)for(var i=0;i<t.length;i++){var o=t[i];void 0!==o&&this._rowCount>0&&o<=this._rowCount&&r()}else if(e){var l=this._localKeyValidator;null!=l&&e.forEach(function(e){l(e)&&r()})}},r.prototype._registerDataSourceEventListeners=function(){var e,t,r=this._data;if(null!=r)for(this._unregisterDataSourceEventListeners(),this._dataProviderEventHandlers=[],this._dataProviderEventHandlers.push({eventType:"mutate",eventHandler:this._handleDataRowMutateEvent.bind(this)}),e=0;e<this._dataProviderEventHandlers.length;e++)(t=r.addEventListener(this._dataProviderEventHandlers[e].eventType,this._dataProviderEventHandlers[e].eventHandler))&&(this._dataProviderEventHandlers[e].eventHandler=t)},r.prototype._unregisterDataSourceEventListeners=function(){var e,t=this._data;if(null!=this._dataProviderEventHandlers&&null!=t)for(e=0;e<this._dataProviderEventHandlers.length;e++)t.removeEventListener(this._dataProviderEventHandlers[e].eventType,this._dataProviderEventHandlers[e].eventHandler)},r});