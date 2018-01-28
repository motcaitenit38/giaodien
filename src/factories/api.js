angular.module('app').factory('api',
    ['config', 'request', '$state',
        function (config, request, $state) {
            var api = {
                register: 'Registration/regis',
                login: 'LoginEmploer/login',
                test: 'LoginEmploer/test',
                logout: 'Logout'
            };
            var methods = {};
            angular.forEach(api, function (value, key) {
                this[key] = function (data = {}) {
                    var url = config.HOST + value;
                    return request.post(url, data);
                }
            }, methods)

            return methods;
        }
    ])