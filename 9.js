require('fs').readFile('9.txt', 'utf8', function (err, str) {
  const data = str.split('\n').reduce(function (acc, word) {
    var matches = /(\w+) to (\w+) = (\d+)/.exec(word);
    acc.distances[matches[1] + '-' + matches[2]] = +matches[3];
    acc.distances[matches[2] + '-' + matches[1]] = +matches[3];
    acc.cities[matches[1]] = true;
    acc.cities[matches[2]] = true;
    return acc;
  }, { distances: {}, cities: {} });

  var routes = require('js-combinatorics')
    .permutation(Object.keys(data.cities))
    .map(p => {
      return p.reduce((acc, to) => {
        acc.totalDistance += acc.from ? data.distances[acc.from + '-' + to] : 0;
        acc.from = to;
        return acc;
      }, { totalDistance: 0 });
    })
    .map(x => x.totalDistance);


  console.log('Shortest route is ' + Math.min.apply(this, routes));
  console.log('Longest route is ' + Math.max.apply(this, routes));

});