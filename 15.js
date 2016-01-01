require('fs').readFile('15.txt', 'utf8', function (err, str) {
  //str = `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
//Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`;
  function getScore(config) {
    var res = {
      capacity: 0,
      durability: 0,
      flavor: 0,
      texture: 0,
      calories: 0
    };

    for (ingredientName in config) {
      for (property in res) {
        res[property] += config[ingredientName] * ingredients[ingredientName][property];
      }
    }

    return Math.max(0, res.capacity) * Math.max(0, res.durability) * Math.max(0, res.flavor) * Math.max(0, res.texture);
  }

  const ingredients = str.split('\n').reduce(function (acc, ingredient) {
    const matches = /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/.exec(ingredient);
    acc[matches[1]] = {
      capacity: +matches[2],
      durability: +matches[3],
      flavor: +matches[4],
      texture: +matches[5],
      calories: +matches[6]
    };
    return acc;
  }, {});

  var combinations = [], size = 100;
  for (var i = 0;i<=size;i++) {
    for (var j = 0;j<=size;j++) {
      for (var k = 0;i+j+k<=size;k++) {
        combinations.push({Sprinkles: i, PeanutButter: j, Frosting: k, Sugar: size-i-j-k});
      }
    }
  }

  var res = combinations
    .map(function (config) {
      return {
        config: config,
        score: Math.max(0, getScore(config))
      };
    })
    .reduce(function (maxConfig, config) {
      return Math.max(maxConfig.score, config.score) == config.score ? config : maxConfig;
    }, { score: 0 });

  console.log('Max score is ' + res.score + ' with config', res.config);
});
