describe('The status controller', function () {
    var helper = testHelper;
    var ctrl;

    beforeEach(module('riceBookApp'));

    beforeEach(module(function ($provide) {
        $provide.value('api', helper.mockApiService);
    }));

    beforeEach(inject(function ($controller, $rootScope, $q, api) {
        helper.init($q);
        ctrl = $controller('StatusCtrl', {
            'api': api
        });
        ctrl._resolveTestPromises = function () {
            helper.resolveTestPromises($rootScope);
        };
        ctrl._resolveTestPromises();
    }));

    it('has a status', function () {
        expect(ctrl.status).toBeDefined();
    });

    it('updates the status message', function () {
        var newStatus = 'A new status message';
        ctrl.newStatus = newStatus;
        ctrl.setStatus();
        ctrl._resolveTestPromises();
        expect(ctrl.status).toBe(newStatus);
    });
});


