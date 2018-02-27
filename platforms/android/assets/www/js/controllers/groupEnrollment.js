angular.module('starter.controllers')
.controller('groupEnrollmentCtrl', function ($scope, $state, $timeout, $ionicLoading, $http, settings, services) {

    $scope.Company = {};
    $scope.Company.Code = "";
    $scope.errors = {};
    $scope.errors.view = [];
    $scope.processing = false;

    $scope.DoSubmit = function () {
        //$ionicLoading.show({ template: 'Loading...' });
        //$scope.processing = true;

        services.getCheckGroupKey($scope.Company.Code)
                    .then(function (data) {
                        $scope.processing = true;
                        if (data.Success) {
                            $state.go("app.groupEnrollmentSN", { GroupKey: $scope.Company.Code });
                            //$scope.processing = false;
                            //$ionicLoading.hide();
                            $scope.errors = [];
                            if (data.Model != null)
                                settings.PlanConfig.GroupId = data.Model;

                        }
                        else {
                            $scope.errors = data.Errors;
                            //$ionicLoading.hide();
                            //$scope.processing = false;
                        }
                        $scope.processing = false;
                    }, function (error) {
                        $scope.processing = false;
                        alert('error');
                    });

        //$http.post(settings.ServiceURL + '/CheckGroupKey?codeGroup=' + $scope.Company.Code)
        //    .success(function (data) {
        //        $scope.processing = false;
        //        if (data.Success) {
        //            $state.go("app.groupEnrollmentSN", { GroupKey: $scope.Company.Code });
        //            $scope.processing = false;
        //            $ionicLoading.hide();
        //            $scope.errors = [];
        //            if(data.Model != null)
        //            settings.PlanConfig.GroupId = data.Model;

        //        }
        //        else {
        //            $scope.errors = data.Errors;
        //            $ionicLoading.hide();
        //            $scope.processing = false;
        //        }
        //    })
        //    .error(function (data, status) {
        //        $scope.processing = false;
        //        alert('error');
        //    });

    };
});


angular.module('starter.controllers')
.controller('groupEnrollmentSNCtrl', function ($scope, $state, $timeout, $ionicLoading, $http, settings, $stateParams, services) {
    $scope.Employee = {};
    $scope.errors = {};
    $scope.errors.view = [];
    $scope.processing = false;

    // $scope.errors.view.push('jkcjsd');

    //TODO: no esta funcionanod la mascara. Regresa el campo vacio

    // $timeout(function () {
        // $scope.$apply(function () {
            // $('#ssn').mask("999999999", { placeholder: "_________" });
        // })
    // }, 0)

    $scope.DoSubmit = function () {
        //$ionicLoading.show({ template: 'Loading...' });
        $scope.processing = true;

        services.getGroupEnrollment($scope.Employee.SSN, $scope.Employee.FirstName, $scope.Employee.LastName, $scope.Employee.DateBirth,
            $stateParams.GroupKey)
            .then(function (data) {
                if (data.Success) {
                    settings.MemberID = data.Model.MemberId;

                    $scope.EmployeeName = {
                        GroupName: data.Model.GroupName
                    };

                    settings.SSN = $scope.Employee.SSN;
                    settings.GroupKey = $stateParams.GroupKey;
                    settings.PlanConfig.MemberId = data.Model.MemberId;

                    $state.go("app.groupEnrollmentInfo", {
                        EmployeeFirstName: $scope.Employee.FirstName,
                        EmployeeLastName: $scope.Employee.LastName,
                        DateOfBirth: data.Model.DateOfBirth,
                        GroupName: data.Model.GroupName,
                        GroupKey: $stateParams.GroupKey,
                        SSN: $scope.Employee.SSN,
                        MemberId: data.Model.MemberId
                    });

                    //$scope.processing = false;
                    //$ionicLoading.hide();
                    $scope.errors = [];
                }
                else {
                    $scope.errors = data.Errors;
                    //$ionicLoading.hide();
                    //$scope.processing = false;
                }
                $scope.processing = false;
            }, function (error) {
                $scope.processing = false;
                alert('error');

            });

        //    $http.post(settings.ServiceURL + '/GroupEnrollment?token=1234', {
        //        SSN: $scope.Employee.SSN,
        //        FirstName: $scope.Employee.FirstName,
        //        LastName: $scope.Employee.LastName,
        //        DateOfBirth: $scope.Employee.DateBirth,
        //        GroupKey: $stateParams.GroupKey
        //    })
        //.success(function (data) {
        //    $scope.processing = false;
        //    if (data.Success) {
        //        settings.MemberID = data.Model.MemberId;
        //        $scope.EmployeeName = {
        //            GroupName: data.Model.GroupName
        //        };
        //        settings.SSN = $scope.Employee.SSN;
        //        settings.GroupKey = $stateParams.GroupKey;
        //        settings.PlanConfig.MemberId = data.Model.MemberId;
        //        $state.go("app.groupEnrollmentInfo", {
        //            EmployeeFirstName: $scope.Employee.FirstName,
        //            EmployeeLastName: $scope.Employee.LastName,
        //            DateOfBirth: data.Model.DateOfBirth,
        //            GroupName: data.Model.GroupName,
        //            GroupKey: $stateParams.GroupKey,
        //            SSN: $scope.Employee.SSN,
        //            MemberId: data.Model.MemberId
        //        });
        //        $scope.processing = false;
        //        $ionicLoading.hide();
        //        $scope.errors = [];
        //    }
        //    else {
        //        $scope.errors = data.Errors;
        //        $ionicLoading.hide();
        //        $scope.processing = false;
        //    }
        //})
        //.error(function (data, status) {
        //    $scope.processing = false;
        //    alert('error');
        //});;
    };
});