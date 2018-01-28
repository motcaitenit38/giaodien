angular.module('app.pages')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('root', {
            abstract: true,
            templateUrl: './pages/root/root.html',
            controller: 'rootCtrl as root'
        })
        $urlRouterProvider.otherwise('/home');
    }])
    .controller('rootCtrl',
['user', '$rootScope',
    function(user, $rootScope) {
        $rootScope.$_USER = user;
    }
])