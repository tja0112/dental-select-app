angular.module('starter.controllers')
.controller('findProviderListCtrl', function ($scope, $state, $http, settings, $stateParams, $timeout) {
    $scope.count = 0;
    $scope.itemIndex = 0;
    $scope.NewItemsProviders = [];
    $scope.totalProviders = $stateParams.ListProviders.length;

    $scope.loadMoreItems = function(){  
        useItems()
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    function useItems(){    

        console.log('count: ' + $scope.count + ' index: ' + $scope.itemIndex);

        while($scope.count < 3 && $scope.itemIndex < $scope.totalProviders){
            $scope.NewItemsProviders.push($stateParams.ListProviders[$scope.itemIndex]);
            var item = $scope.NewItemsProviders[$scope.itemIndex];
            item.Phone = item.Phone = "(" + item.Phone.substring(0, 3) + ") " + item.Phone.substring(3, 6) + "-" + item.Phone.substring(6, 10); 
            $scope.itemIndex++;
            $scope.count++;
        }

        $scope.count = 0;
        console.log($scope.NewItemsProviders.length);
    }

    $scope.canBeLoadMore = function(){

        if($scope.itemIndex  < $scope.totalProviders)
            return true;

        else
            return false;
    }

    $scope.dialNumber = function(number) {
            window.open('tel:' + number, '_system');
    }
   
});




