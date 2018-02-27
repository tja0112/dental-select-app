angular.module('ionic.utils', [])
.factory("settings", [function () {
    return {
        //ServiceURL: 'http://portal-uat.dentalselect.com/mobile/api',
        //ServiceURL: 'http://ds-uat-03.azurewebsites.net/mobile/api',
       // ServiceURL: 'http://localhost:11254/api',
        Token: null,
        GroupKey: null,
        LastName: null,
        OldDependents: [],
        PersonInfoID: null,
        Mail: null,
        MemberID: null,
        IsIDP:null,
        LOBs: [
            { Name: 'Dental', ImageName: 'DENTAL PLAN', Enabled: true, Waived: false, Checked: false, IsSelected: false, Caption: 'DENTAL PLANS', Url: '../img/chooseaplan-top.jpg', Order:0  },
            { Name: 'Vision', ImageName: 'VISION PLAN', Enabled: true, Waived: false, Checked: false, IsSelected: false, Caption: 'VISION PLANS', Url: '../img/chooseaplan-middle.jpg', Order:1 },
            { Name: 'AD&D', ImageName: 'AD&D PLAN',  Enabled: true, Waived: false, Checked: false, IsSelected: false, Caption: 'AD&D PLANS', Url: '../img/chooseaplan-bottom.jpg', Order:2 }
        ],
        SSN: null,
        PlanConfig: {
            EmployeeFirstName: null,
            EmployeeLastName:null,
            Type: null, 
            Dependents: [],
           // PlanName: null,
            Network: null,
            CoverageCode: null,
            Rate: null,
            Plan: null,
            From: null,
            IsEditing: false,
            IndexTemporary: null,
            GroupId: null,
            MemberId: null,
            ContractPlanId: null,
            PlanType:null
           
        },
        Plans: [],
        PlanType:null,
        PaymentMethod: {
            Id: null,
            AccountType: null,
            AccountName: null,
            AccountNumber: null,
            ExpirationMonth: null,
            ExpirationYear: null,
            CVVCode: null,
            RoutingNumber: null,
            FinancialInstituteName: null,
            AbaNumber: null,
            Order: null,
            EffectiveDate: null,
            TerminationDate: null,
            FundingSource: null,
            PlanYearType: null,
            FundingAmount: null,
            DraftDay: null,
            UseForPremiumPayment: null,
            UseForClaimPayment: null,
            PrepaymentRecognition: null,
            IsPrimary: false
        },

        PaymentMethodList: [],

        currentUserPersonID: null,

        isCleanningPaymentInfoList: false,
        ConfirmationMail: null
       
    }
}]);
