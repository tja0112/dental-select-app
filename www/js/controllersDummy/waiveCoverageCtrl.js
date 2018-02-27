angular.module('starter.controllers')
.controller('waiveCoverageCtrl', function ($scope,$state,$timeout,$ionicLoading,settings,$ionicPopup,$ionicHistory,$filter) {

	$scope.User = {};
	$scope.User.lastName = "";
	$scope.User.test = "";
	$scope.User.test2 = "";
	$scope.User.test3 = "";
	$scope.number = 0;

	$scope.plans = settings.LOBs;

	$scope.getChecks = function(index){

		$scope.plans[index].chck = $('#checkedplan_' + index).prop("checked");
		$scope.number = $filter('filter')($scope.plans, { chck: true }).length;
	}


	$scope.DoSubmit = function () {
	
	    if (settings.LastName == $scope.User.lastName) {
	        $ionicLoading.show({ template: 'Loading...' });
	        $scope.processing = true;
	        $timeout(function () {

	        	angular.forEach($scope.plans, function (item){

	        		if(item.chck){
	        			item.Waived = true;
	        		}

	        	}, $scope.plans);

	            $scope.processing = false;
	            $ionicLoading.hide();


	            $ionicHistory.clearCache();
	            $state.go("app.chooseAPlanWaived");
	            
	        }, 2000);
	    }
	    
	    else
	        $ionicPopup.alert({
	            title: 'Invalid Last Name',
	            template: 'Invalid Last Name'
	        });
		};
});