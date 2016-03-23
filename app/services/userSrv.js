;(function () {
    angular.module('riceBookApp')
        .factory('UserService', UserService);

    function UserService() {
        // Use the UserService to share the username of the
        // logged in user between controller instances
        return {"username": null, "avatar": null};
    }
})();
