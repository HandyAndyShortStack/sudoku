process.stdin.setEncoding('utf8');
process.stdin.on('readable', function() {
  var input = process.stdin.read();
  if (input !== null) {
    console.log(input.trim());
  }
});
