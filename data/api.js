var fs = require("fs");
var request = require("request");
var FILE_NAME = "pokemon2.json";
var STARTING_NUMBER = 237;
var number = STARTING_NUMBER;

function retrievePokemonInfo() {
  request("http://pokeapi.co/api/v2/pokemon/" + number, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      console.log("Handling #" + number + ": " + data.name);

      var types = [];
      data.types.forEach((typeObject) => {
        types.push(typeObject.type.name);
      });

      var prefix = (number == STARTING_NUMBER) ? "\n" : ",\n";
      fs.appendFileSync(FILE_NAME, prefix + JSON.stringify({
        name: data.name,
        number: data.id,
        sprite: data.sprites.front_default,
        types: types
      }));
      number++;

      retrievePokemonInfo();
    } else {
      console.log("End");
      fs.appendFileSync(FILE_NAME, "\n]");
    }
  });
}

fs.writeFileSync(FILE_NAME, "[");
retrievePokemonInfo();
