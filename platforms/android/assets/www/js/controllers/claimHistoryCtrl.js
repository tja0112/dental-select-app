angular.module('starter.controllers')
.controller('claimHistoryCtrl', function ($scope, $http, $state, settings, services) {

    $scope.isCaimDate = false;
    $scope.isDependentName = false;
    $scope.model = {};
    $scope.model.claimdate = [];
    $scope.model.dependentname = [];
    $scope.processing = true;

    $scope.load = function (orderby) {

        services.getClaimHistoryInfo(settings.MemberID, orderby)
        .then(function (data) {
            $scope.model.claimdate = [];
            for (var key in data) {
                var item = data[key];
                $scope.model.claimdate.push({
                    date: item.ClaimDate.toLocaleDateString(),
                    place: item.Name,
                    type: item.Type,
                    status: item.Status,
                    totalbilled: item.TotalBilled,
                    planpays: item.PlanPays,
                    payoutofpocket: item.PayOutOfPocket,
                    name: item.ProviderName,
					test: item.test
                });
            }
            $scope.processing = false;
        });

     
    };

    $scope.load();

    $scope.tapFunctionClaimDate = function (id) {

        if ($scope.isCaimDate) {
            $(id).slideUp();
        }
        else {
            $(id).slideDown();
            $scope.isDependentName = false;
        }
        $scope.isCaimDate = !$scope.isCaimDate;
    };

    $scope.tapFunctionDependentName = function (id) {

        if ($scope.isDependentName) {
            $(id).slideUp();
        }
        else {
            $(id).slideDown();
            $scope.isCaimDate = false;
        }
        $scope.isDependentName = !$scope.isDependentName;
    };

    $scope.viewdetails = function (index) {
        $scope.claimdetail = $scope.model.claimdate[index]
        $state.go("app.claimDetail", { Details: $scope.claimdetail });
    }

    $scope.viewdetailsdependents = function (index) {
        $scope.claimdetail = $scope.model.dependentname[index]
        $state.go("app.claimDetail", { Details: $scope.claimdetail });
    }

    $scope.tabSwitchClaim = function (new_tab, new_content) {
        
		if(new_tab === '#tab_2')
			$scope.load('date');
		else
			$scope.load('date');
		$('#content_1').css('display', 'none');
        $('#content_2').css('display', 'none');
        $(new_content).css('display', 'block');

        $('#tab_1').removeClass('active');
        $('#tab_2').removeClass('active');
        $(new_tab).addClass('active');
    };
});


angular.module('starter.controllers')
.controller('claimDetail', function ($scope, $http, $state, $stateParams) {

    $scope.claimdetails = $stateParams.Details;

});