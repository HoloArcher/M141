var request = require("request");

console.log('CRUD CREATE')
// var urls = [
// 	'todo',
// 	'todo/statuses',
// 	'todo/priorities',
// 	'todo/users',
// ]
// urls.forEach(async url => {
// 	var options = {
// 		method: 'GET',
// 		url: 'http://localhost:3000/api/' + url,
// 		headers:
// 		{
// 			'cache-control': 'no-cache',
// 			Connection: 'keep-alive',
// 			'accept-encoding': 'gzip, deflate',
// 			Host: 'localhost:3000',
// 			'Postman-Token': '83034e3f-6542-4892-be2e-5eec549fd34f,2754eeab-2783-4729-bc07-037e821bee8f',
// 			'Cache-Control': 'no-cache',
// 			Accept: '*/*',
// 			'User-Agent': 'PostmanRuntime/7.13.0',
// 			'Content-Type': 'application/json'
// 		}
// 	};

// 	request(options, function (error, response, body) {
// 		if (error) throw new Error(error);
// 		console.log('Endpoint: http://localhost:3000/api/' + url);
// 		console.log(body + '\n');
// 	});
// })

console.log('CRUD POST');

(async function () {

	var options = {
		method: 'POST',
		url: 'http://localhost:3000/api/todo',
		headers:
		{
			'cache-control': 'no-cache',
			Connection: 'keep-alive',
			'content-length': '141',
			'accept-encoding': 'gzip, deflate',
			Host: 'localhost:3000',
			'Postman-Token': '9074e263-d8ad-4a9d-b5cf-46b784aef659,8d60d48b-1009-484b-b8d7-b39612dfec75',
			'Cache-Control': 'no-cache',
			Accept: '*/*',
			'User-Agent': 'PostmanRuntime/7.13.0',
			'Content-Type': 'application/json'
		},
		body:
		{
			text: 'todo',
			start_date: '2019-11-01',
			end_date: '2019-11-01',
			status_id: 5,
			priority_id: 3,
			owner: 'nachname vorname'
		},
		json: true
	};

	request(options, function (error, response, body) {
		if (error) throw new Error(error);

		console.log(body);
		console.log(response);
	});
})


console.log('CRUD ALTER')

var options = {
	method: 'PUT',
	url: 'http://localhost:3000/api/todo/154',
	headers:
	{
		'cache-control': 'no-cache',
		Connection: 'keep-alive',
		'content-length': '141',
		'accept-encoding': 'gzip, deflate',
		Host: 'localhost:3000',
		'Postman-Token': '9074e263-d8ad-4a9d-b5cf-46b784aef659,7028389e-1a46-441f-8711-852183309691',
		'Cache-Control': 'no-cache',
		Accept: '*/*',
		'User-Agent': 'PostmanRuntime/7.13.0',
		'Content-Type': 'application/json'
	},
	body:
	{
		"text": "dsaffasdf",
		"start_date": "2019-11-5",
		"end_date": "2019-11-19",
		"status_id": 4,
		"priority_id": 3,
		"owner": "josiah schiess"
	},
	json: true
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});


console.log('CRUD DELETE')






