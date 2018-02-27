angular.module('starter.controllers')
.controller('editPersonalInfo', function ($scope, $ionicLoading, $http, $state, settings, $stateParams) {
    $scope.PersonalInfo = {};
    $scope.PersonalInfo = $stateParams.PersonalInfo;
    $scope.states = [];

    $http.get(settings.ServiceURL + '/GetStatesItems')
         	.success(function (data){

         		$scope.states = data;
         	});
    
    $scope.DoEdit = function () {

        $http.post(settings.ServiceURL + '/EditPersonalInfo?', $scope.PersonalInfo)
          .success(function (data) {

            $scope.personalinfo = data;

         });

        $state.go('app.personalInfo', { PersonalInfo: $scope.PersonalInfo });
    };


});
