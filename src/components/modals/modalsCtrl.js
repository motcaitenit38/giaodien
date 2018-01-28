angular.module('app').controller('modalsCtrl', 
['args', '$uibModalInstance', '$rootScope', '$state',
    function(args, $uibModalInstance, $rootScope, $state) {
        var vm = this;
        vm.args = args;

        vm.ok = function () {
            $uibModalInstance.close(vm.args);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss(vm.args);
        };

        vm.print = function() {
            window.print();
        }
    }
])