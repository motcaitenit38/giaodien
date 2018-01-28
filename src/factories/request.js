angular.module('app').factory('request',
    [
        '$http', '$q', '$state',
        function($http, $q, $state){
            var methods = {
                get: get,
                post: post
            };
            function post(url, data, header) {
                console.log(
`                --- POST REQUEST ---
                [URL]: ${url}`);
                console.log(data);
                console.log(
`                [HEADER]: ${header}
                ----------------------`);
                var _defer = $q.defer();
                var req = {
                    method: 'POST',
                    url: url,
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: data,
                    timeout: 30000
                    
                };
                if (header != null){
                    req.headers.Authorization = header;
                }
                let onSuccess = data => {
                    console.log(
`                    --- REQUEST SUCCESS ---
                    [URL]: ${url}`
                    );
                    console.log(data.data);
                    console.log(
`                    [HEADER]: ${header}
                    ----------------------`
                    );
                    if (data.data.err == 0) {
                        _defer.resolve(data.data);
                    }
                    else
                    {
                        _defer.reject(data.data);
                    }
                }
                let onError =  function(err){
                    console.log(
`                    --- REQUEST ERROR ---
                    [URL]: ${url}`
                    );
                    console.log(err);
                    console.log(
`                    [HEADER]: ${header}
                    ----------------------`
                    );
                    _defer.reject({
                        err: -1,
                        desc: `Cannot connect to server.`,
                        detail: err
                    });
                }
                
                $http(req).then(onSuccess, onError).catch(function(fallback) {
                    console.log(fallback);
                });
                return _defer.promise;
            }


            function get(url, header){
                var defer = $q.defer();
                var config = {
                    url: url,
                    method: 'GET',
                    timeout: 20000,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
                    }
                }
                if (header != null){
                    config.headers.Authorization ='Bearer ' + header;
                    config.headers.Accept= 'application/json';
                }
                $http(config).then(function (data) {
                    console.log('data:',data);
                    defer.resolve(data.data);
                    
                }, function(err){
                    $translate('CONNECTION_ERROR').then(function (translation) {
                    defer.resolve({
                        error: 404,
                        msg: translation
                    });
                    })
                });
                return defer.promise;
            }
            return methods;
        }
    ]
);