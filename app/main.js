(function () {

    angular.module('riceBookApp')
        .controller('MainPageCtrl', MainPageCtrl);

    MainPageCtrl.$inject = ['$http', 'api', '$location', 'UserService'];
    function MainPageCtrl($http, api, $location, UserService) {

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