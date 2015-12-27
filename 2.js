require('fs').readFile('2.txt', 'utf8', function (err, contents) {
  const res = contents.split('\n').reduce(function (res, box) {
    const
      [l, b, h] = box.split('x').map(i => +i),
      longestSide = Math.max(Math.max(l,b),h),
      volume = l*b*h;
    res.totalPaperArea += 2*l*b + 2*b*h + 2*h*l + volume/longestSide;
    res.totalRibbonLength += 2*(l+b+h-longestSide) + volume;
    return res;
  }, {
    totalPaperArea: 0,
    totalRibbonLength: 0
  });
  console.log('total paper area', res.totalPaperArea);
  console.log('total ribbon', res.totalRibbonLength);
  // total paper area 1598415
  // total ribbon 3812909
});
