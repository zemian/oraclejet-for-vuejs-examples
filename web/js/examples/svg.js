define(["knockout","ojs/ojknockout"],(function(t){return function(){this.stats=t.observableArray([{label:"A",value:t.observable(100)},{label:"B",value:t.observable(100)},{label:"C",value:t.observable(100)},{label:"D",value:t.observable(100)},{label:"E",value:t.observable(100)},{label:"F",value:t.observable(100)}]),this.newLabel=t.observable(""),this.statsJsonText=t.computed(()=>{let t=this.stats().map(t=>{let e=Object.assign({},t);return e.value=t.value(),e});return JSON.stringify(t,null,2)}),this.valueToPoint=function(t,e,s){var a=.8*-t,l=2*Math.PI/s*e,n=Math.cos(l),i=Math.sin(l);return{x:0*n-a*i+100,y:0*i+a*n+100}},this.points=t.computed((function(){var t=this.stats().length,e=this.valueToPoint;return this.stats().map((function(s,a){var l=e(s.value(),a,t);return l.x+","+l.y})).join(" ")}),this),this.pointLabels=t.computed((function(){var t=this.stats().length,e=this.valueToPoint;return this.stats().map((function(s,a){return{point:e(s.value(),a,t),label:s.label}}))}),this),this.add=e=>{e.preventDefault(),this.newLabel()&&(this.stats.push({label:this.newLabel(),value:t.observable(100)}),this.newLabel(""))},this.remove=t=>{this.stats().length>3?this.stats.splice(this.stats.indexOf(t),1):alert("Can't delete more!")}}}));