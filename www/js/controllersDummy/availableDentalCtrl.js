angular.module('starter.controllers')
.controller('availableDentalCtrl', function ($ionicHistory,$scope, $timeout, $http, settings, $stateParams, $state) {
    // $scope.onNetworkList = [];
    // $scope.offNetworkList = [];
    
    $scope.model = {};
    $scope.model.type = settings.PlanConfig.From;//$stateParams.Type;
    settings.PlanConfig.Type = settings.PlanConfig.From; //$stateParams.Type;
    $scope.model.PlanList = [];

   

    $http.post(settings.ServiceURL + '/PlanNameList?PlanType='+ settings.PlanConfig.PlanType +'&GroupId='+settings.PlanConfig.GroupId)
       .success(function (data) {
           // $scope.processing = false;
            $scope.model.PlanList = [];

           for (var key in data) {
               var item = data[key];
               $scope.model.PlanList.push({
                  ID: item.ID,
                   PlanName: item.Name,
                   Network: item.Network,
                   buttonName: "SEE MORE INFO",
                   showEnroll: false,
                   showMore: true,
                   ContractPlanId: item.ContractPlanId
               });
           }


            if(settings.PlanConfig.IsEditing){

                angular.forEach($scope.model.PlanList, function (value){

                    if(value.PlanName == settings.PlanConfig.Plan.PlanName){
                       var ind = $scope.model.PlanList.indexOf(value);
                       $scope.expandplan(ind, value);
                        }

                }, $scope.model.PlanList);
            }
       })
       .error(function (data, status) {
           // $scope.processing = false;
           alert('error');
       });


    // $scope.planRates = [];
   

    // $scope.isExpanded = false;
    // $scope.buttonName = "SEE MORE INFO";

   $scope.expandnetwork = function(index){
        var item = $scope.model.PlanList[index];
 
        if(item.isexpanded_networks){
            item.buttonName = "SEE MORE INFO";
            $('#net_' + index).slideUp();
        }
        
        else{
                item.processing_networks = true;
                item.buttonName = "SEE LESS INFO";
                $timeout(function(){
                    item.processing_networks = false;
                    $('#net_' + index).slideDown(); 

                 $http.post(settings.ServiceURL + '/PlanAvailable?PlanId='+ item.ID)
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

                    }, 2000);
            }

            item.isexpanded_networks = !item.isexpanded_networks;
    };
                        // }, item.OnNetworkList);
                    

                    // angular.forEach(data.OffNetworkList, function (value) {
                    //  for (var key in data) {

                    //         var item = data[key];

                    //         $scope.model.PlanList[index].OffNetworkList.push({
                    //             ID: item.ID,
                    //             Type: item.Type,
                    //             Description: item.Description,
                    //             CoveragePercentage: item.CoveragePercentage,
                    //             Cost: item.Cost
                    //         });
                    // }
   
                    //}, item.offNetworkList);

    $scope.enrollPlan = function (item) {
        $scope.Plan = {};

        $scope.Plan = {
            ID: item.ID,
            PlanName: item.PlanName,
            Network: item.Network,
            Rates: item.planRates,
            InNetwork: $scope.onNetworkList,
            OutNetwork: $scope.offNetworkList
        };
        settings.PlanConfig.ContractPlanId = item.ContractPlanId
        settings.PlanConfig.Plan = $scope.Plan;
        //settings.PlanConfig.Rate = '120.00'
        $state.go('app.planOptions', {Rates: $scope.Plan.Rates});
    };


    $scope.expandplan = function(index, item){
        var itemplan = $scope.model.PlanList[index];

        if(itemplan.showMore)
        {
            for (var i = 0; i < $scope.model.PlanList.length; i++) {

                if($scope.model.PlanList[i] != $scope.model.PlanList[index]){
                    var itemCollapsed = $scope.model.PlanList[i];
                    itemCollapsed.showEnroll = false;
                    itemCollapsed.showMore = true;
                    itemCollapsed.isexpanded = false;
                    $('#expp_' + i).slideUp();
                }
            };
        }
        
        if(item.isexpanded){
            $('#expp_' + index).slideUp();
             itemplan.showEnroll = false;
             itemplan.showMore = true;
                   
        }

        else{
            itemplan.processing = true;

            $scope.dependents = [];
            $timeout(function(){
                itemplan.processing = false;
                $('#expp_' + index).slideDown();  
                  itemplan.showEnroll = true;
                  itemplan.showMore = false;

                $http.post(settings.ServiceURL + '/PlanRates?PlanId=' + item.ID +
                    '&GroupKey=' + settings.GroupKey)
                .success(function (data) {


                    $scope.model.PlanList[index].planRates = [];

                    for (var key in data) {

                        var item = data[key];
                        
                        $scope.model.PlanList[index].planRates.push({
                            ID: item.ID,
                            Name: item.Description,
                            Cost: item.Cost,
                            CoverageCodeId: item.CoverageCodeId
                        });
                    }
                })

                .error(function (data, status) {
                    alert('error');
                }); 
                
            },2000);
        }
        itemplan.isexpanded = !itemplan.isexpanded;
    };


    $scope.tabSwitch = function(index, new_tab, new_content){
        $('#content_1_' + index).css('display', 'none');
        $('#content_2_' + index).css('display', 'none');
        $(new_content).css('display', 'block');

        $('#tab_1_' + index).removeClass('active');
        $('#tab_2_' + index).removeClass('active');
        $(new_tab).addClass('active');
    };
});