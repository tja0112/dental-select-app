angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, settings, $ionicPlatform, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  //$ionicModal.fromTemplateUrl('www/login.html', {
  //  scope: $scope
  //}).then(function(modal) {
  //  $scope.modal = modal;
  //});

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

     var self = this;

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 

        
        $scope.valuebutton=true;
        
         if (toState.name == "app.planSummary" ||toState.name=="app.claimHistory"
          ||toState.name=="app.idcards" ||toState.name=="app.findaprovider" ||toState.name=="app.findaprovider"
           ||toState.name=="app.findProviderList"|| toState.name=="app.idpMemberPortal"||toState.name=="app.claimDetail"||toState.name=="app.paymentInfo"
           ||toState.name=="app.paymentInfoform1"||toState.name=="app.paymentInfoform2"||toState.name=="app.paymentInfoData"
           ||toState.name=="app.settings"||toState.name=="app.editPersonalInfo"||toState.name=="app.personalInfo" || toState.name=="app.memberportal" )
         {
            $scope.valuebutton=false;
         }
         else         
             $scope.valuebutton = true;

    
         console.log(toState.name);
         $ionicPlatform.registerBackButtonAction(function (event) {

             if (toState.name == 'app.memberportal' ||
                 toState.name == 'app.idpMemberPortal' ||
                 toState.name == 'app.groupEnrollmentMain' ||
                 toState.name == 'app.chooseAPlanWaived' ||
                 toState.name == 'app.planSummary' ||
                 toState.name == 'app.claimHistory' ||
                 toState.name == 'app.idcards' ||
                 toState.name == 'app.findaprovider' ||
                 toState.name == 'app.paymentInfoData' ||
                 toState.name == 'app.settings' ||
                 toState.name == 'app.personalInfo'
              ) {
                 event.preventDefault();
             } else if(toState.name == 'app.login') {
                  var confirmExit = $ionicPopup.show({
                  template: '<p class="text-center fontBold" style="font-size:16px; margin-top: -10px;"> Are you sure you want to quit?</p>',
                  title: '<p class="fontBlack">QUIT</p>',
                  buttons: [
                    {
                        text: 'OK',
                        type: 'blueController',
                        onTap: function (e) {
                            return true;
                        }
                    },
                    {
                        text: "Cancel",
                        type: "button-default",
                        onTap: function (e) {
                            return false;
                        }
                    },
                  ]
                });

                confirmExit.then(function (res) {
                    if (res){ 
                        navigator.app.exitApp();
                    }
                });
                   
             } else{
                navigator.app.backHistory();
             }

         }, 100);

    });


})

.controller("MenuController", function ($scope, $ionicSideMenuDelegate, $ionicHistory, $state, $http, settings, $ionicPopup) {
  
  $scope.showPayment = true;


  $scope.toggleMenu = function() {
    if($ionicSideMenuDelegate.isOpenRight()) {
      $ionicSideMenuDelegate.toggleRight(false);
    }
  
    else {

      if(settings.MemberID != null)
      { 
        $http.get(settings.ServiceURL + '/IsMemberIDP?memberID=' + settings.MemberID)
          .success(function (data) {

              if(data == true)
                  $scope.showPayment = true;

              else{
                  $scope.showPayment = false;
              }
          })
      }

      $ionicSideMenuDelegate.toggleRight(true);         

    }

    $scope.$ionicSideMenuDelegate = $ionicSideMenuDelegate;

     $scope.personalInfoClick = function() {

        $state.go('app.personalInfo');
    }
  }

  $scope.logOutClick = function () {

      var confirmPopup = $ionicPopup.show({
          template: '<p class="text-center fontBold" style="font-size:16px; margin-top: -10px;"> Are you sure you want to log out?</p>',
          title: '<p class="fontBlack">LOG OUT</p>',
          buttons: [
            {
                text: 'OK',
                type: 'blueController',
                onTap: function (e) {
                    return true;
                }
            },
            {
                text: "Cancel",
                type: "button-default",
                onTap: function (e) {
                    return false;
                }
            },
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

})


/*.controller('StyleCtrl', function($scope, $stateParams) {
	$scope.$on("$ionicView.beforeEnter", function (){
		$("link[href='" + $stateParams.css + "']").prop("disabled", false);
	});
	$scope.$on("$ionicView.beforeLeave", function (){
		$("link[href='" + $stateParams.css + "']").prop("disabled", true);
	});
});*/



