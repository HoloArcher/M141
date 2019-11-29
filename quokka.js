const fs = require('fs');

var sql = fs.readFileSync('./datenbankscirpt.sql',{encoding: 'utf-8'})


var k = sql.split(');')
console.log(k[3]);

for (n in k ) {
	console.log(k[n]);
}