require('fs').readFile('8.txt', 'utf8', function (err, str) {
  const res = str.split('\n').reduce(function (count, word) {
    eval('var a = ' + word);
    count += word.length - a.length;
    //console.log(word, word.length, new String(word).length);
    return count;
  }, 0);

  console.log('Diff between string and memory representation: ' + res); // 1342
});
