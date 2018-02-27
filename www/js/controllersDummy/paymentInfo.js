//angular.module('starter.controllers')
//.factory('dataFactory', function($http, settings) {

//    //var urlGet = settings.ServiceURL + '/GetPaymentInfoListByMember?memberID=';
//    //var urlDelete = settings.ServiceURL + '/DeleteAccount?id=';
//    //var urlEditPrimary = settings.ServiceURL + '/SetPrimaryAccount?FinancialAccountId=';
//    //var urlAccountTypes = settings.ServiceURL + '/GetAccountTypeList';
//    //var urlFundingSource = settings.ServiceURL + '/GetFundingSourceList';
//    //var urlPlanYearType = settings.ServiceURL + '/GetPlanYearTypeList';
//    var dataFactory = {};

//    dataFactory.

//    };

//    dataFactory.deleteAccount = function (Id) {
//        return $http.delete(urlDelete + Id);
//    };

//    dataFactory.updateAccount = function (Id) {
//        return $http.put(urlEditPrimary + Id)
//    };

//    dataFactory.getAccountTypes = function () {
//        return $http.get(urlAccountTypes);
//    };

//    dataFactory.getFundingSources = function () {
//        return $http.get(urlFundingSource);
//    };

//      dataFactory.getPlanYearTypes = function () {
//        return $http.get(urlPlanYearType);
//    };


//    return dataFactory; 
//});

