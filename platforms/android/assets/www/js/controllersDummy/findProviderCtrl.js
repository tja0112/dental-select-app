angular.module('starter.controllers')
.controller('findProviderCtrl', function ($scope, $state, $http, $timeout, $ionicLoading,settings) {
   
    $('#selectState').css('background-color', 'transparent');
    

  $scope.filterState = {

     state: null,
     city: null,
     speciality: null,
     lastname: '',
     maxDistance:'',
     Affiliation:null
  };


	$scope.Provider = {};
  $scope.disable =true;
	$scope.Provider.zipCode = "";
	$scope.Provider.doctorLastName = "";
	$scope.Provider.Providers = [];
	$scope.isExpandido = false;
  $scope.isChecked = null;
  $scope.state = "";
  $scope.city = "";
  $scope.latitude=null;
  $scope.longitude=null;
  $scope.network = {};
  $scope.states = [];
  $scope.cities = [];
  $scope.specialities = [];
  $scope.networks = [];
  $scope.errors = [];
  $scope.px="" ;

  $scope.states[0] = {Text:"STATE"};   
  $scope.states[1] = {Text:"California"};
  $scope.states[2] = {Text:"Arizona"};  
  $scope.states[3] = {Text:"Florida"};
  

  $scope.networks[0]={Text:"NETWORK"};
  $scope.networks[1]={Text:"Silver"};
  $scope.networks[2]={Text:"Gold 1"};
  $scope.networks[3]={Text:"Plat 1"};  

  $scope.specialities[0]={Text:"SPECIALITY"};
  $scope.specialities[1]={Text:"Endodontics"};
  $scope.specialities[2]={Text:"Orthodontics"};
  $scope.specialities[3]={Text:"General Dentistry"};


  $scope.cities[0]={Text:"CITY"};


	$scope.showhidelink = "SHOW ADDITIONAL SEARCH CRITERIA";


//     $http.get(settings.ServiceURL + '/GetStatesItems')
//           .success(function (data) {

//               $scope.states = data;   
//               data[0].Text="STATE";   
//               var defaultelement = data[0];             
//               $scope.filterState.state=defaultelement;   
//               $scope.getCities('');                  
              
//           });


// $http.get(settings.ServiceURL + '/GetAffiliations')
//           .success(function (data) {

//               $scope.networks = data; 
//                data[0].Text="NETWORK"; 
//               var defaultelement = data[0];             
//               $scope.filterState.Affiliation=defaultelement;             
//           });


          
  // $scope.getCities = function (state){

  //    if ($scope.filterState.state!= null && $scope.filterState.state.Text!=null && $scope.filterState.state.Text!='STATE')        
  //    {
  //       $http.get(settings.ServiceURL + '/GetCitiesByState?state=' + $scope.filterState.state.Text)
  //           .success(function (data) {   

  //                if (data.length !=0) {       
  //                   $scope.cities = data;    
  //                   data[0].Text="CITY";   
  //                   var defaultelement = data[0];                            
  //                   $scope.filterState.city=defaultelement;  
  //                 }
  //                 else {

  //                     var elementDefault={
  //                       Text: "CITY",
  //                       Value: "city",
  //                     };

  //                     $scope.cities=[];
  //                     $scope.cities[0]=elementDefault;
  //                     $scope.filterState.city=elementDefault;  
                                  
  //                 }          
  //           })
  //            .error(function (data, status) {             
              
  //             if (data.length != 0){
  //                var elementDefault={
  //                       Text: "CITY",
  //                       Value: "city",
  //                     };

  //               $scope.cities=[];
  //               $scope.cities[0]=elementDefault;
  //               $scope.filterState.city=elementDefault;  
  //             }     
  //        });
  //     }
  //     else{           
  //           var elementDefault={
  //                   Text: "CITY",
  //                   Value: "city",
  //                 };

  //           $scope.cities=[];
  //           $scope.cities[0]=elementDefault;
  //           $scope.filterState.city=elementDefault;                       
                          
  //     }
  // };
       

    // $http.post(settings.ServiceURL + '/GetSpecialities')
    //       .success(function (data) {
                
    //           $scope.specialities = data;  
    //            data[0].Text="SPECIALITY";                       
    //            var defaultelement = data[0];             
    //           $scope.filterState.speciality=defaultelement;   
    //       });



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

               $scope.ListProviders=[];
               $scope.Provider.FirstName="John";
               $scope.Provider.LastName="Doe";
               $scope.Provider.Speciality="Endodontics";
               $scope.Provider.State="District of Columbia";
               $scope.Provider.City="Massachusetts";
               $scope.Provider.Miles=153516;
               $scope.Provider.Network="Gold";
               $scope.Provider.Phone="3155555";
               $scope.Provider.FormattedAdderss="27280";
               $scope.ListProviders[0]=$scope.Provider;
               $scope.Provider.Latitude=35.6895000;
               $scope.Provider.Longitude=139.6917100;
               GetRoute();               
    
   //    if ( $('#UseLocation').is(":checked") && $scope.latitude!=null && $scope.longitude!=null  )
   //  {
   //     GetProvidersbyMyLocation();
   //  }
   //  else if( $scope.Provider.zipCode != null && $scope.Provider.zipCode != '')
   //  {
    
   //  $scope.Affiliation="";
   //  $scope.Speciality="";

   //  if($scope.filterState.Affiliation.Text !='NETWORK') 
   //       $scope.Affiliation=$scope.filterState.Affiliation.Text;

   // if($scope.filterState.speciality.Text !='SPECIALITY') 
   //   $scope.Speciality=$scope.filterState.speciality.Text;


   //  $ionicLoading.show({ template: 'Loading...' });
   //  $scope.errors = []; 


   //  $http.get(settings.ServiceURL + '/ProvidersFilter?zipcode='+ $scope.Provider.zipCode+'&speciality=' + 
   //                                                               $scope.Speciality + 
   //                                                              '&lastname=' + $scope.filterState.lastname + 
   //                                                              '&Affiliation='+ $scope.Affiliation +
   //                                                              '&city=undefined&state=undefined'+'&DistanceMax='+0+'&latitude='+0.0+'&longitude='+0.0)
   //      .success(function (data) {

   //              // $scope.processing = false;              
   //            $scope.ListProviders = [];
   //            $scope.ListProviders = data;  
   //            GetRoute();
   //            $ionicLoading.hide();      

   //      })
   //     .error(function (data, status) {
   //         // $scope.processing = false;
   //         alert('error');
   //     });
   //   }

    

   //  else {

          
   //     // if ($scope.filterState.city == null)    
   //     // {       
   //     //    $scope.filterState.city = { Key : "City", Text : "CITY", Value: "CITY" };
   //     // }
   //     $scope.State="";
   //     $scope.City="";
   //     $scope.Affiliation="";
   //     $scope.Speciality="";

   //     if($scope.filterState.state.Text !='STATE') 
   //         $scope.State=$scope.filterState.state.Text;

   //     if($scope.filterState.city.Text !='CITY') 
   //       $scope.City=$scope.filterState.city.Text;

   //     if($scope.filterState.Affiliation.Text !='NETWORK') 
   //       $scope.Affiliation=$scope.filterState.Affiliation.Text;

   //     if($scope.filterState.speciality.Text !='SPECIALITY') 
   //       $scope.Speciality=$scope.filterState.speciality.Text;

        
   //    $ionicLoading.show({ template: 'Loading...' });
   //    $scope.errors = []; 
      
   //     $http.get(settings.ServiceURL + '/ProvidersFilter?zipcode=undefined&speciality=' + $scope.Speciality + 
   //                                                     '&lastname=' + $scope.filterState.lastname +
   //                                                     '&Affiliation='+ $scope.Affiliation +
   //                                                     '&city='+ $scope.City+'&state=' +
   //                                                     $scope.State+'&DistanceMax='+0+'&latitude='+0.0+'&longitude='+0.0)

   //      .success(function (data) {

   //              // $scope.processing = false;              
   //            $scope.ListProviders = [];
   //            $scope.ListProviders = data;  
   //            GetRoute();
   //            $ionicLoading.hide();      
   //      })          
   //      .error(function (data, status) {
   //            alert('error');
   //      })
   //    }
      

	}


 
	
    $scope.getLocation = function () {  

  
      if ( $('#UseLocation').is(":checked") )
      { 	         
           if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition,showError);
          } else { 
             $('#UseLocation').prop('checked',false);            
            alert("Geolocation is not work.");           
          }
      }
      else{
                                      
      }

    };

    function GetProvidersbyMyLocation() { 
      
       // $http.get(settings.ServiceURL + '/GetProvidersbyLocation?latitude='+$scope.latitude+'&longitude='+ $scope.longitude+'&maxDistance='+$scope.filterState.maxDistance+'&speciality=' + $scope.filterState.speciality.Text + 
       //                                                          '&lastname=' + $scope.filterState.lastname)


    $scope.Affiliation="";
    $scope.Speciality="";
    
    if($scope.filterState.Affiliation.Text !='NETWORK') 
         $scope.Affiliation=$scope.filterState.Affiliation.Text;

   if($scope.filterState.speciality.Text !='SPECIALITY') 
     $scope.Speciality=$scope.filterState.speciality.Text;


$http.get(settings.ServiceURL + '/ProvidersFilter?zipcode=undefined&speciality=' + $scope.Speciality+ 
                                                       '&lastname=' + $scope.filterState.lastname +
                                                       '&Affiliation='+ $scope.Affiliation +
                                                       '&city=undefined&state=undefined&DistanceMax='+$scope.filterState.maxDistance+'&latitude='+
                                                       $scope.latitude+'&longitude='+$scope.longitude)
                                                       
       .success(function (data) {
           // $scope.processing = false;           
            $scope.ListProviders = [];
            $scope.ListProviders = data;           
           GetRoute();

       })
       .error(function (data, status) {
           // $scope.processing = false;
           alert('error');
      });
    };


    function GetRoute()
    {     
        var currentPlatform = ionic.Platform.platform();
        for (var key in $scope.ListProviders) {  
                      
               if ($scope.ListProviders[key].Latitude!=null && $scope.ListProviders[key].Longitude!=null) {  

                 if(currentPlatform.toLowerCase() == 'android')                     
                        $scope.ListProviders[key].Route = "http://maps.google.com/maps?t=h&q=loc:"+$scope.ListProviders[key].Latitude+","+$scope.ListProviders[key].Longitude+"&z=9";
                  else if(currentPlatform.toLowerCase() == 'ios')
                       $scope.ListProviders[key].Route = "http://maps.apple.com/maps?t=h&q=loc:"+$scope.ListProviders[key].Latitude+","+$scope.ListProviders[key].Longitude+"&z=9";
                  else
                      $scope.ListProviders[key].Route = "http://maps.google.com/maps?t=h&q=loc:"+$scope.ListProviders[key].Latitude+","+$scope.ListProviders[key].Longitude+"&z=9";    
                };                      
           }

           $state.go('app.findProviderList', { ListProviders: $scope.ListProviders });
    } 



    function showPosition(position) {

    $scope.latitude=position.coords.latitude;
    $scope.longitude=position.coords.longitude;      
    };


    
function showError(error) {
        
        $('#UseLocation').prop('checked',false);        
    switch(error.code) {
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


});







