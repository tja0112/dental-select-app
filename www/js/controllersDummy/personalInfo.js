angular.module('starter.controllers')
.controller('personalInfo', function ($scope, $http, settings, $state, $stateParams, $ionicLoading) {
    $scope.personalinfo = 
    {
        MemberId : '1',
        Name: "John Doe",
        NumberInternal : "10",
        NumberExternal : "10",
        StreetAddress1: "The White House, 1600 Pennsylvania Avenue Northwest, Washington D. C., Distrito de Columbia 20500, EE. UU.",
        State : 'UT',
        StreetAddress2 : "456 Elm street",
        City : 'Salt Lake City',
        ZipCode: '65203',
        Country: "USA",
        Phone: '858-225-155',
        Email:"jdoe@mail.com" ,
        Gender: 'F',
        Neighborhood : null,
        County : null
    };


    $scope.EditInfo = function () {

        $state.go('app.editPersonalInfo', { PersonalInfo: $scope.personalinfo });
    };

 });

