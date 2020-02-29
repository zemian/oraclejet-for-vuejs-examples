/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./css-override-comp-view.html', './css-override-comp-viewModel', 'text!./component.json', 'css!./css-override-comp-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('css-override-comp', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);