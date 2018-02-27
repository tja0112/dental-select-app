angular.module('starter.controllers')
.controller('groupEnrollmentCtrl', function ($scope, $state, $timeout, $ionicLoading, $http, settings) {

    $scope.Company = {};
    $scope.Company.Code = "";
    $scope.errors = {};
    $scope.errors.view = [];


    $scope.DoSubmit = function () {
        $state.go("app.groupEnrollmentSN", { GroupKey: $scope.Company.Code });
        // $ionicLoading.show({ template: 'Loading...' });
        // $scope.Processing = true;

        // $http.post(settings.ServiceURL + '/CheckGroupKey?codeGroup=' + $scope.Company.Code)
        //     .success(function (data) {
        //         $scope.processing = false;
        //         if (data.Success) {
        //             $state.go("app.groupEnrollmentSN", { GroupKey: $scope.Company.Code });
        //             $scope.Processing = false;
        //             $ionicLoading.hide();
        //             $scope.errors = [];
        //             if(data.Model != null)
        //             settings.PlanConfig.GroupId = data.Model;

        //         }
        //         else {
        //             $scope.errors = data.Errors;
        //             $ionicLoading.hide();
        //             $scope.Processing = false;
        //         }
        //     })
        //     .error(function (data, status) {
        //         $scope.processing = false;
        //         alert('error');
        //     });

        };


});


angular.module('starter.controllers')
.controller('groupEnrollmentSNCtrl', function ($scope, $state, $timeout, $ionicLoading, $http, settings, $stateParams) {
    $scope.Employee = {};
    $scope.Employee.FirstName = "";
    $scope.Employee.LastName = "";
    $scope.Employee.DateBirth = null;
    $scope.Employee.SSN = "";
    $scope.errors = {};
    $scope.errors.view = [];
   
    // $scope.errors.view.push('jkcjsd');

    $timeout(function(){

        $scope.$apply(function(){
            
            $('#ssn').mask("999999999", {placeholder:"_________"});    
        })
        

    }, 0)
    


    $scope.DoSubmit = function () {


        $state.go("app.groupEnrollmentInfo", {
            EmployeeFirstName: $scope.Employee.FirstName,
            EmployeeLastName: $scope.Employee.LastName,
            DateOfBirth: $scope.Employee.DateBirth,
            GroupName: "Test",
            GroupKey: 123456,
            SSN: $scope.Employee.SSN,
            MemberId: 00008
        });
//         $ionicLoading.show({ template: 'Loading...' });
//         $scope.Processing = true;

//     $http.post(settings.ServiceURL + '/GroupEnrollment?token=1234', {
//             SSN: $scope.Employee.SSN,
//             FirstName: $scope.Employee.FirstName,
//             LastName: $scope.Employee.LastName,
//             DateOfBirth: $scope.Employee.DateBirth,
//             GroupKey: $stateParams.GroupKey

//         })
// .success(function (data) {
//     $scope.processing = false;
//     if (data.Success) {

//         settings.MemberID = data.Model.MemberId;


//         $scope.EmployeeName = {
//             GroupName: data.Model.GroupName
//         };

//         settings.SSN = $scope.Employee.SSN;
//         settings.GroupKey = $stateParams.GroupKey;
//         settings.PlanConfig.MemberId = data.Model.MemberId;
        
       
//         $state.go("app.groupEnrollmentInfo", {
//             EmployeeFirstName: $scope.Employee.FirstName,
//             EmployeeLastName: $scope.Employee.LastName,
//             DateOfBirth: data.Model.DateOfBirth,
//             GroupName: data.Model.GroupName,
//             GroupKey: $stateParams.GroupKey,
//             SSN: $scope.Employee.SSN,
//             MemberId: data.Model.MemberId
//         });

        
//         $scope.Processing = false;
//         $ionicLoading.hide();
//         $scope.errors = [];

//     }
//     else {
//         $scope.errors = data.Errors;
//         $ionicLoading.hide();
//         $scope.Processing = false;
//     }

// })
// .error(function (data, status) {
//     $scope.processing = false;
//     alert('error');
// });;
    };


});