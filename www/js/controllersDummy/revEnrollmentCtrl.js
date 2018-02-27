angular.module('starter.controllers')
.controller('revEnrollmentCtrl', function ($scope, $timeout, $http, settings, $stateParams, $state, $ionicHistory) {
    $scope.isexpanded = false;


    if (settings.PlanConfig.Dependents.length > 0)
        $('#w').css('cursor', 'pointer');

    else
        $('#w').css('cursor', 'initial');
    

    $scope.reloadLOBs = function () {
        $scope.Employee = {};
        $scope.Employee.Name = settings.PlanConfig.EmployeeFirstName + ' ' + settings.PlanConfig.EmployeeLastName;
        $scope.Employee.Plan = settings.PlanConfig.Plan.PlanName;
        $scope.Employee.ID = 1;
        $scope.Employee.Membership = settings.PlanConfig.Plan.Network;
        $scope.Employee.Coverage = $stateParams.CoverageCode.Name;
        $scope.Employee.Rate = $stateParams.CoverageCode.Rate.Cost;



       
       
        $scope.dependents = settings.PlanConfig.Dependents;

        console.log($scope.dependents.length);

        //if ($scope.dependents.length > 0)
        //    $('#bardependents').css('cursor', 'pointer');

        //else
        //    $('#bardependents').css('cursor', 'initial important!');

       
    }
    
    $scope.expandeRevEnrollment = function (id) {

        if ($scope.dependents.length > 0)
        {
            if ($scope.isexpanded) {
                $(id).slideUp();
            }

            else 
                $(id).slideDown();

            $scope.isexpanded = !$scope.isexpanded;
       }
    };

    
    $scope.doConfirm = function () {

        if(!settings.PlanConfig.IsEditing){
            settings.Plans.push(
                angular.copy(settings.PlanConfig)
            );
        }

        else{
            
            angular.forEach(settings.PlanConfig, function (item){
            }, settings.Plans[settings.PlanConfig.IndexTemporary] );

            // settings.Plans[settings.PlanConfig.IndexTemporary] = settings.PlanConfig; 
            // alert(settings.Plans[settings.PlanConfig.IndexTemporary].Plan.PlanName);
        }

        if (settings.LOBs[0].IsSelected) {
            settings.LOBs[0].Checked = true;
        }

        if (settings.LOBs[1].IsSelected) {
            settings.LOBs[1].Checked = true;
        }

        if (settings.LOBs[2].IsSelected) {
            settings.LOBs[2].Checked = true;
        }

        // settings.PlanConfig.Plan = {};
        // settings.PlanConfig.Dependants = [];

        $('#personasRev').slideUp();
        $scope.isexpanded = false;
        $ionicHistory.clearCache();
        $state.go('app.chooseAPlanWaived')
    };


});