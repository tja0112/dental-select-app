angular.module('starter.controllers')
.controller('setUpAccountCtrl', function ($scope, $state, $timeout, $ionicLoading, $http, settings, $stateParams, $ionicPopup, $ionicHistory, $ionicSideMenuDelegate, services) {

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

        services.getIsMemberConfigurated(settings.GroupKey, $stateParams.MemberId)
                    .then(function (response) {
                        if (response) {
                            var confirmPopup = $ionicPopup.show({
                                template: '<p class="text-center fontBold" style="font-size:16px; margin-top: -10px;"> Weve sent you an email. Please check your mail andclick the unique, secure link to change your registration</p>',
                                title: '<p class="fontBlack">CONFIRM EMAIL</p>',
                                buttons: [
                                  {
                                      text: 'OK',
                                      type: 'blueController',
                                      onTap: function (e) {
                                          return true;
                                      }
                                  }
                                ]
                            });

                            confirmPopup.then(function (res) {
                                if (res) {

                                    $ionicHistory.clearCache();
                                    $ionicSideMenuDelegate.toggleRight(false);
                                    $state.go('app.login');
                                }
                            });
                        }
                        else {
                            $state.go($stateParams.nextView, { MemberId: $stateParams.MemberId });
                        }

                    }, function (error) {

                        alert('error: ' + response.statusText);
                    });


        //$http.get(settings.ServiceURL + '/IsConfigurated?GroupKey=' + settings.GroupKey + '&MemberId=' + $stateParams.MemberId)
        //.then(function (response) {
        //            if (response.data) {
        //	                 var confirmPopup = $ionicPopup.show({
        //						  template: '<p class="text-center fontBold" style="font-size:16px; margin-top: -10px;"> Weve sent you an email. Please check your mail andclick the unique, secure link to change your registration</p>',
        //						  title: '<p class="fontBlack">CONFIRM EMAIL</p>',
        //						  buttons: [
        //							{
        //								text: 'OK',
        //								type: 'blueController',
        //								onTap: function (e) {
        //									return true;
        //								}
        //							}
        //						  ]
        //					  });
        //					  confirmPopup.then(function (res) {
        //						  if (res) {
        //							$ionicHistory.clearCache();
        //							$ionicSideMenuDelegate.toggleRight(false);
        //							$state.go('app.login');
        //						  }
        //					  });
        //    }
        //    else {
        //        $state.go($stateParams.nextView, { MemberId: $stateParams.MemberId });
        //    }
        //},
        //       function (response) {
        //           alert('error: ' + response.statusText);
        //       });
    };

    $scope.DoContinue = function () {
        $scope.processing = true;
        if (settings.MemberID != null) {

            services.setCreateAccountEmail(settings.MemberID, $scope.SetUpAccount.Email)
                        .then(function (data) {

                            if (data.Success) {
                                if (data.Model) {
                                    settings.currentUserPersonID = data.Model;
                                    settings.ConfirmationMail = $scope.SetUpAccount.Email;
                                    if (settings.GroupKey != null)
                                        $scope.PlansValidate();

                                    else {

                                        var confirmPopup = $ionicPopup.show({
                                            template: '<p class="text-center fontBold" style="font-size:16px; margin-top: -10px;"> Weve sent you an email. Please check your mail and click the unique, secure link to change your registration	</p>',
                                            title: '<p class="fontBlack">CONFIRM EMAIL</p>',
                                            buttons: [
                                              {
                                                  text: 'OK',
                                                  type: 'blueController',
                                                  onTap: function (e) {
                                                      return true;
                                                  }
                                              }
                                            ]
                                        });

                                        confirmPopup.then(function (res) {
                                            if (res) {

                                                $ionicHistory.clearCache();
                                                $ionicSideMenuDelegate.toggleRight(false);
                                                $state.go('app.login');
                                            }
                                        });
                                    }

                                    $scope.errors = [];
                                }
                            }
                            else
                                $scope.errors = data.Errors;

                            $scope.processing = false;

                        }, function (error) {
                            $scope.processing = false;
                            alert('error');
                        })
            //$http.post(settings.ServiceURL + '/CreateAccountEmail?memberID=' + settings.MemberID + "&email=" + $scope.SetUpAccount.Email)
            //    .success(function (data) {

            //        if (data.Success) {
            //            if (data.Model) {
            //                settings.currentUserPersonID = data.Model;
            //                settings.ConfirmationMail = $scope.SetUpAccount.Email;
            //                if (settings.GroupKey != null)
            //                    $scope.PlansValidate();

            //                else {

            //                    var confirmPopup = $ionicPopup.show({
            //                        template: '<p class="text-center fontBold" style="font-size:16px; margin-top: -10px;"> Weve sent you an email. Please check your mail and click the unique, secure link to change your registration	</p>',
            //                        title: '<p class="fontBlack">CONFIRM EMAIL</p>',
            //                        buttons: [
            //                          {
            //                              text: 'OK',
            //                              type: 'blueController',
            //                              onTap: function (e) {
            //                                  return true;
            //                              }
            //                          }
            //                        ]
            //                    });

            //                    confirmPopup.then(function (res) {
            //                        if (res) {

            //                            $ionicHistory.clearCache();
            //                            $ionicSideMenuDelegate.toggleRight(false);
            //                            $state.go('app.login');
            //                        }
            //                    });
            //                }

            //                $scope.errors = [];
            //            }
            //        }

            //        else
            //            $scope.errors = data.Errors;
            //    })

            //    .error(function (data, status) {
            //        $scope.processing = false;
            //        alert('error');
            //    });
        }
    };
});