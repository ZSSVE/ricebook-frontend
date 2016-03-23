describe('The filter for posts', function () {
    var helper = testHelper;
    var ctrl;

    beforeEach(module('riceBookApp'));

    beforeEach(module(function ($provide) {
        $provide.value('api', helper.mockApiService);
    }));

    beforeEach(inject(function ($controller, $rootScope, $q, api) {
        helper.init($q);
        ctrl = $controller('PostCtrl', {
            'api': api,
        });
        ctrl._resolveTestPromises = function () {
            helper.resolveTestPromises($rootScope);
        };
        ctrl._resolveTestPromises();
    }));

    it('has initially 4 posts', function () {
        expect(ctrl.posts.length).toBe(4);
    });

    it('has undefined user input initially', function () {
        expect(ctrl.searchKeyword).not.toBeDefined();
    });

    it('finds 1 post when searching for Eric', inject(function (selectiveFilterFilter) {
            expect(selectiveFilterFilter(ctrl.posts, "Eric").length).toBe(1);
        }
    ));
    it('returns 4 posts when searching for "test post"', inject(function (selectiveFilterFilter) {
            expect(selectiveFilterFilter(ctrl.posts, "test post").length).toBe(4);
        }
    ));

    it('finds 1 post when searching for "Jan 01 2015"', inject(function (selectiveFilterFilter) {
            expect(selectiveFilterFilter(ctrl.posts, "Jan 01 2015").length).toBe(1);
        }
    ));

    it('finds nothing when searching  for "Feu 12 2015"', inject(function (selectiveFilterFilter) {
            expect(selectiveFilterFilter(ctrl.posts, "Feu 12 2015").length).toBe(0);
        }
    ));
});
