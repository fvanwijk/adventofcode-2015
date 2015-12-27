require('fs').readFile('6.txt', 'utf8', function (err, str) {
  const res = str.split('\n').reduce(function (count, instruction) {
    var matches = /(toggle|turn on|turn off) (\d+),(\d+) through (\d+),(\d+)/.exec(instruction);
    for (var i = +matches[2]; i <= +matches[4]; i++) {
      for (var j = +matches[3]; j <= +matches[5]; j++) {
        var index = (i + '-' + j);

        count.lamps[index] = matches[1] === 'toggle' ? 1 - (+!!count.lamps[index]) : matches[1] === 'turn on' ? 1 : 0;

        if (count.brightness[index] === undefined) {
          count.brightness[index] = 0;
        }
        count.brightness[index] += matches[1] === 'toggle' ? 2 : (matches[1] === 'turn on' ? 1 : -1);
        count.brightness[index] = Math.max(0, count.brightness[index]);
      }
    }

    return count;
  }, { lamps: {}, brightness: {} });

  function sumValues(obj) {
    return Object.keys(obj)
      .reduce((count, x) => {
        count += obj[x];
        return count;
      }, 0)
  }

  console.log('1.', sumValues(res.lamps) + ' lights are on');
  // 1. 569999 lights are on
  console.log('2.', sumValues(res.brightness) + ' is the total brightness');
  // 2. 17836115 is the total brightness
});
