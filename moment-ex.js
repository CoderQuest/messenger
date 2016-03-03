var moment = require('moment');
var now = moment();
console.log(now.format());

// now.subtract(1, 'year');

// console.log('hell',now.format())
// console.log(now.format('MMM Do YYYY, h:mma')); // 12:50pm
console.log(now.format('X'));  // shows Unix timestamp, in seconds
// console.log(now.format('x')); // shows Unix timestamp, in millisecond
console.log(now.valueOf());  // this is a javascript timestamp that we can use for comparison

var timestamp = now.valueOf();

// getting a local representation
var timestampMoment = moment.utc(timestamp);

//use .local before format to get local time
console.log(timestampMoment.local().format('h:mma'))
