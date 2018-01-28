angular.module('app').factory('utils',
    ['$uibModal', '$q', '$window', '$rootScope', 'config',
        function($uibModal, $q, $window, $rootScope, config) {
            var methods = {};
            let options = {
                animation: true,
                size: 'lg'
            }

            methods.showModal = (name, args, isLock=false, size='1200') => $uibModal.open({
                animation: options.animation,
                templateUrl: `components/modals/${name}.html`,
                controller: 'modalsCtrl',
                controllerAs: 'vm',
                size: size,
                backdrop: !isLock || 'static',
                keyboard: !isLock,
                resolve: {
                    args: args
                }
            });
            methods.showMessage = message => $uibModal.open({
                animation: options.animation,
                templateUrl: 'components/modals/messageView.html',
                controller: 'modalsCtrl',
                controllerAs: 'vm',
                size: options.size,
                resolve: {
                    args: function () {
                        return message || '';
                    }
                }
            });
            methods.showQuestion = message => $uibModal.open({
                animation: options.animation,
                templateUrl: 'components/modals/questionView.html',
                controller: 'modalsCtrl',
                controllerAs: 'vm',
                size: options.size,
                resolve: {
                    args: function () {
                        return message || ''
                    }
                }
            });
            methods.showApprovePartner = args => {
                return modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/modals/approvePartner.html',
                    controller: 'modalsCtrl as vm',
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        args: args
                    }
                });
            }
            
            return methods;
        }
    ]
)