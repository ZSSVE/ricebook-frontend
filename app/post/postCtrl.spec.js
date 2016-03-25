describe('Post controller', function () {
    var helper = testHelper;
    var ctrl;

    beforeEach(module('riceBookApp'));

    beforeEach(module(function ($provide) {
        $provide.value('api', helper.mockApiService);
    }));

    beforeEach(inject(function ($controller, $rootScope, $q, api) {
        helper.init($q);
        ctrl = $controller('PostCtrl', {
            'api': api
        });
        ctrl._resolveTestPromises = function () {
            helper.resolveTestPromises($rootScope);
        };
        ctrl._resolveTestPromises();
    }));

    it('calls the post api and gets 4 test posts', function () {
        ctrl.loadPosts();
        ctrl._resolveTestPromises();
        expect(ctrl.posts.length).toBe(4);
    });

    it('adds one post', function () {
        var newPostBody = "A added post";
        ctrl.newPost = newPostBody;

        ctrl.loadPosts();
        ctrl._resolveTestPromises();
        expect(ctrl.posts.length).toBe(4);

        ctrl.newPost = newPostBody;
        ctrl.addPost();
        ctrl._resolveTestPromises();
        ctrl.loadPosts();
        ctrl._resolveTestPromises();
        expect(ctrl.posts.length).toBe(5);
        expect(ctrl.posts[4].body).toEqual(newPostBody);
    });

    it('edits a post', function () {
        ctrl.username = 'Test';
        var postAuthor = 'Test';
        var postID = 1;
        var postBody = "Updated post";
        ctrl.loadPosts();
        ctrl._resolveTestPromises();
        var initialNumber = ctrl.posts.length;
        // Edit the post with the postID.
        ctrl.editPost(postAuthor, postID, postBody);
        ctrl._resolveTestPromises();
        ctrl.loadPosts();
        ctrl._resolveTestPromises();
        expect(ctrl.posts.length).toBe(initialNumber);
        expect(ctrl.posts[postID - 1].body).toBe(postBody); //index is postID -1 since test post id numbered from 1.
    });

    it('comments on a post', function () {
        var postID = 1;
        var commentBody = "Added comment";
        ctrl.newComment = commentBody;
        ctrl.loadPosts();
        ctrl._resolveTestPromises();
        var index = ctrl.posts.findIndex(function (post) {
            return post.id === postID;
        });
        var initialNumber = ctrl.posts[index].comments.length;
        // Edit the post with the postID.
        ctrl.addComment(postID);
        ctrl._resolveTestPromises();
        ctrl.loadPosts();
        ctrl._resolveTestPromises();
        expect(ctrl.posts[index].comments.length).toBe(initialNumber + 1);
        expect(ctrl.posts[index].comments[initialNumber].body).toBe(commentBody);
    });

    it('edits a comment', function () {
        var commentBody = "Added comment";
        var changedComment = "Changed comment";
        var commentAuthor = "Test";
        ctrl.username = "Test";
        ctrl.newComment = commentBody;

        // Use the first post as example.
        var postIndex = 0;
        var post = ctrl.posts[postIndex];
        var postID = post.id;


        // Add one comment first to ensure we have one to edit.
        ctrl.addComment(postID);
        ctrl._resolveTestPromises();
        ctrl.loadPosts();
        ctrl._resolveTestPromises();
        var initialNumber = ctrl.posts[postIndex].comments.length;

        // Use the first comment to test, which maybe newly added or an existing one.
        var commentIndex = 0;
        var commentID = post.comments[commentIndex].commentId;

        // Edit comment authored by the same one.
        ctrl.editComment(postID, commentID, changedComment, commentAuthor);
        ctrl._resolveTestPromises();
        ctrl.loadPosts();
        ctrl._resolveTestPromises();

        // See if the new comment is really posted.
        expect(ctrl.posts[postIndex].comments.length).toBe(initialNumber);
        expect(ctrl.posts[postIndex].comments[commentIndex].body).toBe(changedComment);
    });
});