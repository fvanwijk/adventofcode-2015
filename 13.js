require('fs').readFile('13.txt', 'utf8', function (err, str) {
  const data = str.split('\n').reduce(function (acc, happiness) {
    const matches = /(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)\./.exec(happiness);
    var key = [matches[1], matches[4]].sort().join('-');
    acc.ratings[key] = acc.ratings[key] || 0;
    acc.ratings[key] += (matches[2] === 'gain' ? 1 : -1) * matches[3];
    acc.names[matches[1]] = true;
    return acc;
  }, { ratings: {}, names: {} });

  const seats = require('js-combinatorics')
    .permutation(Object.keys(data.names))
    .map(p => {
      p = p.concat(p[0]);
      return p.reduce((acc, to) => {
        const happiness = data.ratings[[acc.from, to].sort().join('-')];
        if (acc.from) {
          acc.totalHappiness += happiness;
          acc.minimumHappiness = acc.minimumHappiness ? Math.min(happiness, acc.minimumHappiness) : happiness;
        }
        acc.from = to;
        return acc;
      }, { totalHappiness: 0, minimumHappiness: 0 });
    })
    .map(x => x.totalHappiness - x.minimumHappiness);

  console.log('Maximum happiness with me is ' + Math.max.apply(this, seats));
  // Maximum happiness is 664
  // Maximum happiness with me is 640
});