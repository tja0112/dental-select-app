angular.module('starter.controllers')
.controller('confirmationCtrl', function ($scope, $state, $timeout,$ionicLoading, $http, settings, $ionicHistory) {
	
	$scope.Confirmation = {};
	$scope.Confirmation.ID="145847593"; 
	$scope.Confirmation.Email="";
	$scope.Confirmation.Pass="";
	$scope.errors = {};
	$scope.errors.view = [];
	
	$scope.addIdCard = function ( dependentID){

		alert(dependentID);
	};

	$scope.Confirmation.Email = settings.ConfirmationMail;
       

	$scope.DoLogin = function(){
		
		$scope.Processing = true;
	
		$http.post(settings.ServiceURL + '/Login', {
		    Email: $scope.Confirmation.Email,
		    Password: $scope.Confirmation.Pass
		})
           .success(function (data) {
               
               if (data.Success) {

					$ionicLoading.show({ template: 'Loading...' });

                   $http.get(settings.ServiceURL + '/IsCurrentMemberMail?personID=' + settings.currentUserPersonID + '&email=' + $scope.Confirmation.Email)
               			.success(function (data) {
               				if(data.Success){

               					$http.get(settings.ServiceURL + '/IsMemberIDP?memberID=' + settings.MemberID)
                                    .success(function (data) {

                                        if(data == true){

                                            $ionicHistory.clearCache();
                                            $state.go('app.idpMemberPortal');
                                            $ionicLoading.hide();
                                        }

                                        else{

                                            $ionicHistory.clearCache();
                                            $state.go('app.memberportal');
                                            $ionicLoading.hide();
                                        }
                                    })
		           			}

		           			else{

		           				$ionicLoading.hide();
                   				$scope.errors = data.Errors;
		           			}

		           			$scope.Processing = false;
           				})
               }

               else {
                   $ionicLoading.hide();
                   $scope.errors = data.Errors;
               }
           })
           .error(function (data, status) {
               $scope.Processing = false;
               alert('error');
           });;

	
	}	
});