angular.module('starter.controllers')
   
.controller('idCardsCtrl', function ($scope, $http, settings, services) {

    $scope.newDep = {};
    $scope.model = {};
    $scope.model.dependents = [];
    $scope.processing = true;
    $scope.buttonAlias = "";

    $scope.load = function () {
        services.getIDCards(settings.MemberID)
        .then(function (data) {
            $scope.model.dependents = [];
            for (var key in data) {
                var item = data[key];

                console.log(item.EffectiveDate instanceof Date);

                $scope.model.dependents.push({
                    DateEffective: item.EffectiveDate !== null ? item.EffectiveDate.toLocaleDateString() : null,
                    GroupID: item.GroupId,
                    Plan: item.Plan,
                    NetWork: item.Networks,
                    FirstName: item.FirstName,
                    LastName: item.LastName,
                    ID: item.MemberId,
                    LOBType: item.LOBType
                });
            }

            var currentPlatform = ionic.Platform.platform();
            if (currentPlatform.toLowerCase() == 'android')
                $scope.buttonAlias = "GOOGLE WALLET";
            else if (currentPlatform.toLowerCase() == 'ios')
                $scope.buttonAlias = "PASSBOOK";
            else 
                $scope.buttonAlias = "GOOGLE WALLET";

            $scope.processing = false;
        });
        //$http.post(settings.ServiceURL + '/IDCards?memberid='+ settings.MemberID)
        //    .success(function (data) {
        //        $scope.model.dependents = [];
        //        for (var key in data) {
        //            var item = data[key];
        //            console.log(item.EffectiveDate instanceof Date);
        //            $scope.model.dependents.push({
        //                DateEffective: item.EffectiveDate.toLocaleDateString(),
        //                GroupID: item.GroupId,
        //                Plan: item.Plan,
        //                NetWork: item.Networks,
        //                FirstName: item.FirstName,
        //                LastName: item.LastName,
        //                ID: item.MemberId,
        //				LOBType: item.LOBType
        //            });
        //        }
        //    });
    };
    $scope.load();

    $scope.addIdCard = function (dependentID) {
        alert(dependentID);
    };
});