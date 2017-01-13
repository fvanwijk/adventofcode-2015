require('fs').readFile('17.txt', 'utf8', (err, str) => {
  var combinations = require('js-combinatorics')
    .power(str.split('\n'))
    .filter(containers => containers.reduce((a, b) => a + +b, 0) === 150);

  console.log('There are ' + combinations.length + ' combinations of containers that add up to 150L');

  const lengths = combinations.reduce((acc, combination) => {
    const len = acc[combination.length];
    acc[combination.length] = len ? len+1 : 1;
    return acc;
  }, {});

  const shortestLength = Object.keys(lengths)[0];
  console.log('There are ' + lengths[shortestLength] + ' combinations with the shortest length of ' + shortestLength);
});