angular.module('starter.controllers')
.controller('paymentInfo', function ($scope, $ionicLoading, $timeout, $state, $ionicHistory, $filter, $ionicPopup, $http, $stateParams, settings) {

    // $scope.paymentmethod = $stateParams;
    $scope.showchecking = false;
    $scope.processing = false;
    $scope.processingform2 = false;
   
    $scope.paymentmethod = {
        Id: 1,
        AccountType: {Value:"Amex", Text: "American Express Card" },
        AccountName: "Card 1",
        AccountNumber: "12332",
        HideAccountNumber:"12",
        ExpirationMonth: "11",
        ExpirationYear: "2009",
        CVVCode: "123",
        RoutingNumber: "123",
        FinancialInstituteName: "Ins Name",
        AbaNumber: "123",
        Order: 2,
        EffectiveDate: null,
        TerminationDate: null,
        FundingSource: null,
        PlanYearType: null,
        FundingAmount: null,
        DraftDay: null,
        UseForPremiumPayment: null,
        UseForClaimPayment: null,
        PrepaymentRecognition: null,
        IsPrimary: true
    };
    $scope.accounttypes = [];
    $scope.accounttypes.push({
        Key: "AccountTypes",
        Text: "Checking Account",
        Value: "1"
    });
   
    $scope.accounttypes.push({
        Key: "AccountTypes",
        Text: "American Express Card",
        Value: "2"
    });

    /************************************/
    $scope.planyeartypes = [];
    $scope.planyeartypes.push({
        Key: "PlanYearType",
        Text: "Plan Year Based upon Group Funding Eff Date",
        Value: "3"
    });

    $scope.planyeartypes.push({
        Key: "PlanYearType",
        Text: "Calendar Plan Year",
        Value: "2"
    });
    /************************************/
    $scope.fundingsources = [];
    $scope.fundingsources.push({
        Key: "FundingSource",
        Text: "Credit Card Account for Premium",
        Value: "CC"
    });

    $scope.fundingsources.push({
        Key: "FundingSource",
        Text: "ACH Account for Premium",
        Value: "ACH"
    });
    //$scope.getAccounts = function (Id) {
    //    $res = [];
    //    return $res;
    //}
    $scope.paymentmethodlist = [{
        Id: 1,
        AccountType: {Text: "Checking"},
        AccountName: "Account test",
        AccountNumber: "12332",
        ExpirationMonth: "11",
        ExpirationYear: "2009",
        CVVCode: "123",
        RoutingNumber: "123",
        FinancialInstituteName: "Ins Name",
        AbaNumber: "123",
        Order: 1,
        EffectiveDate: null,
        TerminationDate: null,
        FundingSource: null,
        PlanYearType: null,
        FundingAmount: null,
        DraftDay: null,
        UseForPremiumPayment: null,
        UseForClaimPayment: null,
        PrepaymentRecognition: null,
        IsPrimary: false,
        showf1 : "0"
    },
    {
        Id: 2,
        AccountType: {Text:"Visa"},
        AccountName: "Acc test 2",
        AccountNumber: "12332",
        ExpirationMonth: "11",
        ExpirationYear: "09",
        CVVCode: "123",
        RoutingNumber: "123",
        FinancialInstituteName: "Ins Name",
        AbaNumber: "123",
        Order: "1",
        EffectiveDate:null,
        TerminationDate: null,
        FundingSource: null,
        PlanYearType: null,
        FundingAmount: null,
        DraftDay: null,
        UseForPremiumPayment: null,
        UseForClaimPayment: null,
        PrepaymentRecognition: null,
        IsPrimary: false,
        showf1: "0"
    }];
    $scope.orderdisabled = false;
    //$scope.accounttypes = ["Visa", "Amex"];
    //$scope.fundingsources = ["Fund 1", "Fund 2"];
    //$scope.planyeartypes = ["PlanType1", "PlanType2"];
    $scope.CreditCard = ["123", "1233"];
    $scope.showcardform = 0;
    $scope.cont = {};
    $ionicLoading.hide();
    $scope.isScan = false;



    $('#cardformatcheck').mask("999999999", { placeholder: "_________" });
    $("#abalength").mask("999999999", { placeholder: "_________" });



    if (!$scope.paymentmethod.isediting || $scope.paymentmethod.isediting == "undefined")
        $('#cardformat').mask("9999-999999-99999");

    $("#cvvpswd").mask("9999", { placeholder: "...." });


    //Valores de retorno
    var cardIOResponseFields = [
         "card_type",
         "redacted_card_number",
         "card_number",
         "expiry_month",
         "expiry_year",
         "cvv",
         "zip"
    ];

    $scope.ScannCard = function () {
        //Metodo para scannear tarjeta
        CardIO.scan({
            "expiry": true,
            "cvv": true,
            "zip": false,
            "suppressManual": false,
            "suppressConfirm": false,
            "hideLogo": false
        },
       onCardIOComplete,
       onCardIOCancel
      )
    }
    $scope.CreditCard = [];

    //Metodo que se pasa como parametro en CardIO
    var onCardIOComplete = function (res) {
        for (var i = 0, len = cardIOResponseFields.length; i < len; i++) {
            var field = cardIOResponseFields[i];
            //alert(field + ": " + res[field]);
        }

        $scope.CreditCard = res;
        $scope.isScan = true;
        $('[name=SelectAccount] option[value=' + $scope.CreditCard["card_type"] + ']').prop('selected', true);

        if ($scope.CreditCard["card_type"] == "AmericanExpress") {
            $scope.paymentmethod.AccountType.Value = "Amex";
        }
        else
            $scope.paymentmethod.AccountType.Value = $scope.CreditCard["card_type"];



        $scope.chooseForm();

    };

    //Metodo que se pasa como parametro en CardIO
    var onCardIOCancel = function () {
        alert("card.io scan cancelled");
    };


    $scope.maskCreditCard = "9999-999999-99999";
    if ($scope.paymentmethod.AccountType != null) {

        if ($scope.paymentmethod.AccountType.Value == "Amex" ||
                $scope.paymentmethod.AccountType.Value == "Discover" ||
                $scope.paymentmethod.AccountType.Value == "Visa" ||
                $scope.paymentmethod.AccountType.Value == "MasterCard"
                ) {

            $scope.showcardform = 0;


            if ($scope.paymentmethod.AccountType.Value == "Discover" ||
               $scope.paymentmethod.AccountType.Value == "Visa" ||
               $scope.paymentmethod.AccountType.Value == "MasterCard") {

                $scope.maskCreditCard = "9999-9999-9999-9999";
                $("#cvvpswd").mask("999", { placeholder: "..." });
            }


            else if ($scope.paymentmethod.AccountType.Value == "Amex") {
                $scope.maskCreditCard = "9999-999999-99999";
                $("#cvvpswd").mask("9999", { placeholder: "...." });
            }
        }

        else if ($scope.paymentmethod.AccountType.Value == "Checking" ||
                $scope.paymentmethod.AccountType.Value == "Saving"
        ) {
            $scope.maskCreditCard = "999999999";
            $scope.showcardform = 1;

        }

        else if ($scope.paymentmethod.AccountType.Value == "Manual")
            $scope.showcardform = 2;



        if ($scope.paymentmethod.isediting || $scope.isScan) {
            $("#cardformat").focus();
            $timeout(function () {

                $scope.$apply(function () {

                    $("#cardformat").mask($scope.maskCreditCard);
                });

            }, 0);
        }

        $scope.paymentmethod.showf1 = $scope.showcardform;



    }


    if ($scope.paymentmethodlist.length == 0) {
        $scope.paymentmethod.Order = 0;
        $scope.paymentmethod.IsPrimary = true;
        $scope.showchecking = false;
    }

    else if ($scope.paymentmethodlist.length == 1 && $scope.paymentmethod.isediting || $scope.paymentmethod.IsPrimary) {
        $scope.showchecking = false;
    }


    else {
        $scope.showchecking = true;

        if ($scope.paymentmethod.IsPrimary) {
            $scope.paymentmethod.Order = 0;
            $scope.orderdisabled = true;
        }

        else {
            $scope.orderdisabled = false;
        }
    }


    $scope.getpaymentlist = function () {


        $ionicLoading.show({ template: 'Loading...' });

        angular.forEach($scope.paymentmethodlist, function (value) {
            if (value.AccountType.Value == "Checking" ||
                value.AccountType.Value == "Saving"
            ) {
                value.showf1 = 0;
                value.HideAccountNumber = "....." + value.AccountNumber.toString()
               .substr(value.AccountNumber.toString().length - 4, 4);
            }

            else if (value.AccountType.Value == "MasterCard" ||
                     value.AccountType.Value == "Visa" ||
                     value.AccountType.Value == "Discover"
            ) {

                value.showf1 = 0;
                value.HideAccountNumber = ".... .... .... " + value.AccountNumber.toString()
               .substr(value.AccountNumber.toString().length - 4, 4);

            }

            else if (value.AccountType.Value == "Amex") {

                value.showf1 = 0;
                value.HideAccountNumber = ".... ...... " + value.AccountNumber.toString()
                .substr(value.AccountNumber.toString().length - 5, 5);
            }

            else
                value.showf1 = 0;



            if (value.AccountType.Value != "Manual" &&
               value.AccountType.Value != "Checking" &&
               value.AccountType.Value != "Saving") {

                value.ExpirationYear = value.ExpirationYear.toString();
                value.ExpirationMonth = value.ExpirationMonth.toString();

            }

            if (value.AccountType.Value != "Manual") {

                value.EffectiveDate = new Date(value.EffectiveDate);
                value.TerminationDate = new Date(value.TerminationDate);
                value.DraftDay = value.DraftDay != null ? value.DraftDay.toString() : null;
            }


        }, $scope.paymentmethodlist);

        $ionicLoading.hide();


        $scope.paymentmethod.onform = false;
    };


    if (!$scope.paymentmethod.onform) {
        $scope.getpaymentlist();
    }


    $scope.save = function () {

        $ionicLoading.show({ template: 'Loading...' });
        $scope.processing = true;

        $timeout(function () {
            $scope.processing = false;

            var isprimary = $scope.paymentmethod.IsPrimary;

            if (isprimary) {

                angular.forEach(settings.PaymentMethodList, function (value) {

                    value.IsPrimary = false;

                    if (value.Order == 0)
                        value.Order = 1;


                }, $scope.paymentmethodlist);


                $scope.paymentmethod.IsPrimary = true;
                $scope.paymentmethod.Order = 0;
            }

            else {

                $scope.numberPrimaries = $filter('filter')($scope.paymentmethodlist, { IsPrimary: true }).length;

                if ($scope.numberPrimaries == 0)
                    $scope.paymentmethodlist[0].IsPrimary = true;
            }


            //$http.post(settings.ServiceURL + '/AddPayment', {
            //    Id: $scope.paymentmethod.Id,
            //    AccountType: $scope.paymentmethod.AccountType,
            //    AccountName: $scope.paymentmethod.AccountName,
            //    AccountNumber: $scope.paymentmethod.AccountNumber,
            //    ExpirationMonth: $scope.paymentmethod.ExpirationMonth,
            //    ExpirationYear: $scope.paymentmethod.ExpirationYear,
            //    CVVCode: $scope.paymentmethod.CVVCode,
            //    RoutingNumber: $scope.paymentmethod.RoutingNumber,
            //    FinancialInstituteName: $scope.paymentmethod.FinancialInstituteName,
            //    AbaNumber: $scope.paymentmethod.AbaNumber,
            //    Order: $scope.paymentmethod.Order,
            //    EffectiveDate: $scope.paymentmethod.EffectiveDate,
            //    TerminationDate: $scope.paymentmethod.TerminationDate,
            //    FundingSource: $scope.paymentmethod.FundingSource,
            //    PlanYearType: $scope.paymentmethod.PlanYearType,
            //    FundingAmount: $scope.paymentmethod.FundingAmount,
            //    DraftDay: $scope.paymentmethod.DraftDay,
            //    UseForPremiumPayment: $scope.paymentmethod.UseForPremiumPayment,
            //    UseForClaimPayment: $scope.paymentmethod.UseForClaimPayment,
            //    PrepaymentRecognition: $scope.paymentmethod.PrepaymentRecognition,
            //    IsPrimary: $scope.paymentmethod.IsPrimary,
            //    MemberID: settings.MemberID
            //})

            //    .success(function (data) {

            //        if (data.Success)
            //            $scope.getpaymentlist();

            //        else {
            //            $ionicLoading.hide();
            //            $scope.errors = data.Errors;
            //        }

            //    })

            //    .error(function (data, status) {
            //        alert('error');
            //    })


            if (!$scope.paymentmethod.isediting)
                $scope.paymentmethodlist.push($scope.paymentmethod);


            $ionicLoading.hide();
            $ionicHistory.clearCache();
            $state.go("app.paymentInfoData");
            $scope.paymentmethod = {};
            settings.PaymentMethod = {};

        }, 2000);
    };


    $scope.chooseForm = function () {

        $scope.paymentmethod.AccountNumber = null;


        if ($scope.paymentmethod.AccountType.Value == "Amex" ||
            $scope.paymentmethod.AccountType.Value == "Discover" ||
            $scope.paymentmethod.AccountType.Value == "Visa" ||
            $scope.paymentmethod.AccountType.Value == "MasterCard"
            ) {
            $scope.showcardform = 0;

            if ($scope.isScan) {

                $scope.paymentmethod.AccountNumber = $scope.CreditCard["card_number"];
                $scope.paymentmethod.ExpirationMonth = $scope.CreditCard["expiry_month"].toString();
                $scope.paymentmethod.ExpirationYear = $scope.CreditCard["expiry_year"].toString();
                $scope.paymentmethod.CVVCode = $scope.CreditCard["cvv"];

                $scope.isScan = false;
                $scope.$apply();
            }

            if ($scope.paymentmethod.AccountType.Value == "Amex") {

                $('#cardformat').mask("9999-999999-99999");
                $("#cvvpswd").mask("9999", { placeholder: "...." });
            }

            else {

                $('#cardformat').mask("9999-9999-9999-9999");
                $("#cvvpswd").mask("999", { placeholder: "..." });
            }


            $('#cardformat').blur();
            $('#cardformat').focus();


        }

        else if ($scope.paymentmethod.AccountType.Value == "Checking" ||
                $scope.paymentmethod.AccountType.Value == "Saving"
                ) {

            $scope.showcardform = 1;

            $('#cardformatcheck').mask("999999999", { placeholder: "_________" });
        }

        else if ($scope.paymentmethod.AccountType.Value == "Manual")
            $scope.showcardform = 2;


        $scope.paymentmethod.showf1 = $scope.showcardform;
    };


    $scope.addPaymentMethod = function () {

        if ($scope.paymentmethodlist.length == 0) {
            $("#primary").prop("checked", true);
            $("#primarychecked").prop("checked", true);
        }

        else {
            $('#primary').prop("checked", false);
            $('#primarychecked').prop("checked", false);
        }

        settings.PaymentMethod = {};
        $scope.paymentmethod = {};


        var maxValueOrder = Math.max.apply(Math, $scope.paymentmethodlist.map(function (o) { return o.Order; }))

        settings.PaymentMethod.Order = maxValueOrder + 1;

        $scope.paymentmethod = settings.PaymentMethod;

        $scope.paymentmethod.AccountType = {};
        $scope.paymentmethod.AccountType.Value = "Amex";

        $scope.paymentmethod.onform = true;

        $ionicHistory.clearCache();

        $state.go("app.paymentInfoform1");
    };


    $scope.setprimary = function (id) {

        //var item = $scope.paymentmethodlist[id];

        //dataFactory.updateAccount(id)
        // .then(function (response) {
        //     $scope.getpaymentlist();
        // });
    }

    $scope.deleteaccount = function (id) {

        //var confirmPopup = $ionicPopup.show({
        //    template: '<p class="text-center fontBold" style="font-size:16px; margin-top: -10px;"> Are you sure you want to delete account?</p>',
        //    title: '<p class="fontBlack">DELETE ACCOUNT</p>',
        //    buttons: [
        //      {
        //          text: 'OK',
        //          type: 'blueController',
        //          onTap: function (e) {
        //              return true;
        //          }
        //      },
        //      {
        //          text: "Cancel",
        //          type: "button-default",
        //          onTap: function (e) {
        //              return false;
        //          }
        //      },
        //    ]
        //});

        //confirmPopup.then(function (res) {
        //    if (res) {

        //        dataFactory.deleteAccount(id)
        //       .then(function (response) {
        //           $scope.status = 'Deleted Customer! Refreshing customer list.';
        //           $scope.paymentmethodlist.splice(id, 1);
        //           $scope.getpaymentlist();
        //       }, function (error) {
        //           $scope.status = 'Unable to delete customer: ' + error.message;
        //       });


        //        if ($scope.paymentmethodlist.length == 1) {
        //            $scope.paymentmethodlist[0].IsPrimary = true;
        //        }

        //        var numberPrimaries = $filter('filter')($scope.paymentmethodlist, { IsPrimary: true }).length;

        //        if (numberPrimaries == 0 && $scope.paymentmethodlist.length > 0) {
        //            $scope.paymentmethodlist[0].IsPrimary = true;
        //        }
        //    }
        //});

    };

    $scope.editaccount = function (id) {

        var posid = $scope.paymentmethodlist.map(function (o) { return o.Id; }).indexOf(id);
        settings.PaymentMethod = $scope.paymentmethodlist[posid];

        $scope.paymentmethod = settings.PaymentMethod;

        $scope.paymentmethod.isediting = true;
        $scope.paymentmethod.onform = true;

        if ($scope.paymentmethod.IsPrimary) {
            $scope.showchecking = false;
        }


        $state.go("app.paymentInfoform1");
    }

    $scope.changeChecked = function (id) {

        if ($scope.accounttypes.Value == "Amex" ||
           $scope.accounttypes.Value == "Discover" ||
           $scope.accounttypes.Value == "MasterCard" ||
           $scope.accounttypes.Value == "Visa"
        )
            $scope.showcardform = 0;

        else if ($scope.accounttypes.Value == "Checking" ||
                $scope.accounttypes.Value == "Saving"
        )
            $scope.showcardform = 1;

        else if ($scope.accounttypes.Value == "Manual")
            $scope.showcardform = 2;


        if ($scope.paymentmethod.IsPrimary) {
            $scope.paymentmethod.Order = 0;
        }

        else {


            if ($scope.paymentmethod.isediting) {
                var posid = $scope.paymentmethodlist.map(function (o) { return o.Id; }).indexOf(id);
                var originalValue = $scope.paymentmethodlist[posid].Order;
                $scope.paymentmethod.Order = originalValue;
            }

            else {
                var maxValueOrder = Math.max.apply(Math, $scope.paymentmethodlist.map(function (o) { return o.Order; }));
                $scope.paymentmethod.Order = maxValueOrder + 1;
            }
        }
    };

    $scope.getAccountTypes = function () {

        $scope.cont.number = 1;

        $scope.accounttypes.push({
            Key: "AccountTypes",
            Text: "Checking Account",
            Value: "Checking"
        });

        $scope.accounttypes.push({
            Key: "AccountTypes",
            Text: "American Express Card",
            Value: "Amex"
        });

        /************************************/
        $scope.planyeartypes.push({
            Key: "PlanYearType",
            Text: "Plan Year Based upon Group Funding Eff Date",
            Value: "3"
        });

        $scope.planyeartypes.push({
            Key: "PlanYearType",
            Text: "Calendar Plan Year",
            Value: "2"
        });
        /************************************/
        $scope.fundingsources.push({
            Key: "FundingSource",
            Text: "Credit Card Account for Premium",
            Value: "CC"
        });

        $scope.fundingsources.push({
            Key: "FundingSource",
            Text: "ACH Account for Premium",
            Value: "ACH"
        });
    };


    $scope.clickCards = function () {

        $("#formcard").submit();
    }


    $scope.clickFormChecking = function () {

        $("#formcheck").submit();
    }

    $scope.clickManualCheck = function () {

        $("#formmanualcheck").submit();
    }

    $scope.onForm = function () {

        $scope.paymentmethod.onform = false;
        $scope.getpaymentlist();
        $ionicHistory.goBack();
    }

});




