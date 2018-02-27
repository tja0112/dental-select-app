angular.module('starter.controllers')
.controller('addDependants', function ($scope, $ionicLoading, $http, $state, settings, services) {

    $scope.dependents = [];
    $scope.processing = true;

    services.getDependentsByMember(settings.PlanConfig.MemberId, settings.PlanConfig.GroupId, $scope.dependents)
                    .then(function (data) {
                        $scope.dependents = [];
                        for (var key in data) {
                            var item = data[key];
                            $scope.dependents.push(item);
                        }
                        $scope.processing = false;
                    }, function (error) {
                        $scope.processing = false;
                        alert('error');
                    });

    //$http.post(settings.ServiceURL + '/GetDependentsByMember?MemberId=' + settings.PlanConfig.MemberId +
    //                                                '&GroupId=' + settings.PlanConfig.GroupId, $scope.dependents)
    //   .success(function (data) {
    //       $scope.dependents = [];
    //       for (var key in data) {
    //           var item = data[key];
    //           $scope.dependents.push(item);
    //       }
    //   })
    //   .error(function (data, status) {
    //       alert('error');
    //   });


    if (settings.OldDependents.length > 0) {
        settings.OldDependents = settings.OldDependents.filter(function (item, index, inputArray) {
            return inputArray.indexOf(item) == index;
        });
        for (var i = 0; i < settings.OldDependents.length; i++) {
            $scope.dependents.push(settings.OldDependents[i]);
        }
    }

    $scope.model = {};
    $scope.newDep = {
        FistName: null,
        LastName: null,
        DateOfBirth: null,
        SSN: null,
        DependentId: null
    };
    $scope.errors = {};
    $scope.errors.view = [];

    $scope.model.Relations = [];

    services.getRelations()
            .then(function (data) {
                for (var key in data) {
                    var item = data[key];
                    $scope.model.Relations.push({
                        Text: item.Text,
                        Value: item.Value,
                        Relation: item.Relation,

                    });
                }
            }, function (error) {
                alert('error');
            });

    $scope.removeDep = function (item) {
        var index = $scope.dependents.indexOf(item);
        $scope.dependents.splice(index, 1);
    };

    $scope.clickAddDependent = function (id) {
        if ($(id).css('display') == 'none')
            $(id).slideDown();
        else
            $("#formAddDepedent").submit();
    };

    $scope.addDependent = function (id) {
          if ($(id).css('display') == 'none')
              $(id).slideDown();
          else {
              //$ionicLoading.show({ template: 'Loading...' });
              $scope.Processing = true;

              //$http.post(settings.ServiceURL + '/SSNExist?SSN=' + $scope.newDep.SSN)
              //    .success(function (data) {
              //        if (data.Success) {
              //            if (!data.Model) {

              $scope.dependents.push(
                  $scope.newDep
                 );

              $scope.newDep = {};
              $("#formAddDepedent")[0].reset();
              $ionicLoading.hide();
              $scope.Processing = false;
              //}
              //    }
              //    else {
              //        $scope.errors = data.Errors;
              //        $ionicLoading.hide();
              //        $scope.Processing = false;
              //    }
              //})
              //.error(function (data, status) {
              //    $scope.processing = false;
              //    alert('error');
              //});
          }
       

    };

    $scope.doSubmit = function () {

        $scope.Type = "";
        if (settings.LOBs[0].IsSelected) {
            $scope.Type = "DENTAL";
        }

        if (settings.LOBs[1].IsSelected) {
            $scope.Type = "VISION";
        }

        if (settings.LOBs[2].IsSelected) {
            $scope.Type = "AD & D";
        }

        settings.OldDependents = $scope.dependents.concat(settings.OldDependents);

        services.setFilterDependents(settings.OldDependents)
                    .then(function (data) {
                        settings.OldDependents = [];
                        for (var key in data) {
                            var item = data[key];
                            settings.OldDependents.push(item);
                        }
                    }, function (error) {
                        alert('error');
                    });

        //$http.post(settings.ServiceURL + '/FilterDependents', settings.OldDependents)
        //  .success(function (data) {
        //      settings.OldDependents = [];
        //      for (var key in data) {
        //          var item = data[key];
        //          settings.OldDependents.push(item);
        //      }
        //  })
        //  .error(function (data, status) {
        //      alert('error');
        //  });

        settings.PlanConfig.Dependents = [];
        settings.PlanConfig.Dependents = $scope.dependents;
        $state.go('app.availabledentalplans', { Type: $scope.Type });
    };

    $scope.skipDependants = function () {
        $scope.Type = "";

        if (settings.LOBs[0].IsSelected) {
            $scope.Type = "DENTAL"
        }

        if (settings.LOBs[1].IsSelected) {
            $scope.Type = "VISION"
        }

        if (settings.LOBs[2].IsSelected) {
            $scope.Type = "AD & D"
        }

        $state.go('app.availabledentalplans', { Type: $scope.Type });
        $scope.dependents = [];
        settings.PlanConfig.Dependents = [];
    };

    $scope.reloaddependents = function () {

        if (settings.PlanConfig.IsEditing) {
            $scope.dependents = settings.PlanConfig.Dependents;
        }
        else {
            if (settings.LOBs[0].IsSelected) {
                settings.PlanConfig.From = "DENTAL";
            }

            if (settings.LOBs[1].IsSelected) {
                settings.PlanConfig.From = "VISION";
            }

            if (settings.LOBs[2].IsSelected) {
                settings.PlanConfig.From = "AD & D";
            }
        }
    }

});
