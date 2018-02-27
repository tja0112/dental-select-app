angular.module('starter.controllers')
.controller('idCardsCtrl', function ($scope, $http, settings) {

    $scope.newDep = {};

    $scope.model = {};
    $scope.model.dependents = [];
    $scope.load = function () {
        $http.post(settings.ServiceURL + '/IDCards?token=1234')
        .success(function (data) {
            $scope.model.dependents = [];
            for (var key in data) {
                var item = data[key];

                console.log(item.EffectiveDate instanceof Date);

                $scope.model.dependents.push({
                    DateEffective: item.EffectiveDate.toLocaleDateString(),
                    GroupID: item.GroupId,
                    Plan: item.Plan,
                    NetWork: item.Networks,
                    FirstName: item.FirstName,
                    LastName: item.LastName,
                    ID: item.MemberId
                });
            }
        });
    };

    $scope.load();


    $scope.addIdCard = function (dependentID) {

        alert(dependentID);


    };
});