

function callApi(method, idOrName) {
	let url = "/pokedex-api/" + method;
	if (typeof(idOrName) != "undefined") {
		url += "/" + idOrName;
	}
	return fetch(url).then((res) => res.json());
}


function callApiByUrl(apiurl) {
	let url = "/pokedex-api?apiurl=" + apiurl;
	return fetch(url).then((res) => res.json());
}


module.exports = {
	callApi: callApi,
	callApiByUrl: callApiByUrl
};