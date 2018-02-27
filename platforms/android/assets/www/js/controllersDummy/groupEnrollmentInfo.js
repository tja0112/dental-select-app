angular.module('starter.controllers')
.controller('groupEnrollmentInfoCtrl', function ($http, $scope, $stateParams, $state, settings) {

    $scope.Employee = {};
    $scope.Employee.Name = $stateParams.EmployeeFirstName + " " + $stateParams.EmployeeLastName;
    
    console.log($stateParams.DateOfBirth instanceof Date);
    $scope.Employee.DateofBirth = $stateParams.DateOfBirth.toLocaleDateString();
    
    $scope.Employee.Employer = $stateParams.GroupName;
    settings.LastName = $stateParams.EmployeeLastName;
    settings.PlanConfig.EmployeeFirstName = $stateParams.EmployeeFirstName;
    settings.PlanConfig.EmployeeLastName = $stateParams.EmployeeLastName;

    $scope.doConfirm = function () {
               $state.go('app.setUp', { nextView: 'app.groupEnrollmentMain', MemberId: $stateParams.MemberId });
               settings.LastName = $stateParams.EmployeeLastName;
    };

});


  



    