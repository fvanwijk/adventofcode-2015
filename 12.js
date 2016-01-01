require('fs').readFile('12.txt', 'utf8', function (err, str) {

  function sumNumbers(tree, noRed) {
    var sum = 0;
    for (key in tree) {
      var elem = tree[key];

      if (noRed && Object.prototype.toString.call(tree) == '[object Object]' && elem === 'red') {
        sum = 0;
        break;
      }

      if (typeof elem === 'object') {
        sum += sumNumbers(elem, noRed);
      } else {
        sum += typeof elem === 'string' ? 0 : elem;
      }

    }
    return sum;
  }

  const obj = JSON.parse(str);
  console.log('The sum is ' + sumNumbers(obj));
  // The sum is 119433
  console.log('The sum is ' + sumNumbers(obj, true));
  // The sum is 34744

});