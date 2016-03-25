;(function () {
    angular.module('riceBookApp')
        .controller('MainPageCtrl', MainPageCtrl);

    MainPageCtrl.$inject = ['api', '$location', 'UserService'];
    function MainPageCtrl(api, $location, UserService) {
        var vm = this;
        vm.logout = logout;

        function logout() {
            api.logout();
            // Clear the UserService singleton's username value and avatar.
            UserService.username = null;
            UserService.avatar = null;
            $location.path('/');
        }
    }
})();