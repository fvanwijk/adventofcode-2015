function lookAndSay(str){
  return str.replace(/(.)\1*/g, function(seq, p1){
    return seq.length.toString() + p1;
  });
}

function lookAndSaySequence(input, times) {
  for (var i = 0; i < times; i++) {
    input = lookAndSay(input);
  }
  return input;
}

console.log(lookAndSaySequence('1113222113', 40).length);
// 252594
console.log(lookAndSaySequence('1113222113', 50).length);
// 3579328
