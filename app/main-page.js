var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var pokemonService = require("./data/pokemon-service");

var page;
var firstTime = true;
var allPokemon = [];
var pageData = new Observable();
pageData.set("allPokemon", allPokemon);

exports.pageLoaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;

  if (firstTime) {
    pokemonService.getPokemonList().then(function(data) {
      allPokemon = data;
      // allPokemon.splice(50, 999);
      pageData.set("allPokemon", allPokemon);
    });
  }

  firstTime = false;
};

exports.navigate = function(args) {
  frameModule.topmost().navigate({
    moduleName: "detail-page",
    context: args.object.bindingContext
  });
};
