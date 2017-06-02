var observableModule = require("data/observable");

var page;

exports.onNavigatingTo = function(args) {
  page = args.object;
  page.bindingContext = observableModule.fromObject(page.navigationContext);
};
