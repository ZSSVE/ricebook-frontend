describe('Shared resource controller', function () {
    var helper = testHelper;
    var ctrl;

    beforeEach(module('riceBookApp'));

    beforeEach(module(function ($provide) {
        $provide.value('api', helper.mockApiService);
    }));

    beforeEach(inject(function ($controller, $rootScope, $q, api) {
        helper.init($q);
        ctrl = $controller('LoginCtrl', {
            'api': api
        });
        ctrl._resolveTestPromises = function () {
            helper.resolveTestPromises($rootScope);
        };
        ctrl._resolveTestPromises();
    }));

    it('can login and register the username', inject(function (UserService) {
        // Log in.
        var user = "Test";
        ctrl.username = user;
        ctrl.login();
        ctrl._resolveTestPromises();
        // Verify UserService has username
        expect(UserService.username).toBe(user);
    }));

    it('does not let user try to login without a username', inject(function (UserService) {
        // log in.
        ctrl.login();
        ctrl._resolveTestPromises();
        // verify UserService does not have username.
        expect(UserService.username).toBe(null);
        expect(ctrl.msg).toBe("Please enter your name and password.");
    }));

    it('shares the username between controllers', inject(function ($controller, UserService) {
        var user = "Test";
        ctrl.username = user;
        ctrl.login();
        ctrl._resolveTestPromises();
        var StatusCtrl = $controller('StatusCtrl', {UserService});
        var PostCtrl = $controller('PostCtrl', {UserService});
        expect(StatusCtrl.getUsername()).toBe(user);
        expect(PostCtrl.getUsername()).toBe(user);
    }));
});