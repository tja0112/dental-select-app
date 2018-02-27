// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'ionic.utils'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    $ionicConfigProvider.views.swipeBackEnabled(false);

    $stateProvider

.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
})

.state('app.registration', {
    url: '/registration',
    views: {
        'menuContent': {
            templateUrl: 'templates/registration.html',
            controller: 'registrationCtrl'
        }
    }
})

.state('app.findProviderList', {
    url: '/findProviderList',
    params: {
        'ListProviders': null
    },
    views: {
        'menuContent': {
            templateUrl: 'templates/findProvider.html',
            controller: 'findProviderListCtrl'
        }
    }
})

.state('app.groupEnrollmentMain', {
    url: '/groupEnrollmentMain/:MemberId',
    params: {
        'MemberId': null
    },
    views: {
        'menuContent': {
            templateUrl: 'templates/groupEnrollmentImage.html',
            controller: 'groupEnrollmentMainCtrl'
        }
    }
})

.state('app.confirmation', {
    url: '/confirmation',
    views: {
        'menuContent': {
            templateUrl: 'templates/confirmation.html',
            controller: 'confirmationCtrl'
        }
    }
})

.state('app.groupEnrollmentInfo', {
    url: '/groupEnrollmentInfo',
    params: {
        'EmployeeFirstName': null,
        'EmployeeLastName': null,
        'GroupName': null,
        'DateOfBirth': null,
        'GroupKey': null,
        'SSN': null,
        'MemberId': null
    },
    views: {
        'menuContent': {
            templateUrl: 'templates/groupEnrollmentInfo.html',
            controller: 'groupEnrollmentInfoCtrl'
        }
    }
})

.state('app.started', {
    url: '/started',
    views: {
        'menuContent': {
            templateUrl: 'templates/started.html'
        }
    }
})

.state('app.idcards', {
    url: '/idcards',
    params: { 'memberid': null },
    views: {
        'menuContent': {
            templateUrl: 'templates/idcards.html',
            controller: 'idCardsCtrl'
        }
    }
})

.state('app.planOptions', {
    url: '/planOptions',
    params: { Rates: null },
    views: {
        'menuContent': {
            templateUrl: 'templates/planOptions.html',
            controller: 'planOptionsCtrl'
        }
    }
})

.state('app.planSummary', {
    url: '/planSummary',
    views: {
        'menuContent': {
            templateUrl: 'templates/planSummary.html',
            controller: 'planSummaryCtrl'
        }
    }
})

.state('app.groupEnrollmentRegistration', {
    url: '/groupEnrollmentRegistration',
    views: {
        'menuContent': {
            templateUrl: 'templates/groupEnrollmentRegistration.html'
        }
    }
})

.state('app.setUp', {
    url: '/setUp',
    params: {
        nextView: null,
        MemberId: null
    },

    views: {
        'menuContent': {
            templateUrl: 'templates/setUp.html',
            controller: 'setUpAccountCtrl'
        }
    }
})

.state('app.groupEnrollmentImage', {
    url: '/groupEnrollmentImage',
    views: {
        'menuContent': {
            templateUrl: 'templates/groupEnrollmentImage.html'
        }
    }
})

.state('app.groupEnrollment', {
    url: '/groupEnrollment',
    views: {
        'menuContent': {
            templateUrl: 'templates/groupEnrollment.html',
            controller: 'groupEnrollmentCtrl'
        }
    }
})

.state('app.littleInfo', {
    url: '/littleInfo',
    views: {
        'menuContent': {
            templateUrl: 'templates/littleInfo.html'
        }
    }
})

.state('app.login', {
    url: '/login',
    views: {
        'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl',
        }
    }
})

.state('app.memberInfo', {
    url: '/memberInfo',
    views: {
        'menuContent': {
            templateUrl: 'templates/memberInfo.html',
            controller: 'newMemberRegistrationInfoCtrl'
        }
    }
})

.state('app.memberInfoParam', {
    url: '/memberInfo',
    params: {
        "MemberKey": null,
        "DateOfBirth": null,
        "FirstName": null,
        "LastName": null
    },
    views: {
        'menuContent': {
            templateUrl: 'templates/memberInfo.html',
            controller: 'newMemberRegistrationInfoCtrl'
        }
    }
})


