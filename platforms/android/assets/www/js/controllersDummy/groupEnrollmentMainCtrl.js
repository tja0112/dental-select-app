angular.module('starter.controllers')
.controller('groupEnrollmentMainCtrl', function ($scope, $stateParams, $state, settings, $http) {
    $scope.model = {};
    $scope.model.test =[];
   
    $http.get(settings.ServiceURL + '/AvailablesPlans?GroupKey='+ settings.GroupKey + '&MemberId=' + $stateParams.MemberId)
        .then(function (response) {
            settings.LOBs = response.data;

            settings.LOBs[0].ImageName = "DENTAL PLAN";
            settings.LOBs[1].ImageName = "VISION PLAN";
            settings.LOBs[2].ImageName = "AD&D PLAN";
            $scope.plans = settings.LOBs;
        },

        function(response){
            alert('error: ' + response.statusText);
        });


  

});

