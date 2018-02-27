angular.module('starter.controllers')
.controller('loginCtrl', function ($scope, $state, $timeout, $ionicLoading, $ionicHistory, $http, settings, $ionicPlatform, $ionicPopup, services) {

    $scope.Login = {};
    $scope.Login.User = "tima@dentalselect.com";
    $scope.Login.Pass = "Password1";
    $scope.model = {};
    $scope.model.Credit = "";
    $scope.errors = {};
    $scope.errors.view = [];
   
    $scope.doLogin = function () {
        $state.go('app.idpMemberPortal');

        //$scope.processing = true;

        //services.setLogin($scope.Login.User, $scope.Login.Pass)
                    //.then(function (data) {
                      //  $scope.processing = false;
                        //if (data.Success) {
                          //  //$ionicLoading.show({ template: 'Loading...' });
                            //settings.currentUserPersonID = data.Model.Person.Id;
                        //    settings.MemberID = data.Model.MemberId;
                          //  services.getIDPMember(settings.MemberID)
                            //         .then(function (data) {
                              //           if (data == true) {
      //
        //                                     $ionicHistory.clearCache();
          //                                   settings.PaymentMethodList = [];
            //                                 settings.isCleanningPaymentInfoList = true;
              //                               $state.go('app.idpMemberPortal');
                                             //$ionicLoading.hide();
                //                         } else {
                  //                           $ionicHistory.clearCache();
                    //                         $state.go('app.memberportal');
                                             //$ionicLoading.hide();
                     //                    }
                       //                  $scope.errors = [];
                        //             }, function (error) {
                      //                   alert("error: " + angular.toJson(error));
                        //             });
                   //     }
                 //       else {
                            //$ionicLoading.hide();
                   //         $scope.errors = data.Errors;
                 //       }
                //    }, function (error) {
                //        $scope.processing = false;
                 //       alert('error');
                 //   });



        //$http.post(settings.ServiceURL + '/Login', {
        //    Email: $scope.Login.User,
        //    Password: $scope.Login.Pass
        //})
        //    .success(function (data) {
        //        $scope.processing = false;
        //        if (data.Success) {

        //            $ionicLoading.show({ template: 'Loading...' });

        //            settings.currentUserPersonID = data.Model.Person.Id;
        //            settings.MemberID = data.Model.MemberId;

        //            $http.get(settings.ServiceURL + '/IsMemberIDP?memberID=' + settings.MemberID)
        //                .success(function (data) {
        //                    if (data == true) {

        //                        $ionicHistory.clearCache();
        //                        settings.PaymentMethodList = [];
        //                        settings.isCleanningPaymentInfoList = true;
        //                        $state.go('app.idpMemberPortal');
        //                        $ionicLoading.hide();
        //                    }

        //                    else {
        //                        $ionicHistory.clearCache();
        //                        $state.go('app.memberportal');
        //                        $ionicLoading.hide();
        //                    }

        //                    $scope.errors = [];
        //                })
        //        }

        //        else {
        //            $ionicLoading.hide();
        //            $scope.errors = data.Errors;
        //        }
        //    })

        //    .error(function (data, status) {
        //        $scope.processing = false;
        //        alert('error');
        //    });
    };
});
