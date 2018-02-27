angular.module('starter.controllers')
.controller('setUpAccountCtrl', function ($scope, $state, $timeout, $ionicLoading, $http, settings, $stateParams) {

    $scope.SetUpAccount = {};
    $scope.SetUpAccount.Email = "";
    $scope.SetUpAccount.Pass = "";
    $scope.SetUpAccount.RePass = "";
    $scope.errors = {};
    $scope.errors.view = [];
    $scope.url = '';

    if ($stateParams.nextView == null)
        $stateParams.nextView = 'app.idpMemberPortal';

    $scope.PlansValidate = function () {
        $http.get(settings.ServiceURL + '/IsConfigurated?GroupKey=' + settings.GroupKey + '&MemberId=' + $stateParams.MemberId)
        .then(function (response) {
            if (response.data) {
                $state.go('app.memberportal');
            }
            else {
                $state.go($stateParams.nextView, { MemberId: $stateParams.MemberId });
            }
        },
               function (response) {
                   alert('error: ' + response.statusText);
               });
    };

    $scope.DoContinue = function () {


         $state.go('app.idpMemberPortal');

        // if (settings.MemberID != null) {
        //     $http.post(settings.ServiceURL + '/CreateAccountEmail?memberID=' + settings.MemberID + "&email=" + $scope.SetUpAccount.Email)
        //         .success(function (data) {
        //             if (data.Success) {

        //                 settings.currentUserPersonID = data.Model;
        //                 settings.ConfirmationMail = $scope.SetUpAccount.Email;
        //                 if (settings.GroupKey != null) 
        //                     $scope.PlansValidate();
                        
        //                 else {
                        
        //                     if (settings.IsIDP)
        //                         $state.go('app.idpMemberPortal');
        //                     else
        //                         $state.go('app.memberportal');
        //                 }
                        
        //                 $scope.errors = [];
        //             }

        //             else
        //                 $scope.errors = data.Errors;
        //         })

        //         .error(function (data, status) {
        //             $scope.processing = false;
        //             alert('error');
        //         });
        // }
    };
});