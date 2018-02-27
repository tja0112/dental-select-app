angular.module('starter.controllers')
.controller('editPersonalInfo', function ($scope, $ionicLoading, $http, $state, settings, $stateParams,services) {
    $scope.PersonalInfo = {};
    $scope.PersonalInfo = $stateParams.PersonalInfo;
    $scope.states = [];
    $scope.processing = true;

    services.getStatesItems()
    .then(function (data) {
        $scope.states = data;
        $scope.processing = false;
    })

    //$http.get(settings.ServiceURL + '/GetStatesItems')
    //     	.success(function (data){

    //     		$scope.states = data;
    //     	});
    
    $scope.DoEdit = function () {
        $scope.processing = true;

        //$http.post(settings.ServiceURL + '/EditPersonalInfo?', $scope.PersonalInfo)
        //  .success(function (data) {

        //    $scope.personalinfo = data;

        //  });

        services.setEditPersonalInfo(null,$scope.PersonalInfo)
        .then(function (data) {
            //if (data.Success) {
                $scope.personalinfo = data;
                $state.go('app.personalInfo', { PersonalInfo: $scope.PersonalInfo });
            //}
            //else {
            //    alert("No information updated");
            //}
                $scope.processing = false;
        })

       
    };


});
