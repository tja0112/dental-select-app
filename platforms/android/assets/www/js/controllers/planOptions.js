angular.module('starter.controllers')
.controller('planOptionsCtrl', function ($scope, $http, settings, $ionicLoading, $timeout, $state, $ionicHistory, $stateParams) {
    $scope.PlanName = settings.PlanConfig.Plan.PlanName;
    $scope.Network = settings.PlanConfig.Plan.Network;
    $scope.select = "";
    $scope.processing = false;
    $scope.model = {};
    $scope.model.CoverageCodeEdit = {};
    $scope.model.CoverageCodes = [];

    $scope.model.CoverageCodes = $stateParams.Rates;
    if (settings.PlanConfig.IsEditing) {
        $scope.model.CoverageCode = {
            CoverageCodeId: settings.PlanConfig.CoverageCode.CoverageCodeId,
            Name: settings.PlanConfig.CoverageCode.Name,
            Rate: settings.PlanConfig.CoverageCode.Rate
        }

    }

    $scope.DoSelect = function () {
        //$ionicLoading.show({ template: 'Loading...' });
        $scope.processing = true;
        var rate = {};
        for (i = 0; i < $stateParams.Rates.length; i++)
            if ($stateParams.Rates[i].CoverageCodeId == $scope.model.CoverageCode.CoverageCodeId) {
                rate = $stateParams.Rates[i]
                $scope.model.CoverageCode.Rate = rate;
            }

        $timeout(function () {
            settings.PlanConfig.CoverageCode = $scope.model.CoverageCode;
            $state.go("app.revEnrollment", { CoverageCode: $scope.model.CoverageCode });
            $scope.processing = false;
            $ionicLoading.hide();
            $ionicHistory.clearCache();
        }, 2000);        
    };

});