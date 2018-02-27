angular.module('starter.controllers')
.controller('findProviderCtrl', function ($scope, $state, $http, $timeout, $ionicLoading, settings, services) {

    $('#selectState').css('background-color', 'transparent');
    $scope.processing = true;

    if ("geolocation" in navigator) { //check geolocation available 
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("position" + angular.toJson(position));
        });
    } else {
        console.log("Browser doesn't support geolocation!");
    }

    $scope.filterState = {
        state: null,
        city: null,
        speciality: null,
        lastname: '',
        maxDistance: '',
        Affiliation: null
    };

    $scope.Provider = {};
    $scope.disable = true;
    $scope.Provider.zipCode = "";
    $scope.Provider.doctorLastName = "";
    $scope.Provider.Providers = [];
    $scope.isExpandido = false;
    $scope.isChecked = false;
    $scope.state = "";
    $scope.city = "";
    $scope.latitude = null;
    $scope.longitude = null;
    $scope.network = {};
    $scope.states = [];
    $scope.cities = [];
    $scope.specialities = [];
    $scope.networks = [];
    $scope.errors = [];
    $scope.px = "";

    $scope.showhidelink = "SHOW ADDITIONAL SEARCH CRITERIA";

    //$http.get(settings.ServiceURL + '/GetStatesItems')
    //      .success(function (data) {
    //          $scope.states = data;
    //          data[0].Text = "STATE";
    //          var defaultelement = data[0];
    //          $scope.filterState.state = defaultelement;
    //          $scope.getCities('');
    //      });

    services.getStatesItems()
    .then(function (data) {
        $scope.states = data;
        data[0].Text = "STATE";
        var defaultelement = data[0];
        $scope.filterState.state = defaultelement;
        $scope.getCities('');
        $scope.processing = false;
    });

    //$http.get(settings.ServiceURL + '/GetAffiliations')
    //          .success(function (data) {
    //              $scope.networks = data;
    //              data[0].Text = "NETWORK";
    //              var defaultelement = data[0];
    //              $scope.filterState.Affiliation = defaultelement;
    //          });

    services.getAffiliations()
    .then(function (data) {
        $scope.networks = data;
        data[0].Text = "NETWORK";
        var defaultelement = data[0];
        $scope.filterState.Affiliation = defaultelement;
        $scope.processing = false;
    });

    $scope.getCities = function (state) {

        if ($scope.filterState.state != null && $scope.filterState.state.Value != null && $scope.filterState.state.Text != 'STATE') {
            console.log("entr� a buscar ciudades por estado");
            console.log($scope.filterState.state.Text);
            services.getCitiesByState($scope.filterState.state.Value)
            .then(function (data) {
                console.log(angular.toJson(data));
                if (data.length != 0) {
                    $scope.cities = data;
                    data[0].Text = "CITY";
                    var defaultelement = data[0];
                    $scope.filterState.city = defaultelement;
                }
                else {
                    var elementDefault = {
                        Text: "CITY",
                        Value: "city",
                    };
                    $scope.cities = [];
                    $scope.cities[0] = elementDefault;
                    $scope.filterState.city = elementDefault;
                }
            });

            //$http.get(settings.ServiceURL + '/GetCitiesByState?state=' + $scope.filterState.state.Text)
            //    .success(function (data) {
            //        if (data.length != 0) {
            //            $scope.cities = data;
            //            data[0].Text = "CITY";
            //            var defaultelement = data[0];
            //            $scope.filterState.city = defaultelement;
            //        }
            //        else {
            //            var elementDefault = {
            //                Text: "CITY",
            //                Value: "city",
            //            };
            //            $scope.cities = [];
            //            $scope.cities[0] = elementDefault;
            //            $scope.filterState.city = elementDefault;
            //        }
            //    })
            //     .error(function (data, status) {
            //         if (data.length != 0) {
            //             var elementDefault = {
            //                 Text: "CITY",
            //                 Value: "city",
            //             };
            //             $scope.cities = [];
            //             $scope.cities[0] = elementDefault;
            //             $scope.filterState.city = elementDefault;
            //         }
            //     });
        }
        else {
            var elementDefault = {
                Text: "CITY",
                Value: "city",
            };

            $scope.cities = [];
            $scope.cities[0] = elementDefault;
            $scope.filterState.city = elementDefault;

        }
    };

    services.getSpecialities()
   .then(function (data) {
       $scope.specialities = data;
       data[0].Text = "SPECIALITY";
       var defaultelement = data[0];
       $scope.filterState.speciality = defaultelement;
   });

    //$http.post(settings.ServiceURL + '/GetSpecialities')
    //      .success(function (data) {
    //          $scope.specialities = data;
    //          data[0].Text = "SPECIALITY";
    //          var defaultelement = data[0];
    //          $scope.filterState.speciality = defaultelement;
    //      });

    $scope.aditionalop = function (id) {
        if ($scope.isExpandido) {
            $scope.showhidelink = "SHOW ADDITIONAL SEARCH CRITERIA";
            $(id).slideUp();
        }
        else {
            $scope.showhidelink = "HIDE ADDITIONAL SEARCH CRITERIA";
            $(id).slideDown();
        }

        $scope.isExpandido = !$scope.isExpandido;
    };

    $scope.doSubmit = function () {
        $scope.processing = true;
        if ($('#UseLocation').is(":checked") && $scope.latitude != null && $scope.longitude != null) {
            GetProvidersbyMyLocation();
        }
        else if ($scope.Provider.zipCode != null && $scope.Provider.zipCode != '') {

            $scope.Affiliation = "";
            $scope.Speciality = "";

            if ($scope.filterState.Affiliation.Text != 'NETWORK')
                $scope.Affiliation = $scope.filterState.Affiliation.Text;

            if ($scope.filterState.speciality.Text != 'SPECIALITY')
                $scope.Speciality = $scope.filterState.speciality.Text;


            $ionicLoading.show({ template: 'Loading...' });
            $scope.errors = [];

            services.getProvidersFilter($scope.Provider.zipCode, $scope.Speciality, $scope.filterState.lastname, $scope.Affiliation, undefined, undefined)
            .then(function (data) {
                $scope.ListProviders = [];
                $scope.ListProviders = data;
                GetRoute();
                $ionicLoading.hide();
            });
            //$http.get(settings.ServiceURL + '/ProvidersFilter?zipcode=' +
            //    $scope.Provider.zipCode + '&speciality=' +
            //    $scope.Speciality +
            //    '&lastname=' + $scope.filterState.lastname +
            //    '&Affiliation=' + $scope.Affiliation +
            //    '&city=undefined&state=undefined' + '&DistanceMax=' + 0 +
            //    '&latitude=' + 0.0 + '&longitude=' + 0.0)
            //    .success(function (data) {
            //        // $scope.processing = false;              
            //        $scope.ListProviders = [];
            //        $scope.ListProviders = data;
            //        GetRoute();
            //        $ionicLoading.hide();
            //    })
            //   .error(function (data, status) {
            //       // $scope.processing = false;
            //       alert('error');
            //   });
        }
        else {

            // if ($scope.filterState.city == null)    
            // {       
            //    $scope.filterState.city = { Key : "City", Text : "CITY", Value: "CITY" };
            // }
            $scope.State = "";
            $scope.City = "";
            $scope.Affiliation = "";
            $scope.Speciality = "";


            if ($scope.filterState.state.Text != 'STATE') {

                $scope.State = $scope.filterState.state.Value;
            }


            if ($scope.filterState.city.Text != 'CITY')
                $scope.City = $scope.filterState.city.Value;

            if ($scope.filterState.Affiliation.Text != 'NETWORK')
                $scope.Affiliation = $scope.filterState.Affiliation.Text;

            if ($scope.filterState.speciality.Text != 'SPECIALITY')
                $scope.Speciality = $scope.filterState.speciality.Text;

            $ionicLoading.show({ template: 'Loading...' });
            $scope.errors = [];

            services.getProvidersFilter(undefined, $scope.Speciality, $scope.filterState.lastname, $scope.Affiliation, $scope.City, $scope.State)
            .then(function (data) {
                $scope.ListProviders = [];
                $scope.ListProviders = data;
                GetRoute();
                $ionicLoading.hide();
            });

            //$http.get(settings.ServiceURL + '/ProvidersFilter?zipcode=undefined&speciality='
            //    + $scope.Speciality +
            //    '&lastname=' + $scope.filterState.lastname +
            //    '&Affiliation=' + $scope.Affiliation +
            //    '&city=' + $scope.City + '&state=' +
            //    $scope.State + '&DistanceMax=' + 0 + '&latitude=' + 0.0 + '&longitude=' + 0.0)
            // .success(function (data) {
            //     // $scope.processing = false;              
            //     $scope.ListProviders = [];
            //     $scope.ListProviders = data;
            //     GetRoute();
            //     $ionicLoading.hide();
            // })
            // .error(function (data, status) {
            //     alert('error');
            // })
        }
        $scope.processing = false;
    }

    $scope.getLocation = function () {
        if ($('#UseLocation').is(":checked")) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                $('#UseLocation').prop('checked', false);
                alert("Geolocation is not work.");
            }
        }
    };

    function GetProvidersbyMyLocation() {

        // $http.get(settings.ServiceURL + '/GetProvidersbyLocation?latitude='+$scope.latitude+'&longitude='+ $scope.longitude+'&maxDistance='+$scope.filterState.maxDistance+'&speciality=' + $scope.filterState.speciality.Text + 
        //                                                          '&lastname=' + $scope.filterState.lastname)

        $scope.Affiliation = "";
        $scope.Speciality = "";

        if ($scope.filterState.Affiliation.Text != 'NETWORK')
            $scope.Affiliation = $scope.filterState.Affiliation.Text;

        if ($scope.filterState.speciality.Text != 'SPECIALITY')
            $scope.Speciality = $scope.filterState.speciality.Text;

        services.getProvidersFilter(undefined, $scope.Speciality, $scope.filterState.lastname, $scope.Affiliation, undefined, undefined,
            $scope.filterState.maxDistance, $scope.latitude, $scope.longitude)
            .then(function (data) {
                $scope.ListProviders = [];
                $scope.ListProviders = data;
                GetRoute();
            });
        //$http.get(settings.ServiceURL + '/ProvidersFilter?zipcode=undefined&speciality='
        //        + $scope.Speciality +
        //        '&lastname=' + $scope.filterState.lastname +
        //        '&Affiliation=' + $scope.Affiliation +
        //        '&city=undefined&state=undefined&DistanceMax=' + $scope.filterState.maxDistance + '&latitude=' +
        //        $scope.latitude + '&longitude=' + $scope.longitude)
        //       .success(function (data) {
        //           // $scope.processing = false;           
        //           $scope.ListProviders = [];
        //           $scope.ListProviders = data;
        //           GetRoute();
        //       })
        //       .error(function (data, status) {
        //           // $scope.processing = false;
        //           alert('error');
        //       });
    };


    function GetRoute() {
        var currentPlatform = ionic.Platform.platform();
        for (var key in $scope.ListProviders) {
            if ($scope.ListProviders[key].Latitude != null && $scope.ListProviders[key].Longitude != null) {
                if (currentPlatform.toLowerCase() == 'android')
                    $scope.ListProviders[key].Route = "http://maps.google.com/maps?t=h&q=loc:" + $scope.ListProviders[key].Latitude + "," + $scope.ListProviders[key].Longitude + "&z=9";
                else if (currentPlatform.toLowerCase() == 'ios')
                    $scope.ListProviders[key].Route = "http://maps.apple.com/maps?t=h&q=loc:" + $scope.ListProviders[key].Latitude + "," + $scope.ListProviders[key].Longitude + "&z=9";
                else
                    $scope.ListProviders[key].Route = "http://maps.google.com/maps?t=h&q=loc:" + $scope.ListProviders[key].Latitude + "," + $scope.ListProviders[key].Longitude + "&z=9";
            };
        }

        $state.go('app.findProviderList', { ListProviders: $scope.ListProviders });
    }

    function showPosition(position) {
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
    };

    function showError(error) {
        $('#UseLocation').prop('checked', false);
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
    };

    $scope.getactiveButton = function () {
        if ($scope.isChecked || $scope.Provider.zipCode != "" || ($scope.filterState != undefined && $scope.filterState.state != undefined && $scope.filterState.city != undefined))
            return "blueController";
        else
            return "inactive";
    }
});







