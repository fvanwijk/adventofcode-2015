const crypto = require('crypto');

for(var i=0;i<99999999;i++) {
  var hash = crypto.createHash('md5').update('yzbqklnj' + i, 'utf8').digest('hex');
  if (hash.substr(0,6) === '000000') {
    console.log('Hash ' + hash + ' is created with input ' + i);
    // Hash 0000004b347bf4b398b3f62ace7cd301 is created with input 9962624
    break;
  }
}
