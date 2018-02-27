angular.module('starter.controllers')
.controller('planSummaryCtrl', function ($scope,$timeout, $http, settings) {
    $scope.model = {};
    $scope.Plans = [];
    $scope.model.PlanList = [];


    //$http.post(settings.ServiceURL + '/PlanNameListByMember?MemberId=' + settings.MemberID)
    //.success(function (data) {
        // $scope.processing = false;
       
       
        $scope.model.PlanList.push({
            ID: '1',
            PlanName: "Gold 4",
            Network: 'Dental',
            Cost: '10',
            CoverageCodeName: "Fam",
            isexpanded: false,
            isexpanded_networks: false,
            GroupId: "Group Demo",
            Dependents: [],
            HasDependents: true,
            HasNetworks: true
        })

        $scope.model.PlanList.push({
            ID: '2',
            PlanName: "Plat 1",
            Network: 'Vision',
            Cost: '100',
            CoverageCodeName: "Fam",
            isexpanded: false,
            isexpanded_networks: false,
            GroupId: "Group Demo",
            Dependents: [],
            HasDependents: false,
            HasNetworks: false
        })
//.error(function (data, status) {
//    // $scope.processing = false;
//    alert('error');
//});


   

        $scope.expand = function (index) {
        
            //$scope.model.Dependents = [];
            var item = $scope.model.PlanList[index];
      
            if (item.isexpanded) {

                $("#disp_" + index).slideUp();

            }

            else {
                if (item.HasDependents) {

                    item.Dependents = [];
                    item.Dependents.push({
                        FirstName: "Amanda",
                        LastName: "Palmer",
                        Relation: {Text: "Spouse"},
                    });

                    item.Dependents.push({
                        FirstName: "Sam",
                        LastName: "Palmer",
                        Relation: { Text: "Other" },
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
                        $scope.model.PlanList[index].onNetworkList = [];
                        $scope.model.PlanList[index].offNetworkList = [];
                        $scope.model.PlanList[index].onNetworkList.push(
                            {
                                Type: "Dental",
                                Description: "Gold 4",
                                CoveragePercentage: ".1"
                            });

                        $scope.model.PlanList[index].onNetworkList.push(
                           {
                               Type: "Vision",
                               Description: "Vision 4",
                               CoveragePercentage: ".24"
                           });

                        $scope.model.PlanList[index].offNetworkList.push(
                          {
                              Type: "Vision",
                              Description: "Vis 7",
                              CoveragePercentage: ".10"
                          });

                        $scope.model.PlanList[index].offNetworkList.push(
                           {
                               Type: "Dental",
                               Description: "Plat 6",
                               CoveragePercentage: ".5"
                           });
                    }, 0);
                }
            }

            item.isexpanded_networks = !item.isexpanded_networks;
        
        }

        $scope.expandplansummary = function (index) {
            var item = $scope.plansummarycard[index];
            if(item.isexpandedplansummary){
                $('#dep_' + index).slideUp();
            }
            else {
                item.processingplansummary = true;
	    			
                $timeout(function () {
                    item.processing_networks = false;
                    $('#net_' + index).slideDown();
	    			       
                    $http.post(settings.ServiceURL + '/PlanAvailable?PlanId=' + 1)
                   .success(function (data) {

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

                       }, $scope.model.PlanList[index].onNetworkList);

                       angular.forEach(data, function (value, index) {
                           this.push({
                               ID: value.ID,
                               Type: value.Type,
                               Description: value.Description,
                               CoveragePercentage: value.OutNetworkPercent,
                               Cost: value.Cost
                           });

                       }, $scope.model.PlanList[index].offNetworkList);

                   })

                   .error(function (data, status) {
                       alert('error');
                   });

                    item.processingplansummary = false;
                    $('#dep_' + index).slideDown();	
                },0);
            }

            item.isexpandedplansummary = !item.isexpandedplansummary;
        };


        $scope.tabSwitch = function(index, new_tab, new_content){
            $('#content_1_' + index).css('display', 'none');
            $('#content_2_' + index).css('display', 'none');
            $(new_content).css('display', 'block');

            $('#tab_1_' + index).removeClass('active');
            $('#tab_2_' + index).removeClass('active');
            $(new_tab).addClass('active');
        };
 		
        ;
	
    });