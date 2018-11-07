
var http = require('https');

function getApi(method) {
	return new Promise((resolve, reject) => {
	
	var apiUrl = "https://pokeapi.co/api/v2/";
	if (method.indexOf("https") === 0) {
		apiUrl = method;
	} else {
		apiUrl += method + '/';
	}
	console.log(apiUrl + " for method " + method);
		http.get(apiUrl, (res) => {
		  const { statusCode } = res;
		  const contentType = res.headers['content-type'];

		  res.setEncoding('utf8');
		  let rawData = '';
		  res.on('data', (chunk) => { rawData += chunk; });
		  res.on('end', () => {
			try {
			  const parsedData = JSON.parse(rawData);
			  resolve(parsedData);
			} catch (e) {
				reject(e);
			}
		  });
		}).on('error', (e) => {
			reject(e);
		});
    })
};

module.exports = {
	getApi: getApi
};