angular.module('starter.controllers')
.controller('scannTestCtrl', function ($scope, $ionicLoading, $http, $state, settings) {

    $scope.TestScann = function () {
        alert("ok");

        var cardIOResponseFields = [
          "card_type",
          "redacted_card_number",
          "card_number",
          "expiry_month",
          "expiry_year",
          "cvv",
          "zip"
        ];

        

        CardIO.scan({
            "expiry": true,
            "cvv": true,
            "zip": true,
            "suppressManual": false,
            "suppressConfirm": false,
            "hideLogo": true
        })
               onCardIOComplete
               
           
               }

    $scope.onCardIOComplete = function (response) {
        alert("card.io scan complete");
        for (var i = 0, len = cardIOResponseFields.length; i < len; i++) {
            var field = cardIOResponseFields[i];
            alert(field + ": " + response[field]);
        }
    };

});
