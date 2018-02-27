angular.module('starter.controllers')
.provider('myFormatMask', function () {
    var self = this;
    self.formats = {};
    self.hide = {};

    self.hasFormat = function (format) {
        if (self.formats[format])
            return true;
        return false;
    };
    self.getFormat = function (format) {
        if (format === undefined || format == null || format == '')
            return null;
        if (self.hasFormat(format))
            format = self.formats[format];
        return format;
    };

    return {
        addFormat: function (name, format, hide, char) {
            self.formats[name] = format;
            self.hide[name] = {
                hide: hide === undefined ? null : hide,
                char: char === undefined ? '*' : char
            };
        },
        $get: function () {
            return {
                getFormat: function (format) {
                    return self.getFormat(format);
                },
                getFormatedValue: function (format, text) {
                    var f = self.getFormat(format);
                    var value = Inputmask.format(text, { mask: f });

                    if (self.hide[format] === undefined || self.hide[format].hide == null)
                        return value;
                    var res = '';
                    var count = self.hide[format].hide;
                    //alert(count);
                    for (var i = value.length - 1; i >= 0; i--) {
                        if (count > 0)
                            if (isNaN(value[i]))
                                res = value[i] + res;
                            else {
                                count--;
                                res = value[i] + res;
                            }
                        else {
                            if (isNaN(value[i]))
                                res = value[i] + res;
                            else
                                res = self.hide[format].char + res;
                        }
                    }
                    return res;
                }
            };
        }
    };
})
   .provider('myLang', function () {
       var self = this;
       self.default = '';

       var currentCulture = $("meta[name='accept-language']").prop("content");
       if (currentCulture) {
           self.default = currentCulture.substring(0, 2);
       }

       var langs = {
           '': {
               inputmask: 'yyyy-mm-dd',
               datepicker: 'yy-mm-dd',
               moment: 'YYYY-MM-DD'
           }
       };

       self.getRegion = function () {
           for (var key in langs) {
               if (key == self.default)
                   return key;
           }
           return '';
       };
       return {
           setDefault: function (region) {
               self.default = region;
           },
           addFormats: function (key, formats) {
               langs[key] = formats;
           },
           $get: function () {
               return langs[self.getRegion()];
           }
       };
   })