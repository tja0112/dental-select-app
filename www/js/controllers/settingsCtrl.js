angular.module('starter.controllers')
.controller('settingsCtrl', function ($scope, $timeout, $http, $ionicHistory, $ionicPopup, settings, services) {

    $scope.personalInfoObj = {};

    //$("#phone1").mask("(999) 999-9999", { placeholder: "(___) ___-____" });
    //$("#phone2").mask("(999) 999-9999", { placeholder: "(___) ___-____" });


    $scope.personalInfo = {
        email: null,
        password: null,
        newpassword: null,
        confpassword: null,
        phone: null
    }

    services.getPersonalInfo(settings.currentUserPersonID)
    .then(function (data) {
        //$scope.personalInfoObj = data;
        $scope.personalInfo.email = data.Email;
        $scope.personalInfo.phone = data.Phone;

        //$timeout(function () {
        //    $scope.$apply(function () {
        //        $('#phone1').mask("(999) 999-9999", { placeholder: "(___) ___-____" });
        //        $("#phone2").mask("(999) 999-9999", { placeholder: "(___) ___-____" });
        //    })
        //}, 0)
    });

    //$http.post(settings.ServiceURL + '/GetPersonalInfo?PersonID=' + settings.currentUserPersonID)
    //      .success(function (data) {
    //          $scope.personalInfoObj = data;
    //          $scope.personalInfo.email = data.Email;
    //          $scope.personalInfo.phone = data.Phone;

    //          $timeout(function(){

    //            $scope.$apply(function(){

    //                $('#phone1').mask("(999) 999-9999", { placeholder: "(___) ___-____" });
    //                $("#phone2").mask("(999) 999-9999", { placeholder: "(___) ___-____" });
    //            })
    //          }, 0)
    //      })

    $scope.isexpanded = false;
    $scope.isexpanded_preferences = false;
    $scope.isexpanded_security = false;
    $scope.isconnected_facebook = false;
    $scope.isconnected_yahoo = false;
    $scope.isconnected_twitter = false;
    $scope.isconnected_google = false;
    $scope.isconnected_microsoft = false;

    $scope.facebook = "DISCONNECT";
    $scope.yahoo = "DISCONNECT";
    $scope.twitter = "DISCONNECT";
    $scope.google = "DISCONNECT";
    $scope.microsoft = "DISCONNECT";

    $scope.facebookClick = function () {

        $scope.isconnected_facebook = !$scope.isconnected_facebook;
        if ($scope.isconnected_facebook)
            $scope.facebook = "CONNECT";
        else
            $scope.facebook = "DISCONNECT";
    }


    $scope.yahooClick = function () {
        $scope.isconnected_yahoo = !$scope.isconnected_yahoo;

        if ($scope.isconnected_yahoo)
            $scope.yahoo = "CONNECT";
        else
            $scope.yahoo = "DISCONNECT";
    }


    $scope.twitterClick = function () {
        $scope.isconnected_twitter = !$scope.isconnected_twitter;
        if ($scope.isconnected_twitter)
            $scope.twitter = "CONNECT";
        else
            $scope.twitter = "DISCONNECT";
    }


    $scope.googleClick = function () {
        $scope.isconnected_google = !$scope.isconnected_google;
        if ($scope.isconnected_google)
            $scope.google = "CONNECT";
        else
            $scope.google = "DISCONNECT";
    }


    $scope.microsoftClick = function () {

        $scope.isconnected_microsoft = !$scope.isconnected_microsoft;
        if ($scope.isconnected_microsoft)
            $scope.microsoft = "CONNECT";
        else
            $scope.microsoft = "DISCONNECT";
    }

    $scope.expand = function (id) {

        if ($scope.isexpanded) 
            $(id).slideUp();
        else 
            $(id).slideDown();

        $scope.isexpanded = !$scope.isexpanded;
    };


    $scope.expandPreferences = function (id) {

        if ($scope.isexpanded_preferences)
            $(id).slideUp();
        else
            $(id).slideDown();

        $scope.isexpanded_preferences = !$scope.isexpanded_preferences;
    };

    $scope.expandSecurity = function (id) {

        if ($scope.isexpanded_security)
            $(id).slideUp();
        else
            $(id).slideDown();

        $scope.isexpanded_security = !$scope.isexpanded_security;
    }

    $scope.save = function () {

        $scope.personalInfoObj.Email = $scope.personalInfo.email;
        //$http.post(settings.ServiceURL + '/EditPersonalInfo?token=1234', $scope.personalInfoObj)
        //  .success(function (data) {
        //      //$scope.personalInfo = {};
        //      var confirmPopup = $ionicPopup.alert({
        //          title: '<p class="fontBlack">EDIT EMAIL</p>',
        //          template: '<p class="text-center fontBold" style="font-size:16px; margin-top: -10px;">Email was edited correctly</p>',
        //          okType: 'blueController'
        //      });
        //      $ionicHistory.clearCache();
        //  });

        services.setEditPersonalInfo("token=1234", $scope.personalInfoObj)
        .then(function (data) {
            //$scope.personalInfo = {};
            var confirmPopup = $ionicPopup.alert({
                title: '<p class="fontBlack">EDIT EMAIL</p>',
                template: '<p class="text-center fontBold" style="font-size:16px; margin-top: -10px;">Email was edited correctly</p>',
                okType: 'blueController'
            });
            $ionicHistory.clearCache();
        });
    };

    $scope.savePhoneNumber = function () {

        $('#savephone').focus();
        $scope.personalInfoObj.Phone = $scope.personalInfo.phone.replace(/[ \-()]/g, "");

        //$http.post(settings.ServiceURL + '/EditPersonalInfo?token=1234', $scope.personalInfoObj)
        //  .success(function (data) {
        //      //$scope.phonenumber = null;
        //      var confirmPopup = $ionicPopup.alert({
        //          title: '<p class="fontBlack">EDIT PHONE</p>',
        //          template: '<p class="text-center fontBold" style="font-size:16px; margin-top: -10px;">Phone was edited correctly</p>',
        //          okType: 'blueController'
        //      });

        //      $ionicHistory.clearCache();
        //  });

        services.setEditPersonalInfo("token=1234", $scope.personalInfoObj)
        .then(function () {
            //$scope.phonenumber = null;
            var confirmPopup = $ionicPopup.alert({
                title: '<p class="fontBlack">EDIT PHONE</p>',
                template: '<p class="text-center fontBold" style="font-size:16px; margin-top: -10px;">Phone was edited correctly</p>',
                okType: 'blueController'
            });

            $ionicHistory.clearCache();
        });
    }

});
