angular.module('starter.controllers')
.controller('finalReviewCtrl', function ($scope, $timeout, $http, $state, settings) {
    $scope.plans = [];
    $scope.plans = settings.Plans;
   
	// $scope.loadplans = function (){
	// 	$scope.plans = [];
    //	$scope.plans = settings.Plans;
	// }
    $scope.amountpermonth = 0;

    for (i = 0; i < settings.Plans.length; i++)
        $scope.amountpermonth = $scope.amountpermonth + $scope.plans[i].CoverageCode.Rate.Cost;

    $scope.expand = function (index) {
		var item = $scope.plans[index];

		if(item.isexpanded){
		    $('#disp_' + index).slideUp();
		}


		else{
			$('#disp_' + index).slideDown();	
	    }

	    item.isexpanded = !item.isexpanded;
	};

    $scope.clickEditPlan = function(index){
      	settings.PlanConfig = settings.Plans[index];
    	settings.PlanConfig.IsEditing = true;
    	settings.PlanConfig.IndexTemporary = index;
    
        settings.PlanConfig.PlanType = settings.Plans[index].PlanType;
       
        angular.forEach($scope.plans, function (item, index){
            item.isexpanded = false;
        }, $scope.plans);
    };

    $scope.DoSubmit = function () {
        $http.post(settings.ServiceURL + '/AddPlansToMembers', $scope.plans)
     .success(function (data) {
         
     })
     .error(function (data, status) {
         // $scope.processing = false;
         alert('error');
     });


        $state.go('app.confirmation');
    };
    
});
    
    