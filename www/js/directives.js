angular.module('starter.controllers')
    .directive('ngValidSubmit', ['$parse', function ($parse) {
        return {
            require: '^form',
            restrict: 'A',
            link: function (scope, element, attrs, form) {
				var self = {};
                form.$submitted = false;
                form.reset = function () {
                    form.$submitted = false;
                    element.removeClass('ng-submitted');
                    form.$setPristine();
                    form.$setUntouched();
                };
                var fn = $parse(attrs.ngValidSubmit);
                angular.element(element).bind("submit", function (event) {
					form.$setSubmitted();
                    if (form.$valid) {
						if (typeof fn === 'function') {
                            if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                                scope.$apply(function () {
                                    fn(scope, { $event: event });
                                });
                            } else {
                                fn(scope, { $event: event });
                            }
                        }
                    }
                });
                angular.element(element).bind("reset", function (event) {
                    form.reset();
                });
                self.items = [];
                $(element).find("input,select,textarea").each(function () {
                    var item = $(this);
                    var name = item.attr("data-name") || item.attr("name") || item.attr("ng-model");
                    if (name === undefined || item.data('$ngModelController') === undefined)
                        return;

                    self.items[name] = item;
                    var mc = item.data('$ngModelController');
                    item.change(function () {
                        if (item.prop("error")) {
                            scope.$apply(function () {
                                var valid = item.prop("errorValue") != item.val();
                                mc.$setValidity('server', valid);
                            });
                        }
                    });
                });
                scope.$watch("errors", function (newValue, oldValue) {
                    scope.errorsview = [];
                    if (!scope.errors)
                        return;
                    for (var name in self.items) {
                        var item = self.items[name];
                        var mc = item.data('$ngModelController');
                        if (item.prop("error", true)) {
                            mc.$setValidity('server', true);
                            item.prop("error", false);
                        }

                        if (scope.errors[name]) {
                            mc.$setValidity('server', false);
                            item.prop("error", true);
                            item.prop("errorValue", item.val());
                        }
                    }
                    for (var key in scope.errors) {
                        for (var e in scope.errors[key]) {
                            if (scope.errorsview.indexOf(scope.errors[key][e]) == -1)
                                scope.errorsview.push(scope.errors[key][e]);
                        }
                    }
                });
            }
        }
    }])
.directive('myBlock', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var params = { message: '<i ng-show="loading" class="fa fa-spinner fa-pulse fa-fw"></i> loading...' };
            if (attrs.myBlockParams)
                params = $parse(attrs.myBlockParams);

            if (typeof params === 'function')
                params = params();

            var fn = $parse(attrs.myBlock);

            scope.$watch(fn, function (value) {
                if (value)
                    $(element).block(params);
                else
                    $(element).unblock();
            });
        }
    };
}])
.directive('myDebug', ['$log', function ($log) {
    return {
        restrict: 'E',
        scope: {
            data: '=model'
        },
        template: function () {
            if ($log.isDebug())
                return '<div style="white-space: pre-wrap">{{ data | json }}</div>'
            return null;
        }
    };
}])
.directive('myMask', ['$parse', 'myFormatMask', '$log', function ($parse, myFormatMask, $log) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, controller) {
            // var self = this;
			var self = controller;
            if (!attrs.myMask)
                return;
            var mask = $parse(attrs.myMask);
            controller.$parsers.push(function (data) {
                // $log.debug(data + " fomrat: " + self.format);
                if (self.format != null) {
                    var value = Inputmask.unmask(data, { mask: self.format });
                    return value;
                }
                return data;
            });

            $(element).on('input propertychange paste', function () {
                controller.$setViewValue($(element).val());
                controller.$render();
                scope.$apply();
            });

            scope.$watch(mask, function (value) {
				// $log.debug('llego:' + value + ' '+ self.format);
                self.format = myFormatMask.getFormat(value);
                if (self.format == null) {
                    $(element).inputmask('remove');
                }
                else
                    $(element).inputmask({ mask: self.format });
            });
        }
    };
}])
;