.state('app.waiveCoverage', {
    url: '/waiveCoverage',
    views: {
        'menuContent': {
            templateUrl: 'templates/waiveCoverage.html',
            controller: 'waiveCoverageCtrl'
        }
    }
})

.state('app.waiveCoverageConfirmation', {
    url: '/waiveCoverageConfirmation',
    views: {
        'menuContent': {
            templateUrl: 'templates/waiveCoverageConfirmation.html',
            controller: 'waiveCoverageCtrl'
        }
    }
})

.state('app.passivePPO', {
    url: '/passivePPO',
    views: {
        'menuContent': {
            templateUrl: 'templates/passivePPO.html',
            controller: 'passivePPOCtrl'
        }
    }
})

.state('app.revEnrollment', {
    url: '/revEnrollment',
    params: { 'CoverageCode': null },
    views: {
        'menuContent': {
            templateUrl: 'templates/revEnrollment.html',
            controller: 'revEnrollmentCtrl'
        }
    }
})

.state('app.finalReview', {
    url: '/finalReview',
    views: {
        'menuContent': {
            templateUrl: 'templates/finalReview.html',
            controller: 'finalReviewCtrl'
        }
    }
})

.state('app.claimHistory', {
    url: '/claimHistory',
    views: {
        'menuContent': {
            templateUrl: 'templates/claimHistory.html',
            controller: 'claimHistoryCtrl'
        }
    }
})

.state('app.chooseAPlanWaived', {
    url: '/chooseAPlanWaived',
    views: {
        'menuContent': {
            templateUrl: 'templates/chooseAPlanWaived.html',
            controller: 'chooseAPlanCtrl'
        }
    }
})

.state('app.findaprovider', {
    url: '/findaprovider',
    views: {
        'menuContent': {
            templateUrl: 'templates/findaprovider.html',
            controller: 'findProviderCtrl'
        }
    }
})

.state('app.revEnrollmentInfo', {
    url: '/revEnrollmentInfo',
    views: {
        'menuContent': {
            templateUrl: 'templates/revEnrollmentInfo.html'
        }
    }
})

.state('app.idpMemberPortal', {
    url: '/idpMemberPortal',
    views: {
        'menuContent': {
            templateUrl: 'templates/idpMemberPortal.html'
        }
    }
})

.state('app.memberportal', {
    url: '/memberportal',
    views: {
        'menuContent': {
            templateUrl: 'templates/memberportal.html',
            controller: 'memberPortalCtrl'
        }
    }
})

.state('app.availabledentalplans', {
    url: '/availabledentalplans',
    params: { 'Type': null },
    views: {
        'menuContent': {
            templateUrl: 'templates/availabledentalplans.html',
            controller: 'availableDentalCtrl'
        }
    }
})

.state('app.groupEnrollmentSN', {
    url: '/groupEnrollmentSN',
    params: { GroupKey: null },
    views: {
        'menuContent': {
            templateUrl: 'templates/groupEnrollmentSN.html',
            controller: 'groupEnrollmentSNCtrl'
        }
    }
})

.state('app.addDependents2', {
    url: '/addDependents2',
    views: {
        'menuContent': {
            templateUrl: 'templates/addDependents2.html',
            controller: 'addDependants'
        }
    }
})

.state('app.goupEnrollment', {
    url: '/goupEnrollment',
    views: {
        'menuContent': {
            templateUrl: 'templates/goupEnrollment.html'
        }
    }
})

.state('app.newMemberRegistration', {
    url: '/newMemberRegistration',
    views: {
        'menuContent': {
            templateUrl: 'templates/newMemberRegistration.html'
        }
    }
})

.state('app.claimDetail', {
    url: '/claimDetail',
    params: { 'Details': null },
    views: {
        'menuContent': {
            templateUrl: 'templates/claimDetail.html',
            controller: 'claimDetail'
        }
    }
})

.state('app.paymentInfo', {
    url: '/paymentInfo',
    params: {
        'AccountType': null,
        'AccountName': null,
        'AccountNumber': null,
        'ExpirationMonth': null,
        'ExpirationYear': null,
        'RoutingNumber': null,
        'FinancialInstituteName': null,
        'AbaNumber': null,
        'Order': null,
        'EffectiveDate': null,
        'TerminationDate': null,
        'FundingSource': null,
        'PlanYearType': null,
        'FundingAmount': null,
        'DraftDay': null,
        'UseForPremiumPayment': null,
        'UseForClaimPayment': null,
        'PrepaymentRecognition': null,
        'IsPrimary': null
    },
    views: {
        'menuContent': {
            templateUrl: 'templates/paymentInfo.html'
        }
    }
})

