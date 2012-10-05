var http = require("http");

var req_options = {
	//host: '192.168.7.13',
	host: 'localhost',
	port: '8080',
    method: 'POST',
    //path: '/sumar?op1=2&op2=4', //Exemple per a GET.
    //path: 'http://aritmeticops-nodetestingsf.rhcloud.com/dividir', //Exemple per a POST.
    path: '/sumar',
    headers: {
    	//Host: "aritmeticops-nodetestingsf.rhcloud.com"
    }
  };


var nums = {
	op1: 7,
	op2: 16
};

var data = JSON.stringify(nums);


// Request que fa el client.
if(req_options.method === 'POST'){
	req_options.headers['Content-Length'] = data.length;
	req_options.headers['Content-Type'] = 'application/json';
	
	var req = http.request(req_options, function(response){
		var res_data='';
		response.on('data', function(chunk){
			res_data +=chunk;
		});
		response.on('end', function(){
			console.log("El resultat es: " + JSON.parse(res_data).resultat);
			console.log("JSON: "+res_data);
		});
	});
	
	// Tractament d'errors.
	req.on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
	
	req.write(data);
	//console.log("The data i pass: "+data);
	req.end();
	
} else if(req_options.method === 'GET'){
	var req = http.get(req_options, function(response){
		var res_data='';
		response.on('data', function(chunk){
			res_data +=chunk;
		});
		response.on('end', function(){
			console.log("El resultat es: " + JSON.parse(res_data).resultat);
		});
	});
}


