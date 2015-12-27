require('fs').readFile('3.txt', 'utf8', function (err, moves) {
  function bringPresent(res, position) {
    res[position.x + ':' + position.y] += 1;
  }

  const
    positions = [{x: 0, y: 0}, {x: 0, y: 0}],
    startingRes = {};

  bringPresent(startingRes, positions[0]);
  bringPresent(startingRes, positions[1]);

  const res = moves.split('').reduce(function (res, move, i) {
    const pos = positions[i%2];
    switch (move) {
      case 'v':
        pos.y++;
        break;
      case '^':
        pos.y--;
        break;
      case '<':
        pos.x--;
        break;
      case '>':
        pos.x++;
        break;
    }

    bringPresent(res, pos);

    return res;
  }, startingRes);

  console.log('At least one present', Object.keys(res).length);
  // At least one present 2341
});