function isValid(pass) {
  const matches = pass.match(/(\w)\1/g);
  const uniquePairs = matches ? Object.keys(matches.reduce((acc, pair) => {
    acc[pair] = true;
    return acc;
  }, {})) : [];

  return !/[oil]/.test(pass) && uniquePairs.length > 1 && testStraights(pass);
}

function testStraights(pass) {
  for(var i=97;i<97+24;i++) {
    if (new RegExp(String.fromCharCode(i) + String.fromCharCode(i + 1) + String.fromCharCode(i + 2)).test(pass)) {
      return true;
    }
  }
  return false;
}

function nextPassword(input) {
  var arr = input.split('');
  for(var i = arr.length-1;i > 0; i--) {
    if (arr[i] == 'z') {
      arr[i] = 'a';
    } else {
      arr[i] = String.fromCharCode(arr[i].charCodeAt(0) + 1);
      break;
    }
  }
  return arr.join('');
}

var pass = nextPassword('hxbxwxba');
while (!isValid(pass)) {
  pass = nextPassword(pass);
}
console.log('The next password is ' + pass);