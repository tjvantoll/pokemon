var Observable = require("data/observable").Observable;

var page;

exports.onNavigatingTo = function(args) {
  page = args.object;
  page.bindingContext = new Observable(page.navigationContext);
};
