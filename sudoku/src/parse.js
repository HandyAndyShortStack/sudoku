module.exports = parse;

function parse(str) {
  return str
      .trim()
      .replace(/\n/g, ',')
      .replace(/-/g, '0')
      .split(',')
      .map(function(item) {
        return parseInt(item, 10);
      });
}
