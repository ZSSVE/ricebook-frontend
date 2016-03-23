;(function () {

    angular.module('riceBookApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['api', 'UserService', '$location'];
    function LoginCtrl(api, UserService, $location) {

        var vm = this;

        // Model variables.
        vm.loggedIn = false;
        vm.login = login;
        vm.logout = logout;
        vm.loginMsg = "";
        vm.username = null;
        vm.password = null;

        vm.registerUsername = "";
        vm.registerEmail = "";
        vm.registerPassword = "";
        vm.registerPasswordConfirm = "";
        vm.registerZipcode = "";

        vm.usernameMsg = "";
        vm.emailMsg = "";
        vm.zipcodeMsg = "";
        vm.passwordMsg = "";
        vm.registerMsg = "";

        vm.validateUsername = validateUsername;
        vm.validateEmail = validateEmail;
        vm.validateZipcode = validateZipcode;
        vm.validatePassword = validatePassword;

        vm.register = register;

        // Functions.
        function login() {
            if (checkLogin()) {
                vm.loginMsg = "";

                api.login({'username': vm.username, 'password': vm.password})
                    .$promise.then(function (result) {
                    // Grab the username from the server put it into the UserService singleton.
                    UserService.username = result.username;  // Use the login name from the server.
                    getAvatar();  // Change path in getAvatar().
                }, function () {
                    vm.loginMsg = "Invalid combination of username and" +
                        " password";
                });
            } else {
                vm.loginMsg = "Please enter your name and password.";
            }
        }

        function logout() {
            api.logout();
            vm.username = '';
            // Clear the UserService singleton's username value.
            UserService.username = null;
            UserService.avatar = null;
        }

        // Get the avatar of the current user from the server.
        //
        // The result is saved into the UserService.
        function getAvatar() {
            api.getAvatar({'user': vm.username}).$promise.then(function (result) {
                UserService.avatar = result.pictures[0].picture;
                $location.path('/main');
            }, function () {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        // Check if user has entered something for both the username and password.
        //
        // No serious validation is performed.
        function checkLogin() {
            return !(vm.username === null || vm.username === "" || vm.password === null || vm.password === "");
        }

        function register() {
            // Go around short-circuiting evaluation to inform user all
            // needed changes.
            var valid = true;
            valid = validateUsername() && valid;
            valid = validateEmail() && valid;
            valid = validateZipcode() && valid;
            valid = validatePassword() && valid;
            if (valid) {
                vm.registerMsg = "";
                api.register({
                        'username': vm.registerUsername,
                        'email': vm.registerEmail,
                        'zipcode': vm.registerZipcode,
                        'password': vm.registerPassword
                    })
                    .$promise.then(function (result) {
                    vm.registerMsg = result.result + "! Go log in!"
                }, function () {
                    vm.registerMsg = "Registeration failed"
                });
            } else {
                vm.registerMsg = ""
            }

        }

        function validateUsername() {

            var start = vm.registerUsername ? vm.registerUsername.charAt(0) : "";
            var letterNumber = /^[0-9a-zA-Z]+$/;
            var letter = /^[a-zA-Z]+$/;
            if (vm.registerUsername == "" || vm.registerUsername == null) {
                vm.usernameMsg = "Username is required";
                return false;
            } else if (!letterNumber.test(vm.registerUsername)) {
                vm.usernameMsg = "Only letters and numbers can be used.";
                return false;
            } else if (!letter.test(start)) {
                vm.usernameMsg = "Username has to start with a letter.";
                return false;
            } else {
                vm.usernameMsg = "";
                return true;
            }
        }

        function validateEmail() {
            // A regex able to match most e-mail addresses.
            var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (vm.registerEmail === "" || vm.registerEmail === null) {
                vm.emailMsg = "Invalid Email";
                return false;
            } else if (!re.test(vm.registerEmail)) {
                vm.emailMsg = "Invalid Email";
                return false;
            } else {
                vm.emailMsg = "";
                return true;
            }
        }

        function validateZipcode() {
            var reg = /^\d{5}$/;
            if (vm.registerZipcode == "" || vm.registerZipcode == null) {
                vm.zipcodeMsg = "Invalid zipcode (5 digits)";
                return false;
            } else if (!reg.test(vm.registerZipcode)) {
                vm.zipcodeMsg = "Invalid zipcode (5 digits)";
                return false;
            } else {
                vm.zipcodeMsg = "";
                return true;
            }
        }

        function validatePassword() {
            if (vm.registerPassword === "" || vm.registerPassword == null || vm.registerPasswordConfirm === "" || vm.registerPasswordConfirm == null) {
                vm.passwordMsg = "Password and confirmation is required";
                return false;
            } else if (vm.registerPassword !== vm.registerPasswordConfirm) {
                vm.passwordMsg = "Unmatched password";
                return false;
            } else {
                vm.passwordMsg = "";
                return true;
            }
        }
    }
})();
