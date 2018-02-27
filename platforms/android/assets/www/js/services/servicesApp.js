angular.module("starter")
    .factory("services", function ($http, settings) {
        return {
            setLogin: function (email, password) {
                return $http.post(settings.ServiceURL + '/Login', {
                    Email: email,
                    Password: password
                }).then(function (response) {
                    return response.data;
                })
            },

            getIDPMember: function (id) {
                return $http.get(settings.ServiceURL + '/IsMemberIDP?memberID=' + id)
                            .then(function (response) {
                                return response.data;
                            })
            },
            setValidationMemberRegistration: function (memberkey, dateofbirth, ssn) {
                if (!memberkey)
                    memberkey = null
                if (!dateofbirth)
                    dateofbirth = null
                if (!ssn)
                    ssn = null
                return $http.post(settings.ServiceURL + '/ValidateMemberRegistration', {
                    MemberKey: memberkey,
                    DateOfBirth: dateofbirth,
                    SSN: ssn,
                }).then(function (response) {
                    return response.data;
                });
            },
            getIsMemberConfigurated: function (groupkey, memberid) {
                return $http.get(settings.ServiceURL + '/IsConfigurated?GroupKey=' + groupkey + '&MemberId=' + memberid)
                        .then(function (response) {
                            return response.data;
                        })
            },
            setCreateAccountEmail: function (memberid, email) {
                return $http.get(settings.ServiceURL + '/CreateAccountEmail?memberID=' + memberid + '&email=' + email)
                        .then(function (responnse) {
                            return responnse.data;
                        })
            },
            getCheckGroupKey: function (codegroup) {
                return $http.get(settings.ServiceURL + '/CheckGroupKey?codeGroup=' + codegroup)
                        .then(function (response) {
                            return response.data;
                        })
            },
            getGroupEnrollment: function (ssn, firstname, lastname, dateofbirth, groupkey) {
                return $http.post(settings.ServiceURL + '/GroupEnrollment?token=1234', {
                    SSN: ssn,
                    FirstName: firstname,
                    LastName: lastname,
                    DateOfBirth: dateofbirth,
                    GroupKey: groupkey
                }).then(function (response) {
                    return response.data;
                })
            },
            getAvailablesPlans: function (groupkey, memberid) {
                return $http.get(settings.ServiceURL + '/AvailablesPlans?GroupKey=' + groupkey + '&MemberId=' + memberid)
                .then(function (response) {
                    return response.data;
                })
            },
            getDependentsByMember: function (memberid, groupid, dependents) {
                return $http.post(settings.ServiceURL + '/GetDependentsByMember?MemberId=' + memberid + '&GroupId=' + groupid, dependents)
                .then(function (response) {
                    return response.data;
                });
            },
            getRelations: function () {
                return $http.get(settings.ServiceURL + '/GetRelations')
                        .then(function (response) {
                            return response.data;
                        })
            },
            setFilterDependents: function (dependents) {
                return $http.post(settings.ServiceURL + '/FilterDependents', dependents)
                        .then(function (response) {
                            return response.data;
                        })
            },
            setAddPlansToMembers: function (plans) {
                return $http.post(settings.ServiceURL + '/AddPlansToMembers', plans)
                        .then(function (response) {
                            return response.data;
                        })
            },
            getPlanNameListByMember: function (id) {
                if (!id)
                    id = null;
                return $http.post(settings.ServiceURL + '/PlanNameListByMember?MemberId=' + id)
                    .then(function (response) {
                        return response.data;
                    });
            },
            getDependentListByMemberId: function (memberID, network, groupId) {
                if (!memberID)
                    memberID = null;
                if (!network)
                    network = null;
                if (!groupId)
                    groupId = null;
                return $http.post(settings.ServiceURL + '/DependentListByMemberId?MemberId=' + memberID + '&LineOfBusiness=' + network + '&GroupId=' + groupId)
                    .then(function (response) {
                        return response.data;
                    });
            },
            getPlanAvailable: function (id) {
                if (!id)
                    id = null;
                return $http.post(settings.ServiceURL + '/PlanAvailable?PlanId=' + id)
                    .then(function (response) {
                        return response.data;
                    });
            },
            getClaimHistoryInfo: function (id, orderby) {
                if (!id)
                    id = null;
                return $http.post(settings.ServiceURL + '/ClaimHistoryInfo?memberid=' + id + '&orderby=' + orderby)
                    .then(function (response) {
                        return response.data;
                    });
            },
            getIDCards: function (id) {
                if (!id)
                    id = null;
                return $http.post(settings.ServiceURL + '/IDCards?memberid=' + id)
                    .then(function (response) {
                        return response.data;
                    });
            },
            getPlanAvailable: function (id) {
                if (!id)
                    id = null;
                return $http.post(settings.ServiceURL + '/PlanAvailable?PlanId=' + id)
                    .then(function (response) {
                        return response.data;
                    });
            },
            getPersonalInfo: function (id) {
                if (!id)
                    id = null;
                return $http.post(settings.ServiceURL + '/GetPersonalInfo?personID=' + id)
                    .then(function (response) {
                        return response.data;
                    });
            },
            setEditPersonalInfo: function (token, personalInfo) {
                if (!personalInfo)
                    personalInfo = null;
                return $http.post(settings.ServiceURL + '/EditPersonalInfo?' + token, personalInfo)
                    .then(function (response) {
                        return response.data;
                    });
            },
            getStatesItems: function () {
                return $http.get(settings.ServiceURL + '/GetStatesItems')
                .then(function (response) {
                    return response.data;
                });
            },
            getAffiliations: function () {
                return $http.get(settings.ServiceURL + '/GetAffiliations')
                    .then(function (response) {
                        return response.data;
                    });
            },

            getCitiesByState: function (state) {
                return $http.get(settings.ServiceURL + '/GetCitiesByState?state=' + state)
                    .then(function (response) {
                        return response.data;
                    });
            },
            getSpecialities: function () {
                return $http.post(settings.ServiceURL + '/GetSpecialities')
                    .then(function (response) {
                        return response.data;
                    });
            },
            getProvidersFilter: function (zc, s, ln, a, c, st, d, lat, lng) {
                if (!zc)
                    zc = null;
                if (!s)
                    s = null;
                if (!ln)
                    ln = null;
                if (!a)
                    a = null;
                if (!c)
                    c = undefined;
                if (!st)
                    st = undefined;
                if (!d)
                    d = 0;
                if (!lat)
                    lat = 0.0;
                if (!lng)
                    lng = 0.0;
                return $http.get(settings.ServiceURL + '/ProvidersFilter?zipcode=' + zc + '&speciality=' + s +
                '&lastname=' + ln + '&Affiliation=' + a + '&city=undefined&state='+ st + '&DistanceMax=' + d +
                '&latitude=' + lat + '&longitude=' + lng)
                    .then(function (response) {
                        return response.data;
                    });
            },
          
            PlanNameList: function (plantype, groupid) {

                if (!plantype)
                    plantype = undefined;

                if (!groupid)
                    groupid = undefined;

                return $http.post(settings.ServiceURL + '/PlanNameList?PlanType=' + plantype + '&GroupId=' + groupid)
                    .then(function (response) {
                        return response.data;
                    })
            },

            PlanAvailable: function (planid) {

                if (!planid)
                    planid = undefined;

                return $http.post(settings.ServiceURL + '/PlanAvailable?PlanId=' + planid)
                    .then(function (response) {
                        return response.data;
                    })
            },

            Planrates: function (planid, groupkey) {

                if (!planid)
                    planid = undefined;

                if (!groupkey)
                    groupkey = undefined;

                return $http.post(settings.ServiceURL + '/PlanRates?PlanId=' + planid +
                  '&GroupKey=' + groupkey)
                    .then(function (response) {
                        return response.data;
                    })
            }   


            

         
        }
    });