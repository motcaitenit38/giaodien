(function () {
    'use strict';

    angular.module('app.theme')
        .controller('pageHeaderCtrl',
        ['utils', 'api', 'user',
            function (utils, api, user) {
                var vm = this;

                vm.submitRegister = () => {
                    let data = {
                        username: vm.register.username,
                        email: vm.register.email
                    }
                    vm.isRegistering = true;
                    api.register(data).then(result => {
                        vm.isRegistering = false;
                        vm.message = `Bạn đã đăng ký thành công.`;
                        $('#registerModal').modal('hide')
                        $('#showMessage').modal();
                    }, err => {
                        vm.isRegistering = false;
                        vm.message = `Tài khoản đã đăng ký.`;
                        $('#registerModal').modal('hide')
                        $('#showMessage').on('hidden.bs.modal', function (e) {
                            $('#registerModal').modal('show');
                            $('#showMessage').off('hidden.bs.modal');
                          })
                        $('#showMessage').modal();
                    })
                }

                vm.submitLogin = () => {
                    let data = {
                        email: vm.login.email,
                        pass: vm.login.password
                    }
                    vm.isLoggingIn = true;
                    api.login(data).then(result => {
                        vm.isLoggingIn = false;
                        vm.message = `Bạn đã đăng nhập thành công.`;
                        user.permission = result.quyen;
                        $('#loginModal').modal('hide')
                        $('#showMessage').modal();
                    }, err => {
                        vm.isLoggingIn = false;
                        vm.message = `Lỗi server.`;
                        $('#loginModal').modal('hide')
                        $('#showMessage').on('hidden.bs.modal', function (e) {
                            $('#loginModal').modal('show');
                            $('#showMessage').off('hidden.bs.modal');
                          })
                        $('#showMessage').modal();
                    })
                }

                vm.logout = () => {
                    api.logout().then(result => {
                        vm.message = `Bạn đã đăng xuất thành công.`;
                        $('#showMessage').modal();
                    }, err => {
                        vm.message = `Lỗi server.`;
                        $('#showMessage').modal();
                    })
                }

                vm.test = () => {
                    api.test().then(result => {
                        console.log(result);
                    }, err => {
                        console.log(err);
                    })
                }

                let init = () => {
                    
                }
                init();
            }
        ])
})();