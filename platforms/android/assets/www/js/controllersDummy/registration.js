angular.module('starter.controllers')
.controller('registrationCtrl', function ($scope, $state, $timeout, $ionicLoading, $http, $ionicPopup, settings, $ionicHistory) {


	$scope.RegistrationMember = {};
	$scope.RegistrationMember.DateBirth = null;
    $scope.RegistrationMember.SSN = "";
    $scope.RegistrationMember.MemberKey = "";

     $scope.errors = {};
	 $scope.errors.view = [];

    $scope.DoRegister= function()
	{	
		$state.go('app.memberInfoParam', {
                            MemberId: $scope.RegistrationMember.MemberKey,
                            DateOfBirth: $scope.RegistrationMember.DateBirth,
                            FirstName: "John",
                            LastName: "Doe"
                        });
		// $scope.Processing =true;

  //       $http.post(settings.ServiceURL + '/ValidateMemberRegistration', {
  //                   MemberKey: $scope.RegistrationMember.MemberKey,
  //                   DateOfBirth: $scope.RegistrationMember.DateBirth,
  //                   SSN: $scope.RegistrationMember.SSN,
  //           })
    	    
  //               .success(function (data) {
  //                   if (data.Success) {

  //                       $ionicLoading.show({ template: 'Loading...' });
                        
  //                       $scope.Processing = false;

  //                       settings.MemberID = data.Model.MemberId;
  //                       settings.IsIDP = data.Model.IsIDP;
  //                       $ionicHistory.clearCache();


  //                       $state.go('app.memberInfoParam', {
  //                           MemberId: data.Model.MemberId,
  //                           DateOfBirth: data.Model.DateOfBirth,
  //                           FirstName: data.Model.Person.FirstName,
  //                           LastName: data.Model.Person.LastName
  //                       });
  //                       //$scope.processing = false;
  //                       $scope.errors = [];
  //                       $ionicLoading.hide();
  //                   }

  //                   else {

  //                       $scope.Processing = false;
  //                       $ionicLoading.hide();
  //                       $scope.errors = data.Errors;
  //                   }
  //               })

  //               .error(function (data, status) {
  //                   alert('error ' + status);
  //               });
	};

});