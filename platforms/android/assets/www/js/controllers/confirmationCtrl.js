angular.module('starter.controllers')
.controller('confirmationCtrl', function ($scope, $state, $timeout, $ionicLoading, $http, settings, $ionicHistory,$ionicPopup,$ionicSideMenuDelegate, services) {

    $scope.Confirmation = {};
    $scope.Confirmation.ID = "145847593";
    $scope.Confirmation.Email = "";
    $scope.Confirmation.Pass = "";
    $scope.errors = {};
    $scope.errors.view = [];
    $scope.processing = false;

    $scope.addIdCard = function (dependentID) {
        alert(dependentID);
    };

    $scope.Confirmation.Email = settings.ConfirmationMail;

    $scope.DoLogin = function () {

        services.setLogin($scope.Confirmation.Email, $scope.Confirmation.Pass)
        .then(function (data) {
            if (data.Success) {

                $http.get(settings.ServiceURL + '/IsCurrentMemberMail?personID=' + settings.currentUserPersonID + '&email=' + $scope.Confirmation.Email)
                        .success(function (data) {
                            if (data.Success) {

                                $http.get(settings.ServiceURL + '/IsMemberIDP?memberID=' + settings.MemberID)
                                    .success(function (data) {

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
                                    })
                            }
                            else {
                                $ionicLoading.hide();
                                $scope.errors = data.Errors;
                            }

                            $scope.processing = false;
                        })
            }
            else {
                $ionicLoading.hide();
                $scope.errors = data.Errors;
            }
            $scope.processing = false;
        }, function (error) {
            $scope.processing = false;
            alert('error');
        })
        //$http.post(settings.ServiceURL + '/Login', {
        //    Email: $scope.Confirmation.Email,
        //    Password: $scope.Confirmation.Pass
        //})
        //   .success(function (data) {

        //       if (data.Success) {

        //			$ionicLoading.show({ template: 'Loading...' });

        //           $http.get(settings.ServiceURL + '/IsCurrentMemberMail?personID=' + settings.currentUserPersonID + '&email=' + $scope.Confirmation.Email)
        //       			.success(function (data) {
        //       				if(data.Success){

        //       					$http.get(settings.ServiceURL + '/IsMemberIDP?memberID=' + settings.MemberID)
        //                            .success(function (data) {

        //                              				var confirmPopup = $ionicPopup.show({
        //						  template: '<p class="text-center fontBold" style="font-size:16px; margin-top: -10px;"> Weve sent you an email. Please check your mail and click the unique, secure link to change your registration	</p>',
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
        //                            })
        //           			}

        //           			else{

        //           				$ionicLoading.hide();
        //           				$scope.errors = data.Errors;
        //           			}

        //           			$scope.processing = false;
        //   				})
        //       }

        //       else {
        //           $ionicLoading.hide();
        //           $scope.errors = data.Errors;
        //       }
        //   })
        //   .error(function (data, status) {
        //       $scope.processing = false;
        //       alert('error');
        //   });;


    }
});