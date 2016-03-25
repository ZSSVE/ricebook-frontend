describe('The main page', function () {
    var helper = testHelper;
    var ctrl;

    beforeEach(module('riceBookApp'));

    beforeEach(module(function ($provide) {
        $provide.value('api', helper.mockApiService);
    }));

    beforeEach(inject(function ($controller, $rootScope, $q, api) {
        helper.init($q);
        ctrl = $controller('MainPageCtrl', {
            'api': api
        });
        ctrl._resolveTestPromises = function () {
            helper.resolveTestPromises($rootScope);
        };
        ctrl._resolveTestPromises();
    }));

    it('logs out a user', inject(function (UserService) {
        expect(UserService.username).toBeDefined();
        ctrl.logout();
        ctrl._resolveTestPromises();
        expect(UserService.username).toBe(null);
    }));
});
