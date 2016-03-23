/*******************************************
 * Test suite for status headline on main *
 *******************************************/
describe('Validate the status functionality of StatusCtrl', function () {
    var helper = testHelper;
    var ctrl;
    var promises = [];

    beforeEach(module('riceBookApp'));

    beforeEach(module(function ($provide) {
        $provide.value('api', helper.mockApiService);
    }));

    beforeEach(inject(function ($controller, $rootScope, $q, api) {
        helper.init($q);
        ctrl = $controller('StatusCtrl', {
            'api': api,
        });
        ctrl._resolveTestPromises = function () {
            helper.resolveTestPromises($rootScope);
        };
        ctrl._resolveTestPromises();
    }));

    it('Should have a status', function () {
        expect(ctrl.status).toBeDefined();
    });

    it('should update the status message', function () {
        var newStatus = 'A new status message';
        ctrl.newStatus = newStatus;
        ctrl.setStatus();
        ctrl._resolveTestPromises();
        expect(ctrl.status).toBe(newStatus);
    });

});


