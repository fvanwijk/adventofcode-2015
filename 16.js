require('fs').readFile('16.txt', 'utf8', function (err, str) {
  const props = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
  };

  const aunts = str.split('\n').map(function (aunt) {
    var regex = /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/;
    const matches = aunt.match(regex);
    var auntDetails = {};
    auntDetails[matches[2]] = +matches[3];
    auntDetails[matches[4]] = +matches[5];
    auntDetails[matches[6]] = +matches[7];
    return auntDetails;
  });

  for (var i = 0; i < aunts.length; i++) {
    var isCorrectAunt = true;
    for (var prop in aunts[i]) {
      //console.log('compare ' + prop + ' ' + aunts[i][prop] + ' with ' + props[prop]);
      if (aunts[i][prop] !== props[prop]) {
        isCorrectAunt = false;
        break;
      }
    }

    if (isCorrectAunt) {
      console.log('The correct aunt Sue is number ' + (i+1), aunts[i]);
      break;
    }
  }
});
