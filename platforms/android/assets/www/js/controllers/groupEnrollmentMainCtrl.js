angular.module('starter.controllers')
.controller('groupEnrollmentMainCtrl', function ($scope, $stateParams, $state, settings, $http, services) {
    $scope.model = {};
    $scope.model.test = [];
    $scope.processing = false;

    services.getAvailablesPlans(settings.GroupKey, $stateParams.MemberId)
    .then(function (response) {
        $scope.processing = true;
        settings.LOBs = response;
        settings.LOBs[0].ImageName = "DENTAL PLAN";
        settings.LOBs[1].ImageName = "VISION PLAN";
        settings.LOBs[2].ImageName = "AD&D PLAN";
        $scope.plans = settings.LOBs;
        $scope.processing = false;
                }, function (error) {
                    alert('error: ' + error.statusText);
        $scope.processing = false;
                })
    //$http.get(settings.ServiceURL + '/AvailablesPlans?GroupKey='+ settings.GroupKey + '&MemberId=' + $stateParams.MemberId)
    //    .then(function (response) {
    //        settings.LOBs = response.data;

    //        settings.LOBs[0].ImageName = "DENTAL PLAN";
    //        settings.LOBs[1].ImageName = "VISION PLAN";
    //        settings.LOBs[2].ImageName = "AD&D PLAN";
    //        $scope.plans = settings.LOBs;
    //    },

    //    function(response){
    //        alert('error: ' + response.statusText);
    //    });
});

