angular.module('app').factory('config',
    [
        function () {
            function generateUUID() {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            };
            var config = {
                HOST: 'http://doantotnghiep.truong/',
                STATIC_HOST: 'http://statics.viecnhanhanh.vn/',
            }
            return config;
        }
    ])