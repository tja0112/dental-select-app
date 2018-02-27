angular.module('starter.controllers')
.controller('planSummaryCtrl', function ($scope, $timeout, $http, settings, services) {
    $scope.model = {};
    $scope.Plans = [];
    $scope.model.PlanList = [];
    $scope.model.IDP = false;
    $scope.processing = true;
    $scope.loadingListPlans = false;
    services.getIDPMember(settings.MemberID)
                                     .then(function (data) {
                                         $scope.model.IDP = data;
                                         //$scope.processing = false;
                                     });


    services.getPlanNameListByMember(settings.MemberID)
    .then(function (data) {
        
        for (var key in data) {
            var item = data[key];
            $scope.model.PlanList.push({
                ID: item.PlanId,
                PlanName: item.PlanName,
                Network: item.Network,
                Cost: item.Cost,
                CoverageCodeName: item.CoverageCodeName,
                isexpanded: false,
                isexpanded_networks: false,
                GroupId: item.GroupId,
                Dependents: [],
                HasDependents: item.HasDependents,
                HasNetworks: item.HasNetworks
            });
        }
        $scope.processing = false;
    });

    //$http.post(settings.ServiceURL + '/PlanNameListByMember?MemberId=' + settings.MemberID)
    //.success(function (data) {
    //    // $scope.processing = false;
    //    for (var key in data) {
    //        var item = data[key];
    //        $scope.model.PlanList.push({
    //            ID: item.PlanId,
    //            PlanName: item.PlanName,
    //            Network: item.Network,
    //            Cost: item.Cost,
    //            CoverageCodeName: item.CoverageCodeName,
    //            isexpanded: false,
    //            isexpanded_networks: false,
    //            GroupId: item.GroupId,
    //            Dependents: [],
    //            HasDependents: item.HasDependents,
    //            HasNetworks: item.HasNetworks
    //        });
    //    }
    //})
    //.error(function (data, status) {
    //    // $scope.processing = false;
    //    alert('error');
    //});   

    $scope.expand = function (index) {

        //$scope.model.Dependents = [];
        var item = $scope.model.PlanList[index];

        if (item.isexpanded)
            $("#disp_" + index).slideUp();
        else {
            if (item.HasDependents) {
                //$http.post(settings.ServiceURL + '/DependentListByMemberId?MemberId=' + settings.MemberID + '&LineOfBusiness=' + item.Network + '&GroupId=' + item.GroupId)
                //.success(function (data) {
                //    item.Dependents = [];
                //    if (data.length != 0)
                //        for (var key in data) {
                //            var dep = data[key];
                //            item.Dependents.push({
                //                FirstName: dep.FirstName,
                //                LastName: dep.LastName,
                //                Relation: dep.Relation,
                //            });
                //        }
                //})
                //.error(function (data, status) {
                //    alert('error');
                //});
                services.getDependentListByMemberId(settings.MemberID, item.Network, item.GroupId)
                .then(function (data) {
                    item.Dependents = [];
                    if (data.length != 0)
                        for (var key in data) {
                            var dep = data[key];
                            item.Dependents.push({
                                FirstName: dep.FirstName,
                                LastName: dep.LastName,
                                Relation: dep.Relation,
                            });
                        }
                });

                $("#disp_" + index).slideDown();
            }
        }
        item.isexpanded = !item.isexpanded;
    };

    $scope.expandnetwork = function (index) {
        var item = $scope.model.PlanList[index];

        if (item.isexpanded_networks) {
            item.buttonName = "SEE MORE INFO";
            $('#net_' + index).slideUp();
        }

        else {
            if (item.HasNetworks) {
                item.processing_networks = true;
                item.buttonName = "SEE LESS INFO";
                $timeout(function () {
                    item.processing_networks = false;
                    $('#net_' + index).slideDown();
                    $scope.loadingListPlans = true;
                    services.getPlanAvailable(item.ID)
                    .then(function (data) {
                        $scope.loadingListPlans = false;
                        $scope.model.PlanList[index].onNetworkList = [];
                        $scope.model.PlanList[index].offNetworkList = [];
                        angular.forEach(data, function (value, index) {
                            this.push({
                                ID: value.ID,
                                Type: value.Type,
                                Description: value.Description,
                                CoveragePercentage: value.InNetworkPercent,
                                Cost: value.Cost
                            });
                        },
                        $scope.model.PlanList[index].onNetworkList);
                        angular.forEach(data, function (value, index) {
                            this.push({
                                ID: value.ID,
                                Type: value.Type,
                                Description: value.Description,
                                CoveragePercentage: value.OutNetworkPercent,
                                Cost: value.Cost
                            });
                        },
                        $scope.model.PlanList[index].offNetworkList);
                    });

                    // $http.post(settings.ServiceURL + '/PlanAvailable?PlanId=' + item.ID)
                    //.success(function (data) {
                    //    $scope.model.PlanList[index].onNetworkList = [];
                    //    $scope.model.PlanList[index].offNetworkList = [];
                    //    angular.forEach(data, function (value, index) {
                    //        this.push({
                    //            ID: value.ID,
                    //            Type: value.Type,
                    //            Description: value.Description,
                    //            CoveragePercentage: value.InNetworkPercent,
                    //            Cost: value.Cost
                    //        });
                    //    }, $scope.model.PlanList[index].onNetworkList);
                    //    angular.forEach(data, function (value, index) {
                    //        this.push({
                    //            ID: value.ID,
                    //            Type: value.Type,
                    //            Description: value.Description,
                    //            CoveragePercentage: value.OutNetworkPercent,
                    //            Cost: value.Cost
                    //        });
                    //    },
                    //    $scope.model.PlanList[index].offNetworkList);
                    //})
                    //.error(function (data, status) {
                    //    alert('error');
                    //});

                }, 0);
            }
        }
        item.isexpanded_networks = !item.isexpanded_networks;
    };

    $scope.expandplansummary = function (index) {
        var item = $scope.plansummarycard[index];
        if (item.isexpandedplansummary) {
            $('#dep_' + index).slideUp();
        }
        else {
            item.processingplansummary = true;

            $timeout(function () {
                item.processing_networks = false;
                $('#net_' + index).slideDown();

                services.getPlanAvailable(1)
                    .then(function (data) {
                        $scope.model.PlanList[index].onNetworkList = [];
                        $scope.model.PlanList[index].offNetworkList = [];
                        angular.forEach(data, function (value, index) {
                            this.push({
                                ID: value.ID,
                                Type: value.Type,
                                Description: value.Description,
                                CoveragePercentage: value.InNetworkPercent,
                                Cost: value.Cost
                            });
                        },
                        $scope.model.PlanList[index].onNetworkList);
                        angular.forEach(data, function (value, index) {
                            this.push({
                                ID: value.ID,
                                Type: value.Type,
                                Description: value.Description,
                                CoveragePercentage: value.OutNetworkPercent,
                                Cost: value.Cost
                            });
                        },
                        $scope.model.PlanList[index].offNetworkList);
                    });
                // $http.post(settings.ServiceURL + '/PlanAvailable?PlanId=' + 1)
                //.success(function (data) {
                //    $scope.model.PlanList[index].onNetworkList = [];
                //    $scope.model.PlanList[index].offNetworkList = [];
                //    angular.forEach(data, function (value, index) {
                //        this.push({
                //            ID: value.ID,
                //            Type: value.Type,
                //            Description: value.Description,
                //            CoveragePercentage: value.InNetworkPercent,
                //            Cost: value.Cost
                //        });
                //    },
                //    $scope.model.PlanList[index].onNetworkList);
                //    angular.forEach(data, function (value, index) {
                //        this.push({
                //            ID: value.ID,
                //            Type: value.Type,
                //            Description: value.Description,
                //            CoveragePercentage: value.OutNetworkPercent,
                //            Cost: value.Cost
                //        });
                //    },
                //    $scope.model.PlanList[index].offNetworkList);
                //})
                //.error(function (data, status) {
                //    alert('error');
                //});

                item.processingplansummary = false;
                $('#dep_' + index).slideDown();
            }, 0);
        }
        item.isexpandedplansummary = !item.isexpandedplansummary;
    };


    $scope.tabSwitch = function (index, new_tab, new_content) {
        $('#content_1_' + index).css('display', 'none');
        $('#content_2_' + index).css('display', 'none');
        $(new_content).css('display', 'block');

        $('#tab_1_' + index).removeClass('active');
        $('#tab_2_' + index).removeClass('active');
        $(new_tab).addClass('active');
    };

});