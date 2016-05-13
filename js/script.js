/**
 * 
 */

var URL = 'http://www.jinteki.net/messages/general';
//var URL = 'http://www.w3schools.com/angular/customers.php';

function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

var request = createCORSRequest("get", URL);
if (request){
    request.onload = function() {
        // ...
    };
    request.onreadystatechange = handler;
    request.send();
}


var app = angular.module('chatbox', ['ngResource']);
/*angular.module('app.services', ['ngResource']).
	value('version', '0.1').
	factory('boxDB', function($resource) {
		return $resource('URL', {
			alt:'json',
			appToken:'TOKEN',
			q:'rock',
			callback: 'JSON_CALLBACK'
		},
		{
			get: {
				method:'JSONP',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}
		});
	});

app = angular.module('chatbox');*/

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);


app.controller('myCtrl', function($scope, $http) {
	$scope.message = "WTF";
	$scope.firstName="John";
	$scope.lastName="Doe";
	$http({
		method: "GET",
		url: URL
	}).then(function(response) {
		$scope.chatData = response.data.records;
		$scope.statusCode = response.status;
		$scope.statustext = response.statustext;
	}, function myError(response) {
		$scope.chatData = "NO GOOD";
	});
	
	
	//var url = $resource('http://www.jinteki.net/messages/general');
	//url.get({}, function(response){
	//	$scope.chatData = response.data;
	//	alert("wowowwo");
	//});
});