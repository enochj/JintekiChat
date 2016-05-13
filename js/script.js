/**
 * 
 */

var URL = '../js/getChat.php';
var app = angular.module('chatbox', ['ngResource']);

app.controller('myCtrl', function($scope, $http, $interval) {
	$scope.message = "WTF";
	$scope.firstName="John";
	$scope.lastName="Doe";
	
	$http({
		method: "GET",
		url: URL
	}).then(function(response) {
		$scope.chatData = response.data;
		$scope.statusCode = response.status;
		$scope.statustext = response.statustext;
	}, function myError(response) {
		$scope.chatData = response;
	});
	
	$interval(function() {
		$http({
			method: "GET",
			url: URL
		}).then(function(response) {
			$scope.chatData = response.data;
			$scope.statusCode = response.status;
			$scope.statustext = response.statustext;
		}, function myError(response) {
			$scope.chatData = response;
		});
	}, 20000);	
});