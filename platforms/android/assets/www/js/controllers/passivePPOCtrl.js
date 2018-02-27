angular.module('starter.controllers')
.controller('passivePPOCtrl', function ($scope, $state, $stateParams, $timeout, $ionicLoading, settings, $rootScope, $ionicHistory, $ionicPopup) {

    $scope.User = {};
    $scope.User.lastName = "";
    $scope.processing = false;
    $scope.errors = {};
    $scope.errors.view = [];
    $scope.errors.view.push('e1c nsdn ckjnskcnsjkcnkdjsn');

    // $scope.reloadLOBs = function(){
		
    // }


    $scope.DoSubmit = function () {
        if (settings.LastName == $scope.User.lastName) {
            //$ionicLoading.show({ template: 'Loading...' });
            $scope.processing = true;
            $timeout(function () {
                if (!settings.PlanConfig.IsEditing) {

                    if (settings.LOBs[0].IsSelected)
                        settings.LOBs[0].Waived = true;

                    if (settings.LOBs[1].IsSelected)
                        settings.LOBs[1].Waived = true;

                    if (settings.LOBs[2].IsSelected)
                        settings.LOBs[2].Waived = true;
                }

                else {

                    if (settings.PlanConfig.From == "DENTAL") {
                        settings.LOBs[0].Waived = true;
                        settings.LOBs[0].Checked = false;
                    }

                    else if (settings.PlanConfig.From == "VISION") {
                        settings.LOBs[1].Waived = true;
                        settings.LOBs[1].Checked = false;
                    }

                    else if (settings.PlanConfig.From == "AD & D") {
                        settings.LOBs[2].Checked = false;
                        settings.LOBs[2].Waived = true;
                    }

                    var index = settings.PlanConfig.IndexTemporary;
                    settings.Plans.splice(index, 1);
                }


                $scope.processing = false;
                $ionicLoading.hide();
                $ionicHistory.clearCache();
                $state.go("app.chooseAPlanWaived");

            }, 2000);
        }
        else {
            $ionicPopup.alert({
                title: 'Invalid Last Name',
                template: 'Invalid Last Name'
            });
        }
        };
});