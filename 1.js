require('fs').readFile('1.txt', 'utf8', function (err, str) {
  var
    floor = 0,
    found;

  str.split('').forEach(function (c, i) {
    floor = floor + (c == '(' ? 1 : -1);
    if (floor === -1 && !found) {
      console.log('At floor -1 on character', i + 1);
      found = true;
    }
  });
  console.log('ended at floor', floor);
});
