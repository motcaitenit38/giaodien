angular.module('app.pages')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('root.home', {
            url: '/home',
            templateUrl: './pages/root/home/home.html',
            controller: 'homeCtrl as vm'
        })
        $urlRouterProvider.otherwise('/home')
    }])
    .controller('homeCtrl',
['api',
    function(api) {
        var vm = this;
        vm.register = () => {
            let data = {
                username: vm.username,
                email: vm.email
            };
            api.registration(data).then(result => {
                console.log('thanh cong');
            }, err => {
                console.log('ton tai');
            })
        }
    }
])