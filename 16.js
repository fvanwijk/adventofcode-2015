require('fs').readFile('16.txt', 'utf8', (err, str) => {
  function checkProps(isSecondAssignment) {
    return props.every(propSet => checkProp.apply(this, propSet.concat(isSecondAssignment)));
  }

  function checkProp(prop, op, val, isSecondAssignment) {
    op = isSecondAssignment ? op : '===';

    return !aunt.hasOwnProperty(prop) || {
      '===': aunt[prop] === val,
      '>': aunt[prop] > val,
      '<': aunt[prop] < val
    }[op];
  }

  const aunts = str.split('\n').map(aunt => {
    const matches = aunt.match(/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/);
    return {
      name: matches[1],
      [matches[2]]: +matches[3],
      [matches[4]]: +matches[5],
      [matches[6]]: +matches[7]
    };
  });

  const props = [
    ['cats', '>', 7],
    ['trees', '>', 3],
    ['goldfish', '<', 5],
    ['pomeranians', '<', 3],
    ['children', '===', 3],
    ['samoyeds', '===', 2],
    ['akitas', '===', 0],
    ['vizslas', '===', 0],
    ['cars', '===', 2],
    ['perfumes', '===', 0]
  ];

  for (var aunt of aunts) {
    if (checkProps()) {
      console.log('1. The correct aunt Sue is number ' + aunt.name, aunt);
      // 1. The correct aunt Sue is number 40 { name: '40', vizslas: 0, cats: 7, akitas: 0 }
    }

    if (checkProps(true)) {
      console.log('2. The correct aunt Sue is number ' + aunt.name, aunt);
      // 2. The correct aunt Sue is number 241 { name: '241', cars: 2, pomeranians: 1, samoyeds: 2 }
    }
  }
});
