require('fs').readFile('8.txt', 'utf8', function (err, str) {
  const res = str.split('\n').reduce(function (count, word) {
    eval('var a = ' + word);
    count.words += word.length;
    count.mem += a.length;
    count.encoded += word.match(/["\\]/g).length + 2;
    return count;
  }, { words: 0, mem: 0, encoded: 0 });

  console.log('Diff between string and memory representation: ' + (res.words - res.mem)); // 1342
  console.log('Diff between string and encoded representation: ' + res.encoded); // 2074
});
