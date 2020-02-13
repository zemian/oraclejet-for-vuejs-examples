/*
OJET custom element name must have at least one dash! So we can't match to VueJS
"item" as custom element name. We will use "tree-item" instead.
 */
define(['knockout',
        'ojs/ojcomposite',
        'ojs/ojknockout',],
    function (ko, Composite, ) {

        function TreeItemViewModel(context) {
            this.model = context.properties.model;
            this.open = ko.observable(false);
            this.hasChildren = ko.observable(this.model.children !== undefined);
            this.observableChildren = ko.observableArray(this.model.children);

            this.isFolder = ko.computed(function(){
                return this.hasChildren() && this.observableChildren().length > 0;
            }, this);

            this.toggle = (event) => {
                if (this.isFolder()) {
                    this.open(!this.open());
                }
            };

            this.changeType = (event) => {
                if (!this.isFolder()) {
                    this.hasChildren(true);
                    this.addChild();
                    this.open(true);

                    console.log(event);
                }
            };

            this.addChild = (event) => {
                this.observableChildren.push({
                    name: 'new stuff'
                });
            };
        }

        function ViewModel() {
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

        return new ViewModel();
    }
);
