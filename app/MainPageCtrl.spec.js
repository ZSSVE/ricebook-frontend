describe('Test logout of MainPageCtrl', function () {
    var helper = testHelper;
    var ctrl;
    var promises = [];

    beforeEach(module('riceBookApp'));

    beforeEach(module(function ($provide) {
        $provide.value('api', helper.mockApiService);
    }));

    beforeEach(inject(function ($controller, $rootScope, $q, api) {
        helper.init($q);
        ctrl = $controller('MainPageCtrl', {
            'api': api,
        });
        ctrl._resolveTestPromises = function () {
            helper.resolveTestPromises($rootScope);
        };
        ctrl._resolveTestPromises();
    }));

    it('should log out a user', inject(function (UserService) {
        expect(UserService.username).toBeDefined();
        ctrl.logout();
        ctrl._resolveTestPromises();
        expect(UserService.username).toBe(null);
    }));
});