.state('app.paymentInfoform1', {
    url: '/paymentInfoform1',
    views: {
        'menuContent': {
            templateUrl: 'templates/paymentInfoform1.html',
            controller: 'paymentInfo'
        }
    }
})

.state('app.paymentInfoform2', {
    url: '/paymentInfoform2',
    views: {
        'menuContent': {
            templateUrl: 'templates/paymentInfoform2.html',
            controller: 'paymentInfo'
        }
    }
})

.state('app.paymentInfoData', {
    url: '/paymentInfoData',
    views: {
        'menuContent': {
            templateUrl: 'templates/paymentInfoData.html',
            controller: 'paymentInfo'
        }
    }
})

.state('app.personalInfo', {
    url: '/personalInfo',
    params: {
        'PersonalInfoID': null
    },
    views: {
        'menuContent': {
            templateUrl: 'templates/personalInfo.html',
            controller: 'personalInfo'
        }
    }
})

.state('app.editPersonalInfo', {
    url: '/editPersonalInfo',
    params: { PersonalInfo: null },
    views: {
        'menuContent': {
            templateUrl: 'templates/editPersonalInfo.html',
            controller: 'editPersonalInfo'
        }
    }
})

.state('app.settings', {
    url: '/settings',
    views: {
        'menuContent': {
            templateUrl: 'templates/settings.html',
            controller: 'settingsCtrl'
        }
    }
})

.state('app.scann', {
    url: '/scann',
    views: {
        'menuContent': {
            templateUrl: 'templates/scannTest.html',
            controller: 'scannTestCtrl'
        }
    }
})

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
})


.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.transformResponse.push(function (responseData) {
        var self = this;

        self.convertDateStringsToDates = function (input) {

            var regexIso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;
            //var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;

            // Ignore things that aren't objects.
            if (typeof input !== "object") return input;

            for (var key in input) {
                if (!input.hasOwnProperty(key)) continue;

                var value = input[key];
                var match;
                // Check for string properties which look like dates.
                if (typeof value === "string" && (match = value.match(regexIso8601))) {
                    var milliseconds = Date.parse(match[0])
                    if (!isNaN(milliseconds)) {
                        input[key] = new Date(milliseconds);
                    }
                } else if (typeof value === "object") {
                    // Recurse into object
                    self.convertDateStringsToDates(value);
                }
            }
        }

        self.convertDateStringsToDates(responseData);
        return responseData;
    });
}])
.config(["$provide", "$logProvider", function ($provide, $logProvider) {
    $provide.decorator('$log', ["$delegate", function ($delegate) {
        $delegate.alert = function (msg) {
            if ($logProvider.debugEnabled())
                alert(msg);
        };
        $delegate.isDebug = function () {
            return $logProvider.debugEnabled();
        };

        var debugFn = $delegate.debug;
        $delegate.debug = function () {
            var args = [].slice.call(arguments);
            debugFn.apply(null, args)
        };

        return $delegate;
    }]);
}])
   
.config(['myLangProvider', 'myFormatMaskProvider', function (myLangProvider, myFormatMaskProvider) {
    myLangProvider.addFormats('en',
        {
            inputmask: 'mm/dd/yyyy',
            datepicker: 'mm/dd/y',
            moment: 'MM/DD/YYYY'
        }
    );
    myLangProvider.addFormats('es',
        {
            inputmask: 'dd/mm/yyyy',
            datepicker: 'dd/mm/y',
            moment: 'DD/MM/YYYY'
        }
    );

    myFormatMaskProvider.addFormat('ssn', '999-99-9999');
    myFormatMaskProvider.addFormat('phone', '999-999-9999');
    myFormatMaskProvider.addFormat('amex', '9999-999999-99999');
    myFormatMaskProvider.addFormat('card', '9999-9999-9999-9999');
    myFormatMaskProvider.addFormat('aba', '9999-99999');
    myFormatMaskProvider.addFormat('ssn-hide', '999 99 9999', 4, '•');
    myFormatMaskProvider.addFormat('password', '••••••••••••••');
	// myFormatMaskProvider.addFormat('accountnumber', '999999999');
	
}])
;
