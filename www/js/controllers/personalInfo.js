angular.module('starter.controllers')
.controller('personalInfo', function ($scope, $http, settings, $state, $stateParams, $ionicLoading, services) {
    $scope.personalinfo = {};

    if ($stateParams.PersonalInfo != null) 
        $scope.personalinfo = $stateParams.PersonalInfo;
    else {
        //$ionicLoading.show({ template: 'Loading...' });
        $scope.processing = true;
        services.getPersonalInfo(settings.currentUserPersonID)
        .then(function (data) {
            console.log(data.NumberExternal);
            $scope.personalinfo = data;

            if (data.Phone != null)
                $scope.personalinfo.Tel = "(" + data.Phone.substring(0, 3) + ") " + data.Phone.substring(3, 6) + "-" + data.Phone.substring(6, 10);

            //$ionicLoading.hide();
            $scope.processing = false;
        });

        //$http.post(settings.ServiceURL + '/GetPersonalInfo?personID=' + settings.currentUserPersonID)
        //        .success(function (data) {
        //            console.log(data.NumberExternal);
        //            $scope.personalinfo = data;
        //            if(data.Phone != null)
        //                $scope.personalinfo.Tel = "(" + data.Phone.substring(0, 3) + ") " + data.Phone.substring(3, 6) + "-" + data.Phone.substring(6, 10); 
        //            $ionicLoading.hide();
        //        })
        //    .error(function (data, status) {
        //        alert('error');
        //    })

    }

    $scope.EditInfo = function () {
        $state.go('app.editPersonalInfo', { PersonalInfo: $scope.personalinfo });
    };
	
	
	 $scope.launchPhotoLibrary = function() {
    if (navigator.camera) {
      navigator.camera.getPicture( cameraSuccess, cameraError,
                                 { sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY } );
    } else {
      $scope.imagestring = encodeURIComponent("http://lorempixel.com/200/400/");
    }
	$scope.imagestring = decodeURIComponent($scope.imagestring);
	// $state.go('crop-image', {imageURI:$scope.imagestring});
    // $state.go('crop-image', {imageURI:$scope.imagestring});
  };
  function cameraSuccess(imageURI) {
    // hack until cordova 3.5.0 is released
    if (imageURI.substring(0,21)=="content://com.android") {
      var photo_split=imageURI.split("%3A");
      imageURI="content://media/external/images/media/"+photo_split[1];
    }
    $scope.image.src = imageURI;
  }
  function cameraError(message) {
    alert('Failed because: ' + message);
  }

});

