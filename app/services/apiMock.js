// The helper for using the mock API is going to be assigned to this global in other scripts.
var testHelper;

(function () {
    var $q;
    var promises = [];

    function init(_$q_) {
        $q = _$q_;
    }

    function makePromise(response) {
        var p = $q.defer();
        promises.push({promise: p, response: response});
        return {$promise: p.promise};
    }

    var mockApiService = {
        posts: [{
            'id': 1,
            'author': 'Eric',
            'date': 'Today',
            'body': '..test post 1..',
            'comments': []
        }, {
            'id': 2,
            'author': 'Test',
            'date': 'Jan 01 2015',
            'body': '..test post 2..',
            'comments': []
        }, {
            'id': 3,
            'author': 'Test',
            'date': 'Now',
            'body': '..test post 3,Jan 01 2015..',
            'comments': []
        }, {
            'id': 4,
            'author': 'Test',
            'date': 'Feu 12 2015',
            'body': '..test post 4..',
            'comments': []
        }],

        login: function (payload) {//Check params !!!
            return makePromise({
                username: payload.username,
                result: "success"
            });
        },

        logout: function () {
            return makePromise('OK');
        },

        getStatus: function () {
            return makePromise(
                {statuses: [{'status': 'Test Status'}]}
            );
        },

        setStatus: function (payload) {
            return makePromise(
                {'status': payload.status}
            );
        },

        getAvatar: function () {
            return makePromise(
                {'picture': 'testPictureUrl'}
            );
        },

        getPosts: function () {
            return makePromise({
                "posts": mockApiService.posts
            });
        },

        addPost: function (payload) {
            var newPost = {
                'id': mockApiService.posts.length + 1,
                'author': 'Test',
                'date': 'Now',
                'body': payload.body,
                'comments': []
            };
            mockApiService.posts.push(newPost);
            return makePromise({
                posts: mockApiService.posts
            });
        },

        editPost: function (payload) {
            var index = mockApiService.posts.findIndex(function (post) {
                return post.id === payload.id;
            });
            mockApiService.posts[index].body = payload.body;
            return makePromise({
                posts: mockApiService.posts
            });
        },

        addComment: function (payload) {
            var index = mockApiService.posts.findIndex(function (post) {
                return post.id === payload.id;
            });
            var newComment = {
                'commentId': mockApiService.posts.length,
                "author": "Test",
                "date": "now",
                "body": payload.body
            };
            mockApiService.posts[index].comments.push(newComment);
            return makePromise({
                posts: mockApiService.posts
            });
        },

        editComment: function (payload) {
            var postIndex = mockApiService.posts.findIndex(function (post) {
                return post.id === payload.id;
            });

            var commentIndex = mockApiService.posts[postIndex].comments.findIndex(function (comment) {
                return comment.commentId === payload.commentId;
            });
            mockApiService.posts[postIndex].comments[commentIndex].body = payload.body;

            return makePromise({
                posts: mockApiService.posts
            });
        },

        getEmail: function () {
            return makePromise(
                {'email': 'test@rice.edu'}
            );
        },

        setEmail: function (payload) {
            return makePromise(
                {'email': payload.email}
            );
        },

        getZipcode: function () {
            return makePromise(
                {'zipcode': 'test_zipcode'}
            );
        },

        setZipcode: function (payload) {
            return makePromise(
                {'zipcode': payload.zipcode}
            );
        },

        setPassword: function (payload) {
            return makePromise(
                {'status': "Will not change"}
            );
        }
    };

    var resolveTestPromises = function (rootScope) {
        promises.forEach(function (p) {
            p.promise.resolve(p.response);
        });
        promises.length = 0;
        rootScope.$apply();
    };

    testHelper = {
        init: init,
        mockApiService: mockApiService,
        resolveTestPromises: resolveTestPromises
    };
})();