angular.module('starter.controllers')
.controller('chooseAPlanCtrl', function ($scope, $window, $rootScope, settings, $state, $ionicHistory) {

	settings.LOBs[0].Order = 0;
	settings.LOBs[1].Order = 1;
	settings.LOBs[2].Order = 2;

	$scope.plans = settings.LOBs;

	$scope.reload = function(index){
		
		var item = $scope.plans[index];

		if(item.Enabled){	
			if(item.Waived){
				$("[data-img='chcktop_" + index + "']").addClass("pruebba");
				$("[data-chc='chcktop_" + index + "']").css({ display: 'none'});
				$("[data-wvd='chcktop_" + index + "']").show();

				$("a[name=dis_" + index + "]").attr('href', '').css({'cursor': 'context-menu', 'pointer-events' : 'none'});
			}

			else if(item.Checked){
				$("[data-img='chcktop_" + index + "']").addClass("pruebba");
				$("[data-wvd='chcktop_" + index + "']").css({ display: 'none'});
				$("[data-chc='chcktop_" + index + "']").show();

				$("a[name=dis_" + index + "]").attr('href', '').css({'cursor': 'context-menu', 'pointer-events' : 'none'});
			}
		}

		else{
			$("[data-img='chcktop_" + index + "']").addClass("pruebba");
			$("[data-chc='chcktop_" + index + "']").css({ display: 'none'});
			$("[data-wvd='chcktop_" + index + "']").css({ display: 'none'});

			$("a[name=dis_" + index + "]").attr('href', '').css({'cursor': 'context-menu', 'pointer-events' : 'none'});
		}
	};

	$scope.reloadfinalreview = function(){

		$scope.hidden = false;

		for (var i = 0; i < $scope.plans.length; i++) {
			
			if($scope.plans[i].Waived || $scope.plans[i].Checked ||  $scope.plans[i].Enabled == false){
				$scope.hidden = true;
			}

			else{
				$scope.hidden = false;
				break;
			}
		};
	};
	

	$scope.checkedplan = function(index){

		angular.forEach(settings.LOBs, function (value){
			value.IsSelected = false;
		}, settings.LOBs);

		settings.LOBs[index].IsSelected = true;
		settings.PlanType = settings.LOBs[index].Name
		settings.PlanConfig.PlanType = settings.LOBs[index].Name;
		
	};

	$scope.finalreviewClick = function(){
		$state.go('app.finalReview');
	};
});






