/**
 * OJET custom element name must have at least one dash! So we can't match to VueJS
 * "item" as custom element name. We will use "tree-item" instead.
 *
 * Observing a model with new attribute is more difficult in KO/OJET. Where VueJS has Vue.set()
 * to dynamically add new attribute and UI will react. In another word, it's harder to detect
 * from model with null attribute changed to observableArray. One solution is we can
 * nest observableArray inside a observable to let UI react to the change.
 *
 * NOTE also that JET can setup any DOM event type with 'on-<event-type-name>' syntax.
 * the attribute with "[[]]" express can have full access to the view model. See
 * on-click and on-dblclick attributes used in html view.
 */
define(['knockout',
        'ojs/ojcomposite',
        'ojs/ojknockout'],
    function (ko, Composite) {

        function TreeItemViewModel(context) {
            this.model = context.properties.model;
            this.open = ko.observable(false);
            this.childrenObsArray = ko.observable();

            if (this.model.children) {
                this.childrenObsArray(ko.observableArray(this.model.children));
            }

            this.isFolder = ko.computed(function(){
                let obsAry = this.childrenObsArray();
                return obsAry && obsAry().length > 0;
            }, this);

            this.toggle = (event) => {
                if (this.isFolder()) {
                    this.open(!this.open());
                }
            };

            this.changeType = (event) => {
                if (!this.isFolder()) {
                    this.model.children = [];
                    this.childrenObsArray(ko.observableArray(this.model.children));
                    this.addChild();
                    this.open(true);
                }
            };

            this.addChild = (event) => {
                this.childrenObsArray().push({
                    name: 'new stuff'
                });
            };
        }

        function ExampleViewModel() {
            // demo data
            var data = {
                name: 'My Tree',
                children: [
                    {name: 'hello'},
                    {name: 'wat'},
                    {
                        name: 'child folder',
                        children: [
                            {
                                name: 'child folder',
                                children: [
                                    {name: 'hello'},
                                    {name: 'wat'}
                                ]
                            },
                            {name: 'hello'},
                            {name: 'wat'},
                            {
                                name: 'child folder',
                                children: [
                                    {name: 'hello'},
                                    {name: 'wat'}
                                ]
                            }
                        ]
                    }
                ]
            };
            this.treeData = data;

            this.connected = () => {
                Composite.register("tree-item", {
                    viewModel: TreeItemViewModel,
                    view: document.getElementById("tree-item-template").innerHTML,
                    metadata: {
                        properties: {
                            model: { type: "object" }
                        }
                    }
                });
            };
        }

        return new ExampleViewModel();
    }
);
