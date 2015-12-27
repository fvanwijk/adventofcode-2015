require('fs').readFile('5.txt', 'utf8', function (err, str) {
  const res = str.split('\n').reduce(function (count, word) {
    var tests = {
      sameLetterPair: /(\w)\1/.test(word),
      vowels: /([aeiou]\w*){3,}/.test(word),

      containsNoString: !/ab|cd|pq|xy/.test(word),
      repeatingWithLetterInBetween: /(\w)\w\1/.test(word),
      repeatingPair: /(\w\w)\w*\1/.test(word)
    };

    count.first += +(tests.vowels && tests.sameLetterPair && tests.containsNoString);
    count.second += +(tests.repeatingWithLetterInBetween && tests.repeatingPair);

    return count;
  }, { first: 0, second: 0 });

  console.log('1.', res.first + ' Words are nice');
  // 1. 255 Words are nice
  console.log('2.', res.second + ' Words are nice');
  // 2. 55 Words are nice
});
