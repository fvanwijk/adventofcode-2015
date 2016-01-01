require('fs').readFile('14.txt', 'utf8', function (err, str) {
  function getDistance({speed, fly, rest}, input) {
    const phase = fly + rest,
      leftSeconds = input % phase,
      fullPhases = (input - leftSeconds) / phase;
    return fullPhases * speed * fly + speed * Math.min(fly, leftSeconds);
  }

  const reindeers = str.split('\n').map(function (reindeer) {
    const matches = /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\./.exec(reindeer);
    return {
      name: matches[1],
      speed: +matches[2],
      fly: +matches[3],
      rest: +matches[4],
      points: 0
    };
  });
  var maxDistance, lead;

  for (var i = 1; i <= 2503; i++) {
    var distances = reindeers.map(function (reindeer) {
      return getDistance(reindeer, i);
    });
    maxDistance = Math.max.apply(this, distances);
    lead = reindeers[distances.indexOf(maxDistance)];
    lead.points++;
  }

  console.log(lead.name + ' is the fastest with a distance of ' + maxDistance);
  // Donner is the fastest with a distance of 2655
  var reindeerPoints = reindeers.map(reindeer => reindeer.points);
  var maxPoints = Math.max.apply(this, reindeerPoints);
  console.log(reindeers[reindeerPoints.indexOf(maxPoints)].name + ' has the most points: ' + maxPoints);
  // Vixen has the most points: 1059
});
