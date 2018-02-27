angular.module('starter.controllers')
.controller('newMemberRegistrationInfoCtrl', function ($scope, $stateParams,$http, settings) {
	
	$scope.Employee = {};

	$scope.Employee.Name = $stateParams.FirstName + " " + $stateParams.LastName;

	console.log($stateParams.DateOfBirth);
	console.log($stateParams.DateOfBirth instanceof Date);
	$scope.Employee.DateofBirth = $stateParams.DateOfBirth.toLocaleDateString();
});	