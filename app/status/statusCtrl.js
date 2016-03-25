;(function () {

    angular.module('riceBookApp')
        .controller('StatusCtrl', StatusCtrl);

    StatusCtrl.$inject = ['api', 'UserService', '$location'];
    function StatusCtrl(api, UserService, $location) {

        var vm = this;
        vm.getUsername = getUsername;
        vm.setStatus = setStatus;
        vm.username = null;
        vm.status = getStatus();
        vm.avatar = null;
        vm.getStatus = getStatus;
        vm.newStatus = null;

        updateUserInfo();

        // Functions.

        // Get the username and avatar of the current logged-in-user from the server.
        //
        // The result is saved into the UserService.
        function updateUserInfo() {
            api.getAvatar().$promise.then(function (result) {
                UserService.avatar = result.pictures[0].picture;
                UserService.username = result.pictures[0].username;
                vm.username = getUsername();
                vm.avatar = getAvatar();
            }, function () {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        function getUsername() {
            //return the username from the UserService
            return UserService.username;
        }

        function getAvatar() {
            //return the avatar from the UserService
            return UserService.avatar;
        }

        function getStatus() {
            api.getStatus().$promise.then(function (result) {
                vm.status = result.statuses[0].status;
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        function setStatus() {
            api.setStatus({status: vm.newStatus}).$promise.then(function (result) {
                vm.status = result.status;
                vm.newStatus = null;
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }
    }
})();