var fileSystemModule = require("file-system");
var documents = fileSystemModule.knownFolders.currentApp();

exports.getPokemonList = function() {
  var file = documents.getFile("data/pokemon.json");
  return new Promise(function(resolve, reject) {
      file.readText()
        .then(function(content) {
          var data = JSON.parse(content);
          data.forEach(function(pokemon) {
            pokemon.sprite = "~/img/" + pokemon.number + ".png";
          });
          resolve(data);
        }).catch(function(err) {
          reject(err);
        });
  });
};
